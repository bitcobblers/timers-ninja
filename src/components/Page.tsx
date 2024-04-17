import { component$, useStore } from "@builder.io/qwik";
import TimerContainer from "~/components/timer-container/timer-container";

export default component$((props: any) => {
  const dateString = props.startDate;
  const store = useStore({ ...props });
  return (
    <article id="commit-message-suggestions" class="">
      <div>
        <div class="dark:text-white-500 mx-auto max-w-7xl px-6 text-gray-500 lg:flex lg:px-8">
          <div class="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
            <div
              class="pointer-events-auto mx-auto max-w-lg leading-8 lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto"
              data-mdx-content="true"
            >
              <div class="[&amp;+*]:mt-2 relative mt-2 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-900">
                <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10"></div>
              </div>

              <TimerContainer {...store} />
            </div>
          </div>
        </div>
        <header class="relative mt-1 sm:mt-2 xl:mb-0">
          {/* <div
            class="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">            
              <time 
                class="hidden xl:pointer-events-auto xl:block xl:text-2xs/4 xl:font-medium xl:text-white/50">{dateString} </time>            
            <div class="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0 xl:bg-gray-300">              
            </div>            
          </div>           */}
          <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div class="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
              <div class="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto">
                <div class="flex">
                  <time class="text-2xs/4 font-medium text-gray-500 dark:text-white/50">
                    {dateString}
                  </time>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </article>
  );
});
