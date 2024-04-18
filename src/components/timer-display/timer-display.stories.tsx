import type { Meta, StoryObj } from "storybook-framework-qwik";
import TimerDisplay from "~/components/timer-display/timer-display";

const meta: Meta<typeof TimerDisplay> = {
  component: TimerDisplay,
};

export default meta;
type Story = StoryObj<typeof TimerDisplay>;

export const Primary: Story = {
  args: {
    timer: {
      seconds: 1,
      minutes: 1,
    },
    icon: "up",
    label: "Label",
    round: 1
  }
};

export const Empty: Story = {
  args: { timer: {} },
};

export const Negative: Story = {
  args: {
    timer: {
      seconds: -1,
      minutes: -1,
    },
  },
};
