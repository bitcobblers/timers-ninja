import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TimerCard from "~/components/timer-card/timer-card";

export default component$(() => {
    
  return (
    <>      
          <div class="mx-auto max-w-4xl text-center">
            <p class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Select a Timer</p>
          </div>
          {/* <p class="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">Choose an affordable plan that’s packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</p> */}
          <div class="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-4">
            <TimerCard id="countdown?t=300" label="Count Down">
              Countdown from a set time (Default: 5min).
            </TimerCard>
            <TimerCard id="stopwatch" label="Stopwatch" >
              Count up with w/ Laps
            </TimerCard>            
            <TimerCard id="tabata" label="Tabata">
              The typical tabata timer, 20 second of work, 10 seconds of rest.
            </TimerCard>
            <TimerCard id="custom" label="Build Your Own">
              Custom Markdown Timer Editor
            </TimerCard>
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
