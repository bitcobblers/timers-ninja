import { component$, } from "@builder.io/qwik";
import {
  useLocation,
  type StaticGenerateHandler,
  type PathParams,
} from "@builder.io/qwik-city";

import TimerPage from "~/components/timer-page/timer-page";
import timers from "~/timers.json"

export default component$(() => {  

  const location = useLocation();
  const slug = location.url.pathname.replaceAll("/", "");
  const timer = timers.filter(n=>n.slug == slug)[0];
  
  return <TimerPage init={timer.seed} title={timer.title} />;
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different    
  const args = [] as PathParams[];  
  for (const i in timers) {    
    if (i.endsWith("json")) continue;
    
    args.push({    
      slug: timers[i].slug      
    })           
  }    
  return {
    params: args,
  };
};