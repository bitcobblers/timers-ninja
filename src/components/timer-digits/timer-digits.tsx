import { component$ } from "@builder.io/qwik";
import { MdTimerSignificant } from "../md-timer/timer.visitor";
import type { MdTimerValue } from "../md-timer/timer.types";

export default component$((args: MdTimerValue) => {
  const timer = new MdTimerSignificant(args, ["minutes"]);  
  return <div>{timer.toDigits()}</div>
});