import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import type { TimerStep } from "~/components/count-down/count-down";
import CountDown from "~/components/count-down/count-down";
import TimerCard from "~/components/timer-card/timer-card";

export default component$(() => {
  const loadTimer = (steps: TimerStep[]) => {

  }
  
  
  const step : TimerStep = {
    seconds : 3
  }
  return (
    <>
      <div class="bg-white py-24 sm:py-32">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center">
            <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Select a Timer</p>
          </div>
          {/* <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p> */}
          <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <TimerCard onLoad={loadTimer}/>
            <TimerCard onLoad={loadTimer}/>
            <TimerCard onLoaD={loadTimer}/>
            <TimerCard onLoad={loadTimer}/>
          </div>
        </div>
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
          <div class="mx-auto max-w-4xl text-center p-10">            
            <CountDown step={step} />
          </div>
        </div>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Timer",
  meta: [
    {
      name: "description",
      content: "Qwik Timer",
    },
  ],
};
