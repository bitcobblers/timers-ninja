import { component$ } from "@builder.io/qwik";
import {
  useLocation,
  type StaticGenerateHandler,
  type PathParams,
} from "@builder.io/qwik-city";
import { isDev } from "@builder.io/qwik/build";
import TimerPage from "~/components/timer-page/timer-page";

const metaGlobComponents: Record<string, any> = import.meta.glob("/timers/*", {
  import: "default",
  query: "?raw",
  eager: isDev ? false : true,
});
export default component$(() => {
  const { params } = useLocation();  
  return <TimerPage init={params.seed} title={params.title} />;
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different
  const args = [] as PathParams[];
  const titleMatch = new RegExp("# (.*)");
  const codeMatch = new RegExp("```clock([\\s\\S]*?)```", "g");
  for (const i in metaGlobComponents) {
    const item = metaGlobComponents[i];        
    const page = isDev
      ? await item()
      : // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
        item;
      // We need to directly access the `metaGlobComponents[componentPath]` expression in preview/production as it is `eager:true`
    
    const title = titleMatch.exec(page.value);
    if (title?.groups) {
      console.log(title.groups[1]);
    }

    const seed = codeMatch.exec(page.value);
    if (seed?.groups) {
      console.log(seed.groups[1]);
    }

    args.push({
      slug: i.replace("/timers/", "").replace(".md", ""),
      seed: seed?.groups![1] || "",
      title: title?.groups![1] || "",  
   });

    console.log(page);
  }
  return {
    params: args,
  };
};
