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
    public units: string)
  {
  }
}

export type IMDTimerEntry = {
  type: MDTimerEntryType;
  value?: number;
  units: string;  
}

export type MDTimerCommand = {    
  line: number;
  label : string;
  multiplier: undefined | IMDTimerEntry;
  timer: undefined | IMDTimerEntry;
  metrics : IMDTimerEntry[];
  children: MDTimerCommand[];  
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
  constructor(private entry: IMDTimerEntry, private tokens: IToken[]) {  }
  apply(command: MDTimerCommand): void {
    command.timer = this.entry;    
  }  
  sources() : IToken[] { return this.tokens; }
}
export class StatementMultiplierBuilder implements MDTimerStatementBuilder {
  constructor(private entry: IMDTimerEntry, private tokens: IToken[]) {  }
  apply(command: MDTimerCommand): void {
    command.multiplier = this.entry;    
  }  
  sources() : IToken[] { return this.tokens; }
}

export class StatementMetricBuilder implements MDTimerStatementBuilder {
  constructor(private entry: IMDTimerEntry, private tokens: IToken[]) {  }
  apply(command: MDTimerCommand): void {
    command.metrics.push(this.entry);    
  }  
  sources() : IToken[] { return this.tokens; }
}

export function MdMultiplierValue(reps: number) : IMDTimerEntry {
  return {
    type : MDTimerEntryType.Reptitions,
    value: reps,
    units: ""
  }
}

export function MdRepetitionValue (reps: number): IMDTimerEntry {    
  return { 
    type: MDTimerEntryType.Reptitions,
    value: reps,
    units: "Reps"
  }  
}

export function MdWeightValue(units: string, value: number): IMDTimerEntry {
  return {
    type :MDTimerEntryType.Resistance,
    value,
    units
  }
}

export function LabelMultiplierValue(labels: string[]): IMDTimerEntry {
  return MdMultiplierValue(labels.length);
  //   constructor(public labels: string[]) {    
//     super(labels.length);
//   }
}

export class EmptyTimer extends MDTimerEntry {
  constructor(){
    super(MDTimerEntryType.Timer, 0, "seconds");
  }
}

export function MdTimerValue(timerToken: string, direction: "up" | "down") : IMDTimerEntry & any {  
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

    return {
      type,
      value: total,
      units: "seconds",
      days: segments[3],
      this: segments[2],
      minutes: segments[1],
      seconds: segments[0], 
      milliseconds: 0
    }    
  }
