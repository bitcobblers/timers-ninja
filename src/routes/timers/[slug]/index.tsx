import { component$ } from "@builder.io/qwik";
import { useLocation, type StaticGenerateHandler, type PathParams } from "@builder.io/qwik-city";
import { isDev } from '@builder.io/qwik/build';

const metaGlobComponents: Record<string, any> = import.meta.glob(
    '/timers/*',
    {
      import: 'default',
      query: '?raw',
      eager: isDev ? false : true,
    }
  );
export default component$(() => {
    
    const { params } = useLocation();
    console.log(params)
    return <p>Example: {params.slug}</p>;
})


export const onStaticGenerate: StaticGenerateHandler = async () => {
    // example of loading params for this use case
    // every implementation will be different
    const args = [] as PathParams[];
    for(const i in metaGlobComponents) {
        const item = metaGlobComponents[i];
        //console.log(item);
        const page = {
            slug: i.replace("/timers/", "").replace(".md", ""),
            value: isDev
                  ? await item()
                  // We need to call `await metaGlobComponents[componentPath]()` in development as it is `eager:false`
                  : item
                  // We need to directly access the `metaGlobComponents[componentPath]` expression in preview/production as it is `eager:true`
        };
        console.log(page);
        args.push(page);
    }
    return {
      params: args,
    };
  };

