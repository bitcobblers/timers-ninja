import { component$, useStore, useSignal, useTask$, Slot , $} from "@builder.io/qwik";
import { Duration, DurationUnit } from "luxon";
import Page from "~/components/Page";
import Editor from "~/components/editor";
import { MdTimerRuntime } from "~/components/md-timer/md-timer";
import ThemeToggle from "~/components/light-dark-toggle";
import Glow from "~/components/glow";
import Timeline from "~/components/timeline";
import Present from "~/components/Present";

const Container = component$(() => {
    return <>
        <div class="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:flex lg:px-0 bg-gray-900 lg:bg-transparent" >
            <Glow />
            <div class="relative flex w-full lg:pointer-events-auto         
          lg:mr-[calc(max(2rem,50%-38rem))] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-2">
              <div class="mx-auto max-w-lg md:mx-64 lg:mx-[calc(max(2rem,50%-32rem))] lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">              
                <Slot name="editor" />              
                <div class="flex flex-1 items-end justify-center pb-4 lg:justify-center lg:pb-6 lg:z-40">
                  
                </div>
              </div>
            </div>
          </div>
          <ThemeToggle />        
          <div class="relative flex-auto pointer-events-none">
              <Timeline />
              <main class="space-y-2 py-8 lg:py-20 sm:space-y-2 sm:py-8">
                <Slot />    
            </main>
          </div>
        </>
  })

const TimerPage = component$((params: { init : string }) => {               
    const markdown = useStore({value: params.init});        
    const result = useSignal([]);   
       
    useTask$(({ track }) => {
        track(() => markdown.value);
        const input = markdown.value;
        const printValues = ['hours', "minutes", "seconds"] as DurationUnit[];
        try {            
            const { outcome} = new MdTimerRuntime().read(input);                                                            
            let counter = Duration.fromMillis(0);
            result.value = outcome.map((timer:any) => {
                const current = Duration.fromObject(timer.timer);
                counter = counter.plus(current);                                                
                const display = counter
                    .shiftTo(...printValues)
                    .toHuman({ unitDisplay: "short" });

                return { ...timer, startDate:  display }
            });        
        }
        catch (ex) {
            console.log(ex)
        }
    });    

    const onUpdate = $((input:string)=> {
        //console.log("update", input);
        markdown.value = input;
    })

    return <Container>                       
            <Editor q:slot="editor" value={markdown.value} onUpdate$={onUpdate} />
            <Present />
            {result.value.map((timer :any, index:number) => {                                 
                return <Page 
                    key={[index, timer.direction, timer.label, timer.timer.seconds].join("-")} {...timer} /> })}        
        </Container>
});

export default component$(() => {               
    const init = `[
        [   
            -20(Work)
            -10(Rest)
        ](8)
    ](pushups, pullups)`; 
    return <TimerPage init={init}/>
});