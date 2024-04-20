import { component$ } from "@builder.io/qwik";
import type { MdTimerValue } from "../md-timer/timer.types";
import TimerDigits from "../timer-digits/timer-digits";

export type MdTimerBlockArgs = {
  timer: MdTimerValue;
  icon?: "up" | "down" | "date";
  round?: number;
  label?: string;
  size?: string;
};

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

export default component$((args: MdTimerBlockArgs) => {  
  const sizedTimer = args.size != undefined ? "text-" + args.size : "text-6xl";
  return (
    <>
      <div
        class="rounded-xl border-2
                    bg-green-50 pb-1                     
                    font-bold
                     text-gray-800"
      >
        {(args.round || args.label) &&
          <div class="mx-auto flex">
            <div class="text-center flex-grow bg-forest rounded-t-md text-green-50">
              {args.round && "Round " + args.round}
              {args.round && args.label && " - "}
              {args.label}
            </div>
          </div>}
        <div class="mx-auto flex gap-x-2 px-5">
          <div >
            {args.icon == "up" && <CountUpIcon />}
            {args.icon == "down" && <CountDownIcon />}
            {args.icon == "date" && <DateCounterIcon />}
          </div>
          <div
            class={"flex-grow text-center " + sizedTimer}
          >
            <TimerDigits {...args.timer} />
          </div>
        </div>
      </div>
    </>
  );
});
