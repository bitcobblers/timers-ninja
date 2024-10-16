import { $, component$, createContextId, QRL, Signal, Slot, useContextProvider, useOnWindow, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Param } from "tone";
import { MdTimerCompiler, MdTimerRuntime } from "./md-timer";
import { MDTimerCommand } from "./timer.types";

export interface TimeSpan {    
    start: Date;
    end?: Date;
}

export type MDRuntimeContext = {
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
    apply: (context: MDRuntimeContext, event: MDRuntimeEvent) => void;
}

export type MDRuntimeEvent =  {
    type : RuntimeEventType;
    data: any;
}

export class ResetTimerHandler implements RuntimeEventHandler {
    handles = RuntimeEventType.Stop;
    apply(context: MDRuntimeContext, event: MDRuntimeEvent) {
        context.timeSpans = [];
        context.elapsed = 0;
        context.line = undefined;
    };
}

export class StopTimerHandler implements RuntimeEventHandler {
    handles = RuntimeEventType.Stop;
    apply(context: MDRuntimeContext, event: MDRuntimeEvent) {
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
    apply(context: MDRuntimeContext, event: MDRuntimeEvent) {
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
    apply(context: MDRuntimeContext, event: MDRuntimeEvent) {
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
export const mdRuntimeContext = createContextId<Signal<MDRuntimeContext>>('runtimeContext');

export type RuntimeArgs = {
    code: undefined | string;
    onInput : QRL<(fn : QRL<(event: MDRuntimeEvent) => void>) => void>;
    tick: QRL<(context: MDRuntimeContext) =>void>;   
}
export default component$((props:RuntimeArgs) => {
    const refreshReate = 10;
    const source = useSignal<undefined | string>(props.code);
    useContextProvider(mdRuntimeSource, source);

    const context = useSignal<MDRuntimeContext>({timeSpans: [], elapsed: 0, line: undefined});    
    useContextProvider(mdRuntimeContext, context);             
        
    useVisibleTask$(({ track, cleanup }) => {        
        track(() => source.value);        
        let intervalId: NodeJS.Timeout | undefined;  
        if (intervalId) {
            clearInterval(intervalId);
        }
        
        if (source.value == undefined) { return; }
        
        const eventHandler = (event: MDRuntimeEvent) => {
            const handlers: RuntimeEventHandler[]= [
                new ElapsedTimeHandler(),
                new StartTimerHandler(),
                new StopTimerHandler(),
                new ResetTimerHandler(),        
            ];            
            for(let handler of handlers) {
                if (handler.handles == event.type) {
                    handler.apply(context.value, event);
                    console.log(event, handler);
                }
            }
        };    
        
        const eventReader = $((event: MDRuntimeEvent) => {
            const handlers: RuntimeEventHandler[]= [
                new ElapsedTimeHandler(),
                new StartTimerHandler(),
                new StopTimerHandler(),
                new ResetTimerHandler(),        
            ];            
            for(let handler of handlers) {
                if (handler.handles == event.type) {
                    handler.apply(context.value, event);
                    console.log(event, handler);
                }
            }
        });
        props.onInput(eventReader);
        
        let compiledScript = new MdTimerCompiler().read(source.value).outcome;
        if (compiledScript.length == 0) {
            return; 
        }
        const runtime = new MdTimerRuntime(compiledScript);
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
