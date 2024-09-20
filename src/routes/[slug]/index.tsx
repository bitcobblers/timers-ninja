import { component$, } from "@builder.io/qwik";
import {
  useLocation,
  type StaticGenerateHandler,
  type PathParams,
} from "@builder.io/qwik-city";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import timers from '~/../timers/timers.json'

import { isDev } from "@builder.io/qwik/build";
import TimerPage from "~/components/timer-page/timer-page";

const metaGlobComponents: Record<string, any> = import.meta.glob("/timers/*", {
  import: "default",
  query: "?raw",
  eager: isDev ? false : true,
});


export default component$((params: any) => {  
  const location = useLocation();
  const slug = location.url.pathname.replaceAll("/", "");
  const timer = timers.filter(n=>n.slug == slug)[0];
  
  console.log();
  
  return <TimerPage init={timer.seed} title={timer.title} />;
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different
  const pages = [] as any[]
  const args = [] as PathParams[];
  for (const i in metaGlobComponents) {    
    const slug = i.replace("/timers/", "").replace(".md", "");
    const filePath = path.resolve(`timers/${slug}.md`);
    const file = fs.readFileSync(filePath, 'utf8');
    const { content } = matter(file);  
    const titleMatch = new RegExp("# (.*)", "g");
    const codeMatch = new RegExp("```clock([\\s\\S]*?)```", "g");
    const title = titleMatch.exec(content);
    const clock = codeMatch.exec(content);        
    
    pages.push({      
      slug,
      title: (title![1] || "Unknown"),
      seed: (clock![1] || ""),
      raw: content,      
    })

    args.push({    
      slug      
    })
        
   
  }  
  fs.writeFileSync("./public/timers.json", JSON.stringify(pages))
  return {
    params: args,
  };
};