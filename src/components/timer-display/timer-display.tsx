import { component$ } from "@builder.io/qwik";
import type { MdTimerBlock } from "../md-timer/timer.visitor";
import { MdTimerSignificant } from "../md-timer/timer.visitor";

export type MdTimerBlockArgs = MdTimerBlock & {
    size?: string;
}

export default component$((args: MdTimerBlockArgs) => {
    const timer = new MdTimerSignificant(args.timer, ["minutes"]);
    return <>
        <div class="font-bold text-gray-800
                    border-2 rounded-xl                     
                    pt-1
                    pb-1
                    pl-5
                    pr-5
                     bg-green-50" >
            <div class="flex gap-x-2 mx-auto">
                <div class="pt-1 -ml-2">
                    {args.type && args.type.label == "up" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm.53 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v5.69a.75.75 0 0 0 1.5 0v-5.69l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z" clip-rule="evenodd" />
                    </svg>}                     
                    {args.type && args.type.label == "down" && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-.53 14.03a.75.75 0 0 0 1.06 0l3-3a.75.75 0 1 0-1.06-1.06l-1.72 1.72V8.25a.75.75 0 0 0-1.5 0v5.69l-1.72-1.72a.75.75 0 0 0-1.06 1.06l3 3Z" clip-rule="evenodd" />
                    </svg>}
                </div>
                <div class={"flex-grow text-center " + (args.size != undefined ? "text-" + args.size : "text-6xl")}>
                    {timer.toDigits()}
                </div>
            </div>
        </div>
    </>
})
