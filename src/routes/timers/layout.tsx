import { component$, Slot } from "@builder.io/qwik";
import CountDown from "~/components/count-down/count-down";

export default component$(() => {
  return <div class="mx-auto max-w-4xl text-center">
        <Slot />
        <div class="mx-auto max-w-4xl text-center p-10">            
            <CountDown />
          </div>
        </div>        
});
          