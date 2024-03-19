import { component$, useStore, useVisibleTask$} from "@builder.io/qwik";
import TimerDisplay from "../timer-display/timer-display";
import Action from "../action/action";

export default component$(() => {        
    const store = useStore({    
        count: 0,        
        hour: -1,
        minute: -1,
        second: -1,    
    });

    
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
            <Action label="Action"/>                            
        </div>
    </div>
});