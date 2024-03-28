import { component$ } from "@builder.io/qwik";

export default component$((args: {hours?:number, minutes:number, seconds:number}) => {
         
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
        <div class="text-center text-8xl font-bold text-gray-800 
                    border-2 rounded-xl p-5 bg-green-50" >
            {padStart(args.minutes)}:{padStart(args.seconds)}
        </div>
    </>
})

export type TimerDisplayArgs = {
    
}

export type TimerStep = {
    seconds: number;
}
