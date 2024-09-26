import { component$ } from "@builder.io/qwik";
import { MdTimerValue } from "../md-timer/timer.types";


export type TimerDigitsArgs = {
  seconds: number;
  showMills? : boolean | undefined;
}
export default component$((args: TimerDigitsArgs) => {
  
  const timer = new MdTimerValue(args.seconds.toString());

  return <div>{timer.value}{args.showMills && <span  class="text-xl2">.<span class="text-base">{timer.milliseconds}</span></span>}</div>
});

