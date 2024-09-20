import {
  component$
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import TimerPage from "~/components/timer-page/timer-page";
// import Intro from "~/components/Intro";

// declare let cast: any;
// declare let chrome: any;




export default component$(() => {
  const init = `[[   
    -20(Work)
    -10(Rest)
](8)
](pushups, pullups)`;
  return <TimerPage init={init} title="Playground" />;
});

export const head: DocumentHead = {
  // This will be used to resolve the <title> of the page
  title: "Timers.Ninja",
  meta: [],
  scripts: [
    {
      props: {
        type: "text/javascript",
        // src: "//www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1",
      },
    },
  ],
};
