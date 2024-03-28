import { component$, useStore} from "@builder.io/qwik";
import TimerDisplay from "../timer-display/timer-display";

export type timerArgs = {
    timer : any,
    label : string,
    direction : string,
}

export default component$((args:any) => {        
   
    const store = useStore({ ...args.timer, direction: args.direction, label: args.label });

    
    // eslint-disable-next-line qwik/no-use-visible-task
    // useVisibleTask$(() => {                              
    //     const update = () => {            
    //         // if ((args.start > args.end && store.count <= args.end) ||
    //         // (args.start < args.end && store.count >= args.end))                                
    //         // {
    //         //     clearInterval(tmrId);                
    //         // }
            
    //         store.seconds = store.count % 60;
    //         store.minutes = Math.floor(store.count / 60);
    //         store.count += /*args.step ||*/ 1;
    //     };        
    //     const tmrId = setInterval(update, 1000);    
    //     return () => clearInterval(tmrId);
    // });
    
    return <div>        
         <TimerDisplay {...store} />         
    </div>
});