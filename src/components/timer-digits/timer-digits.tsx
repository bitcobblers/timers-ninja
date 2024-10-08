import { component$ } from "@builder.io/qwik";
import { MdTimerValue } from "../md-timer/timer.types";


export type TimerDigitsArgs = {
  seconds: number;
  showMills? : boolean | undefined;
}
export default component$((args: TimerDigitsArgs) => {    
  return <div>{args.seconds}{args.showMills && <span  class="text-xl2">.<span class="text-base">0</span></span>}</div>
});

