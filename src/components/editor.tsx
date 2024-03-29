import type { QRL } from "@builder.io/qwik";
import { component$, $, useOnDocument } from "@builder.io/qwik";
import { EditorState } from "@codemirror/state"
import { EditorView, } from "@codemirror/view"
import { basicSetup } from "codemirror";
import { ViewPlugin } from "@codemirror/view"
import {oneDark} from "@codemirror/theme-one-dark"

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
      extensions: [notify ]
    })
    view.focus();
  }));


  return (
    <div id="editor" class="relative content-center bg-slate-50">
    </div>
  )
});  