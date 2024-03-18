import type { Meta, StoryObj } from "storybook-framework-qwik";
import CountDown from "~/components/count-down/count-down";

const meta: Meta<typeof CountDown>  = {
  component: CountDown,
};
 
export default meta;
type Story = StoryObj<typeof CountDown>; 
 
export const Primary: Story = {
  args: {
    step: { seconds: 10 }    
  }
};