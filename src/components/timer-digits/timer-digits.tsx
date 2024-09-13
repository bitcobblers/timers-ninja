import { component$ } from "@builder.io/qwik";
import { MdTimerSignificant } from "../md-timer/timer.visitor";
import { MdTimerFromSeconds, type MdTimerValue } from "../md-timer/timer.types";

export type TimerDigitsArgs = {
  seconds: number;
}
export default component$((args: TimerDigitsArgs) => {
  
  const timer = new MdTimerFromSeconds(args.seconds)
  return <div>{timer.toString()}</div>
});