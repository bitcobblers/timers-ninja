import type { Meta, StoryObj } from "storybook-framework-qwik";
import TimerDisplay from "~/components/timer-display/timer-display";

const meta: Meta<typeof TimerDisplay>  = {
  component: TimerDisplay,
};
 
export default meta;
type Story = StoryObj<typeof TimerDisplay>; 
 
export const Primary: Story = {
  args: {
    second: 1,
    minute: 1
  }
};

export const Empty: Story = {
  args: {}
};

export const Negative: Story = {
  args: {
    second: -1,
    minute: -1
  }
};