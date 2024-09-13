import type { IToken } from "chevrotain";
import { Duration } from "luxon";

/*
 
 

 

*/

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
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds? : number;
};

export class MdTimerFromSeconds implements MdTimerValue {
  constructor(miliseconds: number) {    
    const multiplier = 10 ** 3;
    let remaining = miliseconds;

    this.days = Math.floor(remaining  / 86400); 
    remaining  %= 86400;

    this.hours = Math.floor(remaining  / 3600);   
    remaining %= 3600;

    this.minutes = Math.floor(remaining / 60);    
    remaining %= 60;

    this.seconds = Math.floor(remaining)
    
    this.milliseconds = Math.round((remaining - this.seconds) * multiplier);
  }
  days?: number | undefined;
  hours?: number | undefined;
  minutes?: number | undefined;
  seconds?: number | undefined;
  milliseconds?: number | undefined;

  toString(): string { 
    var result = [];
    if (this.days != null && this.days != 0) {
      result.push(this.days.toString())
    }
    if (this.hours != null && this.hours != 0) {
      result.push(this.hours.toString())
    }
    if (this.minutes != null && this.minutes != 0) {
      result.push(this.minutes.toString())
    }    
    var sec = this.seconds?.toString() || "0";
    if (sec.length == 1) {
      sec = "0" + sec;
    }
    var mill = this.milliseconds?.toString() || "0";
    while (mill.length < 3) {
      mill = mill + "0";
    }        
    result.push(sec + "." + mill);  
    return result.join(":");
  }
}

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
