import { Duration } from "luxon";

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
