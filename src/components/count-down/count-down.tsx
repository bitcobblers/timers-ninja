import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";

export default component$(() => {

    const store = useStore({
        count: 3,
        hour: 0,
        minute: -1,
        second: -1,
    });


    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {                
        const update = () => {            
            if (store.count == 0) {            
                clearInterval(tmrId);                
            }
            
            store.second = store.count % 60;
            store.minute = Math.floor(store.count / 60);
            store.count -= 1;
        };        
        const tmrId = setInterval(update, 1000);    
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

export type TimerStep = {
    seconds: number;
}
