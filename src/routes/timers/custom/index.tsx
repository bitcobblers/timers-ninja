import { component$, $, useStore, useSignal } from "@builder.io/qwik";
import { MdTimerRuntime } from "~/components/md-timer/md-timer";
import TimerContainer from "~/components/timer-container/timer-container";


export default component$(() => {           
    const markdown = useStore({value: "11(2)"});    
    const result = useSignal([]);   

    
    const update = $((args: any, currentTarget :any) => {                        
        
        const { outcome} = new MdTimerRuntime().read(currentTarget.value);        
        console.log(args, currentTarget, outcome)
        result.value = outcome;        
    })    
    return <> 
        <textarea onBlur$={update} {...markdown} rows={10} class="bg-slate-50 w-full" />            
        <div>
            {result.value.map((timer :any, index:number) => { 
                return <TimerContainer key={index} {...timer} /> })}
        </div>        
    </>
});