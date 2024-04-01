import { component$ } from "@builder.io/qwik";
import type { MdTimerBlock} from "../md-timer/timer.visitor";
import { MdTimerSignificant } from "../md-timer/timer.visitor";

export default component$((args: MdTimerBlock) => {   
    console.log("DISPLAY_ARGS:", args);
    const timer = new MdTimerSignificant(args.timer);
    return <>
        <div class="font-bold text-gray-800 
                    border-2 rounded-xl 
                    pl-5
                    pr-5
                     bg-green-50" >            
            <div class="text-center text-8xl">
                { timer.toDigits()}
            </div>
        </div>
    </>
})
