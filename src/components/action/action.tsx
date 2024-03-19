import type { QRL} from "@builder.io/qwik";
import { component$, $ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export type ActionArgs = {
    label: string;
    href?: string;
    click$?: QRL<ActionArgs>
}
export default component$((args : ActionArgs)=>{
    const nav = useNavigate();
    const clickFn = args.click$ 
        ? args.click$ 
        : args.href 
            ? $(() => nav(args.href))
            : $(() => {})
    return <button type="button" onClick$={clickFn} class="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
    {args.label}
  </button>
})