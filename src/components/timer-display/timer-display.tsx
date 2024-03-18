import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";

export default component$((args: {step?:number, start:number, end:number}) => {
    
    const store = useStore({    
        count: args.start || 0,        
        hour: 0,
        minute: -1,
        second: -1,
    });


    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {                
        const update = () => {            
            if ((args.start > args.end && store.count <= args.end) ||
            (args.start < args.end && store.count >= args.end))                                
            {
                clearInterval(tmrId);                
            }
            
            store.second = store.count % 60;
            store.minute = Math.floor(store.count / 60);
            store.count += args.step || 1;
        };        
        const tmrId = setInterval(update, 1000 * Math.abs(args.step || 1));    
        return () => clearInterval(tmrId);
    });


    const padStart = (number: number) =>{        
        if (number < 0) {
            return ""
        }

        if(number< 10) {
            return "0" + number;
        }        

        return number.toString();
            
    };
    return <>
        <div class="text-center text-8xl font-bold text-gray-800 dark:text-white">
            {padStart(store.minute)}:{padStart(store.second)}
        </div>
    </>
})

export type TimerConfig = {
    
}

export type TimerStep = {
    seconds: number;
}
