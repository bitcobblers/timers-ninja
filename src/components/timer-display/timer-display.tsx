import { component$ } from "@builder.io/qwik";
import TimerDigits from "../timer-digits/timer-digits";
import { $, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { type QRL} from '@builder.io/qwik';
import { type ContainerArgs } from "../timer-page/timer-page";
import * as Tone from "tone";
import { MDTimerInstance } from "../md-timer/md-timer";
import { EmptyTimer } from "../md-timer/timer.types";

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

export type TimerDigitsArgs = ContainerArgs & {
  size: string  
} 

export default component$((args?: TimerDigitsArgs) => {
  
  // const startTimer = $(() => {
  //   args?.next$().then(n=> {
  //     const synth = new Tone.Synth().toDestination();
  //     synth.triggerAttackRelease("C4", "8n");               
  //     activeTimer.value = n;      
  //     }
      
  //   );
  //   timeSpans.value = [...timeSpans.value, { start: new Date() }];    
  // });

  // const stopTimer = $(() => {
  //     if (timeSpans.value.length > 0 && !timeSpans.value[timeSpans.value.length - 1].end) {
  //         const updatedTimeSpans = [...timeSpans.value]; // Create a copy
  //         updatedTimeSpans[updatedTimeSpans.length - 1].end = new Date();
  //         timeSpans.value = updatedTimeSpans; // Update the signal's value
  //         started.value = false;
  //     }
  // });

  // const resetTimer = $(() => {
  //     elapsedTime.value = 0;
  //     displayTime.value = 0;
  //     timeSpans.value = [];
  //     started.value = false;
  //     activeTimer.value = blankTimer;
  //     args?.reset$();
  // });
  // let intervalId: NodeJS.Timeout | undefined;  
  //   // eslint-disable-next-line qwik/no-use-visible-task
  //   useVisibleTask$(({ track }) => {      
  //     track(() => timeSpans.value);
        
  //       if (intervalId) {
  //           clearInterval(intervalId);
  //       }
       
  //       // If there's an active time span (last one without an end time)
  //       if (timeSpans.value.length > 0 && !timeSpans.value[timeSpans.value.length - 1].end) {
  //           intervalId = setInterval(() => {
  //               // Calculate elapsed time based on time spans
  //               elapsedTime.value = calculateElapsedTime(timeSpans.value)                
  //               displayTime.value = activeTimer.value?.icon == "up" ? elapsedTime.value : (activeTimer.value?.timer || 0) - elapsedTime.value;
  //               displayTime.value = displayTime.value < 0 ? 0: displayTime.value;
  //               args?.tick$(elapsedTime.value);
  //               if (elapsedTime.value > (activeTimer.value?.timer || 0)) {                  
  //                 args?.complete$();
                            
  //                 args?.next$().then(n=> { 
  //                   const synth = new Tone.Synth().toDestination();
  //                   synth.triggerAttackRelease("C4", "8n");     
  //                   if (n == undefined) {
  //                     elapsedTime.value = 0;
  //                     timeSpans.value = [];
  //                     started.value = false;
  //                     activeTimer.value = blankTimer;
  //                     args.reset$();                      
                      
  //                     return;
  //                   }                         
  //                   timeSpans.value = [ { start: new Date() }];                    
                    
  //                   activeTimer.value = n;
  //                 });
  //               }
  //           }, refreshReate);
  //       }

  //       return () => {
  //           if (intervalId) {
  //               clearInterval(intervalId);
  //           }
  //       };
  //   });
    
      
  return (
    <>
      <div
        class="rounded-xl
                    bg-green-50 pb-2                     
                    font-bold
                     text-gray-800"
      >
        {/* <audio id="bell" src="boxing-bell.mp3"></audio> */}
        {/* {(activeTimer.value?.round || activeTimer.value?.label) &&
          <div class="mx-auto flex">
            <div class="text-center flex-grow bg-forest rounded-t-lg text-green-50">
              {activeTimer.value.round && "Round " + activeTimer.value.round}
              {activeTimer.value.round && activeTimer.value.label && " - "}
              {activeTimer.value.label}
            </div>
          </div>}
        <div class="mx-auto flex gap-x-2 px-5  ">
          <div class="text-forest pt-5">
            {activeTimer.value?.icon == "up" && <CountUpIcon />}
            {activeTimer.value?.icon == "down" && <CountDownIcon />}            
          </div>
          <div
            class={"flex-grow text-center text-forest-600 " + sizedTimer}
          >
            <TimerDigits seconds={displayTime.value} showMills={true} />
          </div>
        </div>
      </div>
      <div class="flex justify-center space-x-6 pt-6">        
        {!started.value && <StartButton q-preload onClick$={startTimer} />}
        {started.value && <PauseButton onClick$={stopTimer} /> }
        <ResetButton onClick$={resetTimer} /> */}
      </div>
    </>
  );
});
