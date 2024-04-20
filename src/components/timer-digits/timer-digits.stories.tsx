import type { Meta, StoryObj } from "storybook-framework-qwik";
import TimerDigits from "~/components/timer-digits/timer-digits";

const meta: Meta<typeof TimerDigits> = {
  component: TimerDigits,  
};

export default meta;
type Story = StoryObj<typeof TimerDigits>;

export const Primary: Story = {
  args: {  
    seconds: 1,
    minutes: 1  
  }
};