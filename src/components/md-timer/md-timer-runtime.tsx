import { $, component$, createContextId, QRL, Signal, Slot, useContextProvider, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Param } from "tone";
import { MdTimerCompiler, MdTimerRuntime } from "./md-timer";
import { MDTimerCommand } from "./timer.types";

export interface TimeSpan {    
    start: Date;
    end?: Date;
}

export type RuntimeContext = {
    timeSpans: TimeSpan[] 
    elapsed: number;
    line: undefined | number;
};
export enum RuntimeEventType {
    Tick,
    Start,
    Stop,
    Reset,    
}

export type RuntimeEventHandler = {
    handles: RuntimeEventType;
    apply: (context: RuntimeContext, event: RuntimeEvent) => void;
}

export type RuntimeEvent =  {
    type : RuntimeEventType;
    data: any;
}

export class ResetTimerHandler implements RuntimeEventHandler {
    handles = RuntimeEventType.Stop;
    apply(context: RuntimeContext, event: RuntimeEvent) {
        context.timeSpans = [];
        context.elapsed = 0;
        context.line = undefined;
    };
}

export class StopTimerHandler implements RuntimeEventHandler {
    handles = RuntimeEventType.Stop;
    apply(context: RuntimeContext, event: RuntimeEvent) {
        const started = context.timeSpans.filter(span=>span.end == undefined);
        if (started.length == 0) {
            // TODO: Raise notification that timers is already running.
            return;
        }
        started[0].end = new Date();
        // call next on start??
    };
}

export class StartTimerHandler implements  RuntimeEventHandler {
    handles = RuntimeEventType.Start;
    apply(context: RuntimeContext, event: RuntimeEvent) {
        const started = context.timeSpans.filter(span=>span.end == undefined);
        if (started.length > 0) {
            // TODO: Raise notification that timers is already running.
            return;
        }

        context.timeSpans.push({ start : new Date()});
    };

}

export class ElapsedTimeHandler implements RuntimeEventHandler {
    handles = RuntimeEventType.Tick;
    apply(context: RuntimeContext, event: RuntimeEvent) {
        if (context.timeSpans.length == 0) {
            context.elapsed = 0;
            return;            
        }
        var tickTime = event.data as Date;
        context.timeSpans.reduce((total, span) => {
            const endTime = span.end || tickTime // If no end, use current time
            return total + (endTime.getTime() - span.start.getTime()) / 1000;
        }, 0);
    };
}

export const mdRuntimeSource = createContextId<Signal<string>>("runtimeSource");
export const mdRuntimeContext = createContextId<Signal<RuntimeContext>>('runtimeContext');

export type RuntimeArgs = {
    code: string;
    onInput : QRL<QRL<(event: RuntimeEvent) =>void>>;
    complete: QRL<(context: RuntimeContext) =>void>;   
}
export default component$((props:RuntimeArgs) => {
    const refreshReate = 10;
    const source = useSignal<string>(props.code);
    const context = useSignal<RuntimeContext>({timeSpans: [], elapsed: 0, line: undefined});    
    useContextProvider(mdRuntimeContext, context);
    
    const handlers: RuntimeEventHandler[]= [
        new ElapsedTimeHandler(),
        new StartTimerHandler(),
        new StopTimerHandler(),
        new ResetTimerHandler(),        
    ];    

    const eventHandler = (event: RuntimeEvent) => {
        for(let handler of handlers) {
            if (handler.handles == event.type) {
                handler.apply(context.value, event);
            }
        }
    };
    

    let compiled: MDTimerCommand[] = [];
    let intervalId: NodeJS.Timeout | undefined;  
    useVisibleTask$(({ track, cleanup }) => {        
        track(() => source.value);        
        if (intervalId) {
            clearInterval(intervalId);
        }
        compiled = new MdTimerCompiler().read(source.value).outcome;
        if (compiled.length == 0) {
            return; 
        }
        runtime = new MdTimerRuntime(compiled);
        intervalId = setInterval(() => {
            eventHandler({
                type: RuntimeEventType.Tick,
                data: new Date()
            });
        }, refreshReate);
        cleanup(() => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        });
    });

    return <Slot />;
});
