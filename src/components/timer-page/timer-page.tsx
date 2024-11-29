import {
    component$,
    useStore,
    useSignal,
    useTask$,
    Slot,
    $,
    type QRL,
    createContextId,
    useContextProvider,
    Signal
  } from "@builder.io/qwik";
  
  import Editor from "~/components/editor";
  import TimelineEntry from "~/components/timeline-panel/timeline-entry";
  import { MdTimerCompiler } from "~/components/md-timer/md-timer";
  import ThemeToggle from "~/components/light-dark-toggle";
  import Glow from "~/components/media/glow";
  import Timeline from "~/components/timeline";
  import TimelineHeader from "~/components/timeline-panel/timeline-header";
  import TimerDisplay  from "~/components/timer-display/timer-display";
  import type {
    MDTimerCommand,
  } from "~/components/md-timer/timer.types";
  import { Version } from "~/version";
import MdTimerRuntime, { mdRuntimeContext, MDRuntimeContext, MDRuntimeEvent } from "../md-timer/md-timer-runtime";
import BuyACoffee from "../buy-a-coffee";
import NinjaImage from "../media/ninja-image";



   
  export type ContainerArgs  = {
  }


  const Container = component$((args : ContainerArgs) => {  
    return (
      <>
        <div class="relative flex-none overflow-hidden bg-gray-900 px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:flex lg:bg-transparent lg:px-0">
          <Glow />
          <div
            class="relative flex w-full lg:pointer-events-auto         
            lg:mr-[calc(max(2rem,50%-38rem))] lg:min-w-[32rem] lg:overflow-y-auto lg:overflow-x-hidden lg:pl-2"
          >
            <div class="mx-auto max-w-lg md:mx-64 lg:mx-[calc(max(2rem,50%-32rem))] lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
              <NinjaImage />
              <TimerDisplay {...args} size="5xl"/>
              <Slot name="editor" />
              <BuyACoffee username="sergeigolos" />
            </div>
          </div>
        </div>
  
        <div class="group absolute right-12 top-5 z-50 -m-2.5 p-2.5 text-xs text-slate-700">
          v{Version}
        </div>
        <ThemeToggle />
        <div class="pointer-events-none relative flex-auto">
          <Timeline />
          <main class="space-y-2 py-4 sm:space-y-2 sm:py-8 lg:py-10">
            <Slot />
          </main>
        </div>
      </>
    );
  });



export default component$((params: { init: string, title: string }) => {
    const markdown = useStore({ value: params.init });    
    const index = useSignal<number>(-1);
    const elapsted = useSignal<number>(0);
    const currentTimer = useSignal<number>(0);  
    const total = useSignal<number>(0);    
    const active = useSignal<MDTimerCommand|undefined>();
    const commands = useSignal<MDTimerCommand[]>([]);

    const next = $(() => {            
      index.value++;
      elapsted.value += active.value?.timer?.value || 0;
      active.value = index.value <= commands.value.length
        ? commands.value[index.value]
        : undefined;
      
        // if (active.value) {
        //   // active.value.status = "Running"        
        // }
      return active.value;
    });
  
    const complete = $(() => {    
    }) 
  
    const reset = $(() => {
      index.value = -1;
      active.value = undefined;
      elapsted.value = 0;
      currentTimer.value = 0;
    })
  
    const tick = $((elaps : number) => {
      currentTimer.value = elaps;
    })
  

    let nextFn: undefined | QRL<(event: MDRuntimeEvent) => void>;
    const next$ = $((next: QRL<(event: MDRuntimeEvent) => void>) => { nextFn = next; });    
    const tick$ = $((context: MDRuntimeContext) => {  });
    return (
      <MdTimerRuntime code={markdown.value} onInput={next$} tick={tick$}>        
        <Container>        
          <Editor q:slot="editor" />
          
          {commands.value.length > 0 ? <TimelineHeader  index={index.value} length={commands.value.length} title={params.title} elapsted={elapsted.value + currentTimer.value} total={total.value} /> : <div />}
          {/* {active.value && <TimelineEntry {...active.value} status={"Running"}/>}
          {commands.value.map((timer: MDTimerCommand, i: number) => {
            if (index.value == -1 || index.value < i) {
              return  <TimelineEntry {...timer} key={timer.line}  status=""/>;
            }
          })} */}
        </Container>
    </MdTimerRuntime>
    );
  });