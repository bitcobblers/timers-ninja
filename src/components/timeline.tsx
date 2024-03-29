import { component$ } from "@builder.io/qwik";

export default component$(() => {
    const id = "timeline";

    return (
      <div class="pointer-events-none absolute inset-0 z-50 overflow-hidden lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-visible">
        <svg
          class="absolute left-[max(0px,calc(50%-18.125rem))] top-0 h-full w-1.5 lg:left-full lg:ml-1 xl:left-auto xl:right-1 xl:ml-0"
          aria-hidden="true"
        >
          <defs>
            <pattern id={id} width="6" height="8" patternUnits="userSpaceOnUse">
              <path
                d="M0 0H6M0 8H6"
                class="stroke-sky-900/10 xl:stroke-white/10 dark:stroke-white/10"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${id})`} />
        </svg>
      </div>
    )
});  