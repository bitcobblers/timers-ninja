import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return <img
      height={256}
      width={256}
      class="mx-auto h-24 w-32 rounded-full lg:h-48 lg:w-64"
      src="../../ninja-on-timer.png"
      alt={`Timers Ninja Image`}
    />
  });