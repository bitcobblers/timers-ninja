import type { Meta, StoryObj } from "storybook-framework-qwik";
import TimerContainer from "~/components/timer-container/timer-container";

const meta: Meta<typeof TimerContainer> = {
  component: TimerContainer,
};

export default meta;
type Story = StoryObj<typeof TimerContainer>;

export const CountUp: Story = {
  args: {
    step: 1,
    start: 0,
  },
};

export const CountDown: Story = {
  args: {
    step: -1,
    start: 360,
    end: 0,
  },
};
