import type { QRL} from "@builder.io/qwik";
import { component$, useStore, useVisibleTask$} from "@builder.io/qwik";
import TimerDisplay from "../timer-display/timer-display";

export type timerArgs = {
    hours?:number,
    minutes:number,
    seconds:number,
    label : string,
    direction : string,
    start$: QRL<(fn: QRL<() => void>) => void>;
    stop$: QRL<(fn: QRL<() => void>) => void>;    
    rest$: QRL<(fn: QRL<() => void>) => void>;
}

export default component$((args:timerArgs) => {        
   
    const store = useStore({ ...args });

    
    // eslint-disable-next-line qwik/no-use-visible-task
   useVisibleTask$(() => {                              
        const update = () => {            
            // if ((args.start > args.end && store.count <= args.end) ||
            // (args.start < args.end && store.count >= args.end))                                
            // {
            //     clearInterval(tmrId);                
            // }
            
            // store.seconds = store.count % 60;
            // store.minutes = Math.floor(store.count / 60);
            // store.count += /*args.step ||*/ 1;
        };        
        const tmrId = setInterval(update, 1000);    
        return () => clearInterval(tmrId);
    });
        
    return <div>        
         <TimerDisplay {...store} label={store.label} direction={store.direction}  />         
    </div>
});