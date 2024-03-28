import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  
  
  return <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
  <div class="fixed inset-0 pt-20">    
    <div class="mx-auto max-w-4xl text-center">
    <Slot />        
    </div>     
  </div>
  
</div>
});
          