import { component$ } from "@builder.io/qwik";
import TimerDigits from "../timer-digits/timer-digits";
export type TimelineHeaderArgs = {  
  index: number;
  length: number;
  title: string;
  elapsted: number;
  total: number;
}
export default component$((args: TimelineHeaderArgs) => {
  return (
    <article id="commit-message-suggestions" class="scroll-mt-16">
      <div>
        <header class="relative mb-2 xl:mb-0">
          <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div class="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
              <div class="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto">
                <div class="overflow-hidden bg-white">
                  <h2 class="sr-only" id="profile-overview-title">Profile Overview</h2>
                  <div class="bg-white">
                    <div class="sm:flex sm:items-center sm:justify-between">
                      <div class="sm:flex sm:space-x-5">                        
                        <div class="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">                          
                          <p class="text-xl font-bold text-gray-900 sm:text-2xl pb-3">{args.title}</p>                          
                        </div>
                      </div>                      
                    </div>
                  </div>
                  <div class="grid grid-cols-1 divide-y divide-gray-200 border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                    <div class="px-6 py-2 text-center text-sm font-medium">
                      <span class="text-gray-900">{args.index + 1}</span>
                      <span class="text-gray-600"> of {args.length}</span>
                    </div>
                    <div class="px-6 py-2 text-center text-sm font-medium grid grid-cols-2 gap-x-1">
                      <span class="text-gray-900">Elapsted:</span>
                      <span class="text-gray-600"> {<TimerDigits seconds={args.elapsted} /> }</span>
                    </div>
                    <div class="px-6 py-2 text-center text-sm font-medium grid grid-cols-2 gap-x-1">
                      <span class="text-gray-900">Total:</span>
                      <span class="text-gray-600"> {<TimerDigits seconds={args.total} /> }</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </article>
  );
});
