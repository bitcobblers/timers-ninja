import type { IToken } from "chevrotain";
import { Duration } from "luxon";

export type MdTimerStack = {  
  
  blocks: MdTimerBlock[];  
}

export type MdTimerTrace = {
  events: MdTimerBlockEvent[];
}

export type MdTimerBlockEvent = {
  eventId: number;
  timestamp: Date;
  type: string;
  metadata : any;
}

export type MdTimerOptional = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
};
export type MdTimerValue = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds: number;
};

export type MdTimerBlock = {
  timer: MdTimerValue;
  type?: {
    step: number;
    label: string;
  };
  round?: number;
  label?: string;
  sources: IToken[];
};

export type TimerInstance = {
  direction: string;
  timer: Duration;
};

export class SegmentComposer {
  compose(segments: number[]): Duration {
    while (segments.length < 6) {
      segments.push(0);
    }
    return Duration.fromObject({
      years: segments[5],
      months: segments[4],
      days: segments[3],
      hours: segments[2],
      minutes: segments[1],
      seconds: segments[0],
    });
  }
}
