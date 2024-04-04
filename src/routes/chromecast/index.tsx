import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

declare let cast: any;

export default component$(()=>{    
    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {        
        const instance = cast.framework.CastReceiverContext.getInstance();
        console.log(instance);
        console.log(instance.start());
    })
    return <div>ChromeCast</div>
});

export const head: DocumentHead = {
    // This will be used to resolve the <title> of the page
    title: 'Timers.Ninja Chromecast App',
    meta: [],
    scripts: [
      {             
        props: {
            type: "text/javascript",
            src: '//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js' 
        }
      },
    ],
  };