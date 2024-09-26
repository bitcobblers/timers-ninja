import { component$ } from "@builder.io/qwik";
import { MdTimerValue } from "../md-timer/timer.types";


export type TimerDigitsArgs = {
  seconds: number;
  showMills? : boolean | undefined;
}
export default component$((args: TimerDigitsArgs) => {
  
  const [timer, mill] = new MdTimerValue(args.seconds).toClock();

  return <div>{timer}{args.showMills && <span  class="text-xl2">.<span class="text-base">{mill}</span></span>}</div>
});

