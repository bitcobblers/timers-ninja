import { component$, useStore, useSignal, useTask$, Slot , $} from "@builder.io/qwik";
import { DateTime } from "luxon";
import Page from "~/components/Page";
import Editor from "~/components/editor";
import { MdTimerRuntime } from "~/components/md-timer/md-timer";
import ThemeToggle from "~/components/light-dark-toggle";
import Glow from "~/components/glow";
import Timeline from "~/components/timeline";

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

export default component$(() => {           
    const init = `[
    [   
        -20(Work)
        -10(Rest)
    ](8)
](pushups, pullups)`;
    const markdown = useStore({value: init});        
    const result = useSignal([]);   
       
    useTask$(({ track }) => {
        track(() => markdown.value);
        const input = markdown.value;
        try {
            console.log("Task", input)
            const { outcome} = new MdTimerRuntime().read(input);                        
            console.log(outcome)
                        
            result.value = outcome.map((timer:any) => {
                return { ...timer, startDate: DateTime.now().toString() }
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
            {result.value.map((timer :any, index:number) => {                                 
                return <Page 
                    key={[index, timer.direction, timer.label, timer.timer.seconds].join("-")} {...timer} /> })}        
        </Container>
});