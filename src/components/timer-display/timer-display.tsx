import { component$ } from "@builder.io/qwik";

export default component$((args: {hours?:number, minutes:number, seconds:number, label: string, direction: string}) => {
   
    const padStart = (number: number) =>{        
        number = number || 0
        if (number < 0) {
            return "00"
        }

        if(number< 10) {
            return "0" + number;
        }        

        return number.toString();
            
    };
    return <>
        <div class="font-bold text-gray-800 
                    border-2 rounded-xl 
                    pl-5
                    pr-5
                     bg-green-50" >            
            <div class="text-center text-8xl">
                {padStart(args.minutes)}:{padStart(args.seconds)}
            </div>
        </div>
    </>
})

export type TimerDisplayArgs = {
    
}

export type TimerStep = {
    seconds: number;
}
