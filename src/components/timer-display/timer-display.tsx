import { component$ } from "@builder.io/qwik";
import type { MdTimerBlock} from "../md-timer/timer.visitor";
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
            <div class={"text-center " + (args.size != undefined ? "text-" + args.size : "text-6xl")}>
                { timer.toDigits()}
            </div>
        </div>
    </>
})
