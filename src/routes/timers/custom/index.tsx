import { component$, $, useStore, useSignal, useTask$ } from "@builder.io/qwik";
import { MdTimerRuntime } from "~/components/md-timer/md-timer";
import TimerContainer from "~/components/timer-container/timer-container";


export default component$(() => {           
    const init = "11(2)";
    const markdown = useStore({value: init});        
    const result = useSignal([]);   
       
    useTask$(({ track }) => {
        track(() => markdown.value);
        const input = markdown.value;
        try {
            const { outcome} = new MdTimerRuntime().read(input);                        
            console.log(outcome)
            result.value = outcome;        
        }
        catch (ex) {
            console.log(ex)
        }
    });    

    const keyPress = $((args:any, current:any) => {
        markdown.value = current.value;        
    });
    const blur = $((args:any, current:any) => {
        markdown.value = current.value;
    });
    
    return <> 
        <textarea value={init} onKeyUp$={keyPress} onBlur$={blur} rows={10} class="bg-slate-50 w-full" />            
        <div>
            {result.value.map((timer :any, index:number) => { 
                return <TimerContainer key={[index, timer.direction, timer.label, timer.timer.seconds].join("-")} {...timer} /> })}
        </div>        
    </>
});