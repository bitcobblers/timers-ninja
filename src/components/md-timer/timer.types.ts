import type { IToken } from "chevrotain";

export type MdTimerStack = {    
  blocks: MDTimerCommand[];  
}

export enum MDTimerEntryType {  
  Timer,  
  StopWatch,
  Distance,
  Reptitions,
  Resistance,
  Multiplier
}

export abstract class MDTimerEntry implements IMDTimerEntry {
  constructor(public type: MDTimerEntryType,
    public value: undefined | number,
    public units: string, 
    public sources: IToken[])
  {
  }
}

export type IMDTimerEntry = {
  type: MDTimerEntryType;
  value?: number;
  units: string;
  sources: IToken[];
}

export type MDTimerCommand = {    
  line: number;
  label : string;
  multiplier: undefined | IMDTimerEntry;
  timer: undefined | IMDTimerEntry;
  metrics : IMDTimerEntry[];
  children: MDTimerCommand[];
  sources: IToken[];
  // timer() : number;
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
  sources() : IToken[] { return this.labels || [] }
}
export class StatementTimerBuilder implements MDTimerStatementBuilder {
  constructor(private entry: IMDTimerEntry) {  }
  apply(command: MDTimerCommand): void {
    command.timer = this.entry;    
  }  
  sources() : IToken[] { return this.entry.sources; }
}
export class StatementMultiplierBuilder implements MDTimerStatementBuilder {
  constructor(private entry: IMDTimerEntry) {  }
  apply(command: MDTimerCommand): void {
    command.multiplier = this.entry;    
  }  
  sources() : IToken[] { return this.entry.sources; }
}


export class StatementMetricBuilder implements MDTimerStatementBuilder {
  constructor(private entry: IMDTimerEntry) {  }
  apply(command: MDTimerCommand): void {
    command.metrics.push(this.entry);    
  }  
  sources() : IToken[] { return this.entry.sources; }
}

export class MdRepetitionValue extends MDTimerEntry {
  constructor(reps: number, sources: IToken[]) {    
    super(MDTimerEntryType.Reptitions,reps, "Reps", sources);
  }  
}

export class MdWeightValue extends MDTimerEntry {
  constructor(units: string, value: number, sources: IToken[]) {
    super(MDTimerEntryType.Resistance,value, units, sources);
  }
}

export class MdTimerValue extends MDTimerEntry {
  constructor(timerToken: string, direction: "up" | "down", sources: IToken[]) {    
    const segments = timerToken.split(":")
        .reverse()
        .map((d : unknown)=> d as number);
   
    while (segments.length < 4) {
      segments.push(0);
    }
    const type = direction == "up"     
    ? MDTimerEntryType.StopWatch
    : MDTimerEntryType.Timer;
    const total = segments[0] * 1 
    + segments[1] * 60 
    + segments[2] * 60 * 60 
    + segments[3] * 60 * 60 * 24;

    super(type, total, "seconds", sources);

    this.days = segments[3];
    this.hours = segments[2];
    this.minutes = segments[1];
    this.seconds = segments[0];  
    this.milliseconds = 0;
  }

  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds? : number; 
};
