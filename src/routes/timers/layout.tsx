import { component$, Slot } from "@builder.io/qwik";
import { useDocumentHead } from "@builder.io/qwik-city";
import TimerContainer from "~/components/timer-container/timer-container";

export default component$(() => {
  const { frontmatter } = useDocumentHead();
  
  return <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
  {/* <!-- Background backdrop, show/hide based on slide-over state. --> */}
  <div class="fixed inset-0 pt-20">    
    <div class="mx-auto max-w-4xl text-center">
      <TimerContainer />             
    </div>     
  </div>

  <div class="fixed inset-0 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden">
      <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">       
        <div class="pointer-events-auto w-screen max-w-md">
          <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
            <div class="px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">{frontmatter.title ?? "Timer"}</h2>
                <div class="ml-3 flex h-7 items-center">
                  <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span class="absolute -inset-2.5"></span>
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="relative mt-6 flex-1 px-4 sm:px-6">
              <Slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
});
          