import type { IToken } from "chevrotain";

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
export enum MDTimerEntryType {
  Time,
  Distance,
  Reptitions,
  Weight,
}

export type MDTimerEntry = {
  type: MDTimerEntryType;
  value?: number;
  units: string;  
}

export class MdWeightValue implements MDTimerEntry {
  constructor(units: string, value: number) {
    this.type = MDTimerEntryType.Weight;
    this.units = units;
    this.value = value;
  }
  
  type: MDTimerEntryType;
  value?: number;
  units: string;  
}

export class MdTimerValue implements MDTimerEntry {
  constructor(timerToken: string) {
    const segments = timerToken.split(":")
        .reverse()
        .map((d : unknown)=> d as number);
   
    while (segments.length < 4) {
      segments.push(0);
    }
      
    this.days = segments[3];
    this.hours = segments[2];
    this.minutes = segments[1];
    this.seconds = segments[0];  
    this.milliseconds = 0;
    
    this.type = MDTimerEntryType.Time;
    this.units = "seconds";  
    this.value = this.seconds * 1 
      + this.minutes * 60 
      + this.hours * 60 * 60 
      + this.days * 60 * 60 * 24;
  }

  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds? : number;
  units: string;
  type: MDTimerEntryType;  
  value? : number | undefined;
};

export type MdTimeRepeater = {
  // Some type that will define how long the repeater runs, could be until lap
  // button is clicked for user input, for measuring times.
};

export type MDTimerCommand = {
  label : string;
  repeater : MdTimeRepeater;  
  metrics : MDTimerEntry[];
  children: MDTimerCommand[];
}




export type MdTimerBlock = {
  timer: number;
  icon: string;  
  round?: number;
  label?: string;
  sources: IToken[];
};

export type TimerInstance = {
  direction: string;
  timer: number;
};
