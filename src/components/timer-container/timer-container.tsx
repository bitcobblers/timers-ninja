import { component$, useStore, useVisibleTask$} from "@builder.io/qwik";
import TimerDisplay from "../timer-display/timer-display";
import Action from "../action/action";

export type timerArgs = {
    timer : any,
    label : string,
    direction : string,
}

export default component$((args:any) => {        
    //console.log(args);
    const store = useStore({ ...args.timer});

    
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {                              
        const update = () => {            
            // if ((args.start > args.end && store.count <= args.end) ||
            // (args.start < args.end && store.count >= args.end))                                
            // {
            //     clearInterval(tmrId);                
            // }
            
            store.second = store.count % 60;
            store.minute = Math.floor(store.count / 60);
            store.count += /*args.step ||*/ 1;
        };        
        const tmrId = setInterval(update, 1000);    
        return () => clearInterval(tmrId);
    });
    
    return <div>        
         <TimerDisplay {...store} />
         <div class="flex">           
        </div>
    </div>
});