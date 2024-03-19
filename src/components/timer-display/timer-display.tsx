import { component$ } from "@builder.io/qwik";

export default component$((args: {hour?:number, minute:number, second:number}) => {
         
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
            {padStart(args.minute)}:{padStart(args.second)}
        </div>
    </>
})

export type TimerDisplayArgs = {
    
}

export type TimerStep = {
    seconds: number;
}
