import { component$ } from "@builder.io/qwik";
import { type MdTimerValue } from "../md-timer/timer.types";
import TimerDigits from "../timer-digits/timer-digits";
import { $, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type QRL} from '@builder.io/qwik';
import { type ContainerArgs } from "~/routes";

export interface TimeSpan {
    
  start: Date;
  end?: Date;
}

const calculateElapsedTime = (spans: TimeSpan[]) => {
    return spans.reduce((total, span) => {
        const endTime = span.end || new Date(); // If no end, use current time
        return total + (endTime.getTime() - span.start.getTime()) / 1000;
    }, 0);
};

export type TimerProps = {
    onStart$?: QRL<(spans: TimeSpan[]) => void>;
    onStop$?: QRL<(spans: TimeSpan[]) => void>;
    onComplete$?: QRL<(spans: TimeSpan[]) => void>;
    onReset$?: QRL<() => void>;
};


export type MdTimerBlockArgs = {
  timer: MdTimerValue;
  icon?: "up" | "down" | "date";
  round?: number;
  label?: string;
  size?: string;
  status?: string;
};

export type ButtonArgs  = {
  onClick$ : QRL<() => void>;
}

const StartButton = component$((args : ButtonArgs) => {
  return <button {...args}
  type="button"
  class="items-center inline-flex gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
  Start
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-6 w-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
    />
  </svg>
</button>    
})

const PauseButton = component$((args : ButtonArgs) => {
  return <button {...args}
  type="button"
  class="items-center inline-flex gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
  Pause
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-6 w-6"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9v6m-4.5 0V9M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
</button>
});

const ResetButton = component$((args : ButtonArgs ) => {
  return <button {...args}
  type="button"
  class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
  Reset
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-6 w-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
    />
  </svg>
</button>
})


const DateCounterIcon = component$(() => {
  return <svg
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="h-5 w-5">
    <path stroke-linecap="round"
      stroke-linejoin="round"
      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
  </svg>
})

const CountUpIcon = component$(() => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="h-5 w-5"
  >
    <path
      fill-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
      clip-rule="evenodd"
    />
  </svg>
})

const CountDownIcon = component$(() => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="h-5 w-5"
  >
    <path
      fill-rule="evenodd"
      d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z"
      clip-rule="evenodd"
    />
  </svg>
})

export type TimerDigitsArgs = ContainerArgs & {
  size: string  
} 

export default component$((args?: TimerDigitsArgs) => {
  const blankTimer: MdTimerBlockArgs = {
    timer : { seconds: 0},
     label: "Click Start."
  }
  const sizedTimer = args?.size != undefined ? "text-" + args.size : "text-5xl";
  const refreshReate = 10;
  const elapsedTime = useSignal(0);
  const started = useSignal(false);
  const timeSpans = useSignal<TimeSpan[]>([]);
  const activeTimer = useSignal<MdTimerBlockArgs|undefined>(blankTimer);

  const startTimer = $(() => {
    args?.next$().then(n=> activeTimer.value = n);
    
    timeSpans.value = [...timeSpans.value, { start: new Date() }];
    started.value = true;
  });

  const stopTimer = $(() => {
      if (timeSpans.value.length > 0 && !timeSpans.value[timeSpans.value.length - 1].end) {
          const updatedTimeSpans = [...timeSpans.value]; // Create a copy
          updatedTimeSpans[updatedTimeSpans.length - 1].end = new Date();
          timeSpans.value = updatedTimeSpans; // Update the signal's value
          started.value = false;
      }
  });

  const resetTimer = $(() => {
      elapsedTime.value = 0;
      timeSpans.value = [];
      started.value = false;
      activeTimer.value = blankTimer;
      args?.reset$();
  });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ track }) => {      
      track(() => timeSpans.value);
        let intervalId: NodeJS.Timeout | undefined;  
        if (intervalId) {
            clearInterval(intervalId);
        }

        // If there's an active time span (last one without an end time)
        if (timeSpans.value.length > 0 && !timeSpans.value[timeSpans.value.length - 1].end) {
            intervalId = setInterval(() => {
                // Calculate elapsed time based on time spans
                elapsedTime.value = calculateElapsedTime(timeSpans.value);

                if (elapsedTime.value > (activeTimer.value?.timer.seconds || 0)) {
                  args?.complete$();
                  args?.next$().then(n=> { 
                    
                    if (n == undefined) {
                      elapsedTime.value = 0;
                      timeSpans.value = [];
                      started.value = false;
                      activeTimer.value = blankTimer;
                      args?.reset$();      
                      return;
                    }
                    
                    timeSpans.value = [ { start: new Date() }];                    
                    activeTimer.value = n;
                  });
                }
            }, refreshReate);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    });
    
      
  return (
    <>
      <div
        class="rounded-xl
                    bg-green-50 pb-2                     
                    font-bold
                     text-gray-800"
      >
        {(activeTimer.value?.round || activeTimer.value?.label) &&
          <div class="mx-auto flex">
            <div class="text-center flex-grow bg-forest rounded-t-lg text-green-50">
              {activeTimer.value.round && "Round " + activeTimer.value.round}
              {activeTimer.value.round && activeTimer.value.label && " - "}
              {activeTimer.value.label}
            </div>
          </div>}
        <div class="mx-auto flex gap-x-2 px-5  ">
          <div class="text-forest">
            {activeTimer.value?.icon == "up" && <CountUpIcon />}
            {activeTimer.value?.icon == "down" && <CountDownIcon />}
            {activeTimer.value?.icon == "date" && <DateCounterIcon />}
          </div>
          <div
            class={"flex-grow text-center text-forest-600 " + sizedTimer}
          >
            <TimerDigits seconds={elapsedTime.value} showMills={true} />
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-6 pt-6">        
        {!started.value && <StartButton onClick$={startTimer} />}
        {started.value && <PauseButton onClick$={stopTimer} /> }
        <ResetButton onClick$={resetTimer} />
      </div>
    </>
  );
});
