import type { IToken } from "chevrotain";

export type MdTimerStack = {    
  blocks: MDTimerCommand[];  
}

export enum MDTimerEntryType {
  Na,
  Timer,
  CountDown,
  Distance,
  Reptitions,
  Resistance,
}

export type MDTimerEntry = {
  type: MDTimerEntryType;
  value?: number;
  units: string;
  sources: IToken[];
}

export type MdTimeRepeater = {
  // Some type that will define how long the repeater runs, could be until lap
  // button is clicked for user input, for measuring times.
};

export type MDTimerCommand = {
  line: number;
  label : string;
  repeater : MdTimeRepeater;  
  metrics : MDTimerEntry[];
  children: MDTimerCommand[];
  sources: IToken[];
  timer() : number;
}

export type MDTimerStatementBuilder = {
  sources(): IToken[];
  apply(command: MDTimerCommand): void;
}

export class StatementLabelBuilder implements MDTimerStatementBuilder {
  constructor(private labels: IToken[]) {}
  apply(command: MDTimerCommand): void {
    command.label = this.labels.map(l => l.image).join(" ");
  }
  sources() : IToken[] { return this.labels }
}
export class StatementMetricBuilder implements MDTimerStatementBuilder {
  constructor(private entry: MDTimerEntry) {  }
  apply(command: MDTimerCommand): void {
    command.metrics.push(this.entry);
    
  }  
  sources() : IToken[] { return this.entry.sources; }
}

export type TimerInstance = {
  direction: string;
  timer: number;
};


export class MdWeightValue implements MDTimerEntry {
  constructor(units: string, value: number, sources: IToken[]) {
    this.type = MDTimerEntryType.Resistance;
    this.units = units;
    this.value = value;
    this.sources = sources;
  }

  type: MDTimerEntryType;
  value?: number;
  units: string;  
  sources: IToken[];
}

export class MdTimerValue implements MDTimerEntry {
  constructor(timerToken: string, direction: "up" | "down", sources: IToken[]) {
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
    
    this.type = direction == "up" 
      ? MDTimerEntryType.Timer 
      : MDTimerEntryType.CountDown;
    this.units = "seconds";  
    this.value = this.seconds * 1 
      + this.minutes * 60 
      + this.hours * 60 * 60 
      + this.days * 60 * 60 * 24;

    this.sources = sources;
  }

  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds? : number;
  units: string;
  type: MDTimerEntryType;  
  value? : number | undefined;
  sources: IToken[];

};

export class MdRepetitionValue implements MDTimerEntry {
  constructor(reps: number,sources: IToken[]) {
    this.value = reps;
    this.sources = sources;
  }
  value?: number | undefined;
  units = "Count"
  type = MDTimerEntryType.Reptitions;
  sources: IToken[];
}

export class MdRoundRepeater implements MdTimeRepeater {
  constructor(private rounds: number) {
  }
}

export class MdLapRepeater implements MdTimeRepeater {
}
