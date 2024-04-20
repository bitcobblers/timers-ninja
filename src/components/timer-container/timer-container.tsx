import { component$ } from "@builder.io/qwik";
import type { MdTimerBlock } from "../md-timer/timer.types";
import TimerDigits from "../timer-digits/timer-digits";

export type TimeContainerCommand = {
  step: any;
  timer: any;
}
export type timerArgs = {

};

export default component$((args: MdTimerBlock) => {
  return (
    <div class="flex items-center justify-between gap-x-6 py-1">
      <div class="">
        <TimerDigits {...args.timer} />
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
        <p class="mt-0.5 whitespace-nowrap rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          Queued
        </p>
      </div>
    </div>
  );
});
