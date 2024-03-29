import type { QRL } from "@builder.io/qwik";
import { component$, $, useOnDocument } from "@builder.io/qwik";
import { EditorState } from "@codemirror/state"
import { EditorView, } from "@codemirror/view"
import { basicSetup } from "codemirror";
import { ViewPlugin } from "@codemirror/view"
import { oneDark } from "@codemirror/theme-one-dark"

export type EditorProps = {
  value: string,
  onUpdate$: QRL<(value: string) => void>;
};

export default component$((params: EditorProps) => {

  useOnDocument("DOMContentLoaded", $((args: any) => {
    const notify = ViewPlugin.fromClass(class EventPlugin {
      update(update: any) {
        console.log(update.state.doc)
        if (update.docChanged)
          params.onUpdate$(update.state.doc.text.join("\n\r"))
      }
    })

    const startState = EditorState.create({
      doc: params.value,
      extensions: [basicSetup, oneDark]
    })


    const view = new EditorView({
      state: startState,
      parent: args.target.getElementById("editor"),
      extensions: [notify]
    })
    view.focus();
  }));


  return (<>
    <div id="editor" class="relative content-center bg-slate-50">
    </div>
    <div class="flex justify-center pt-6 space-x-6">
      <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Start
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
        </svg>
      </button>
      <button type="button" class="inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Stop
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z" />
        </svg>

      </button>

    </div>
  </>
  )
});  