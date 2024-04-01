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

    return <div class="flex items-center justify-between gap-x-6 py-1">
        <div class="">
            <TimerDisplay {...args} size={"4xl"} />
        </div>
        <div class="min-w-0">
            <div class="flex items-start gap-x-3">
                <p class="text-sm font-semibold leading-6 text-gray-900"></p>
            </div>
            <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p class="text-md">{args.label}</p>
            </div>
        </div>        
        <div class="flex flex-none items-center gap-x-4">
            <p class="rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset text-gray-600 bg-gray-50 ring-gray-500/10">Queued</p>
        </div>
    </div>
});