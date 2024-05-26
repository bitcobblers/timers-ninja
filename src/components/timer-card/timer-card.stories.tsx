import type { Meta, StoryObj } from "storybook-framework-qwik";
import TimerCard from "~/components/timer-card/timer-card";

const meta: Meta<typeof TimerCard> = {
  component: TimerCard,
};

export default meta;
type Story = StoryObj<typeof TimerCard>;

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
