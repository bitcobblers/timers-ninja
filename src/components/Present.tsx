import { component$ } from "@builder.io/qwik"
export interface TimeLineEntryProperties {
  summary: string
  position: string,
  startDate: string
  highlights: string[],
  company: string,
  website?: string,
  companyLogo?: string,
}

export default component$(() => {
  return (
    <article id="commit-message-suggestions" class="scroll-mt-16">
      <div>            
        <header class="relative mb-2 xl:mb-0">
          {/* <div
            class="pointer-events-none absolute left-[max(-0.5rem,calc(50%-18.625rem))] top-0 z-50 flex h-4 items-center justify-end gap-x-2 lg:left-0 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] xl:h-8">
            <a class="inline-flex" href="#commit-message-suggestions">
              <time data-datetime={new Date()}
                class="hidden xl:pointer-events-auto xl:block xl:text-2xs/4 xl:font-medium xl:text-white/50">Start</time>
            </a>
            <div class="h-[0.0625rem] w-3.5 bg-gray-400 lg:-mr-3.5 xl:mr-0 xl:bg-gray-300"></div>
          </div> */}
          <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
            <div class="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
              <div class="mx-auto max-w-lg lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto">
                <div class="flex"><a class="inline-flex" href="#commit-message-suggestions"><time
                  data-datetime={new Date()}
                  class="text-2xs/4 font-medium text-gray-500  dark:text-white/50">Start</time></a></div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </article>
  )
})
