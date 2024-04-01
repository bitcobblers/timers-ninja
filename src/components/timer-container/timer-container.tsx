import type { QRL } from "@builder.io/qwik";
import { component$, useStore /*, useVisibleTask$*/ } from "@builder.io/qwik";
import type { MdTimerBlock } from "../md-timer/timer.visitor";
import TimerDisplay from "../timer-display/timer-display";

export type timerArgs = {
    start$: QRL<(fn: QRL<() => void>) => void>;
    stop$: QRL<(fn: QRL<() => void>) => void>;
    rest$: QRL<(fn: QRL<() => void>) => void>;
}

export default component$((args: MdTimerBlock) => {

    const store = useStore({ ...args });


    // eslint-disable-next-line qwik/no-use-visible-task
    //    useVisibleTask$(() => {                              
    //         const update = () => {            
    // if ((args.start > args.end && store.count <= args.end) ||
    // (args.start < args.end && store.count >= args.end))                                
    // {
    //     clearInterval(tmrId);                
    // }

    // store.seconds = store.count % 60;
    // store.minutes = Math.floor(store.count / 60);
    // store.count += /*args.step ||*/ 1;
    //     };        
    //     const tmrId = setInterval(update, 1000);    
    //     return () => clearInterval(tmrId);
    // });

    // return <div>        
    //      <TimerDisplay {...store} label={store.label} direction={store.direction}  />         
    // </div>
    return <div class="flex items-center justify-between gap-x-6 py-1">
        <div class="">
            <TimerDisplay {...store} size={"4xl"} />
        </div>
        <div class="min-w-0">
            <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900"></p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p class="whitespace-nowrap">
                    {store.type && store.type.label == "up"
                        ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                        </svg>}
                </p>
                <svg viewBox="0 0 2 2" class="h-0.5 w-0.5 fill-current">
                    <circle cx="1" cy="1" r="1" />
                </svg>
                <p class="truncate">{store.label}</p>
            </div>
        </div>        
        <div class="flex flex-none items-center gap-x-4">
            <p class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-gray-600 bg-gray-50 ring-gray-500/10">Queued</p>
        </div>
    </div>
});