
import type { Meta, StoryObj } from "storybook-framework-qwik";
import type EditorProps from "../editor";
import { QwikCityMockProvider } from "@builder.io/qwik-city";
import Editor from "../editor";
import { $ } from "@builder.io/qwik";

const meta: Meta<typeof EditorProps> = {
  component: Editor,
  argTypes: {    
  },
};

export default meta;
type Story = StoryObj<typeof EditorProps> 

export const Primary: Story = {  
  args: {
    value:`
    :01`
  },
  render: (args: any) => {
    <Editor value={args.value} onUpdate$={$(val => console.log())} />  
  }
};

