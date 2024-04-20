import type { QRL } from "@builder.io/qwik";
import { component$, $, useOnDocument } from "@builder.io/qwik";
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { ViewPlugin } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";

export type EditorProps = {
  value: string;
  onUpdate$: QRL<(value: string) => void>;
};

// const ComboBox = component$((args: { selected: string })=> {
//   return <div>
//   <label for="combobox" class="block text-sm font-medium leading-6 text-gray-900">Assigned to</label>
//   <div class="relative mt-2">
//     <input id="combobox" type="text" class="w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" role="combobox" aria-controls="options" aria-expanded="false" value={args.selected} />
//     <button type="button" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
//       <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//         <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
//       </svg>
//     </button>

//     <ul class="absolute hidden z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" id="options" role="listbox">

//       <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900" id="option-0" role="option" tabIndex={-1}>
//         <span class="block truncate">Leslie Alexander</span>
//         <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
//           <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//             <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
//           </svg>
//         </span>
//       </li>
//     </ul>
//   </div>
// </div>
// });

export default component$((params: EditorProps) => {
  useOnDocument(
    "DOMContentLoaded",
    $((args: any) => {
      const notify = ViewPlugin.fromClass(
        class EventPlugin {
          update(update: any) {            
            if (update.docChanged)
              params.onUpdate$(update.state.doc.text.join("\n\r"));
          }
        },
      );

      const startState = EditorState.create({
        doc: params.value,
        extensions: [basicSetup, notify, oneDark],
      });

      const view = new EditorView({
        state: startState,
        parent: args.target.getElementById("editor"),
        extensions: [notify],
      });
      view.focus();
    }),
  );

  return (
    <>
      <div id="editor" class="relative mt-4 content-center bg-slate-50"></div>
    </>
  );
});
