import { component$ } from "@builder.io/qwik";
import TimerDigits from "./timer-digits/timer-digits";

export default component$((props: any) => {
  return (
    <article id="commit-message-suggestions" class="">
      <div>
        <div class="dark:text-white-500 mx-auto max-w-7xl px-6 text-gray-500 lg:flex lg:px-8">
          <div class="lg:ml-96 lg:flex lg:w-full lg:justify-end lg:pl-32">
            <div
              class="pointer-events-auto mx-auto max-w-lg leading-8 lg:mx-0 lg:w-0 lg:max-w-xl lg:flex-auto"
              data-mdx-content="true"
            >
              <div class="flex items-center justify-between gap-x-6">
                <div class="">
                  <TimerDigits {...props.timer} />
                </div>
                <div class="min-w-0">
                  <div class="flex items-start gap-x-3">
                    <p class="text-sm font-semibold leading-6 text-gray-900"></p>
                  </div>
                  <div class="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                    <p class="text-md">{props.label}</p>
                  </div>
                </div>
                <div class="flex flex-none items-center gap-x-4">
                  <p class="mt-0.5 whitespace-nowrap rounded-md bg-gray-50 px-1.5 py-0.5 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                    Queued
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
});
