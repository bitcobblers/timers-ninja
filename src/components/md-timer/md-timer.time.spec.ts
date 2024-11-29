import { test, expect } from "vitest";
import { MdTimerCompiler } from "./md-timer";
import { MDTimerEntryType } from "./timer.types";

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read(":11");    
    
    expect(outcome[0].timer?.value).not.toBeNull();    
});
 

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read(":11 Pushups");    
    
    expect(outcome[0].label).toBe("Pushups")
});
 

test(`parsedDirectionUpExplicit`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read("+:11");    
    
    expect(outcome[0].timer?.type).toBe(MDTimerEntryType.StopWatch);    
});

test(`parsedDirectionDownExplicit`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read("-:11");    
    
    expect(outcome[0].timer?.type).toBe(MDTimerEntryType.Timer);    
});


test(`parsedSeconds`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read(":11");
    const timer = outcome[0].timer?.value as number;
    
    expect(timer).toBe(11);    
});

 test(`parsedMinutes`, async () => {    
     const runtime = new MdTimerCompiler();
     const { outcome } = runtime.read("11:00");
     const timer = outcome[0].timer?.value as number
   
     expect(timer).toBe(11 * 60);    
});

test(`parsedHours`, async () => {    
     const runtime = new MdTimerCompiler();
     const { outcome } = runtime.read("11:00:00");
     const timer = outcome[0].timer?.value as number
   
     expect(timer).toBe(11 * 60 * 60);    
 });

 test(`parsedDays`, async () => {    
     const runtime = new MdTimerCompiler();
     const { outcome } = runtime.read("11:00:00:00");
     const timer = outcome[0].timer?.value as number
     expect(timer).toBe(11 * 60 * 60 * 24);
 });


test(`parseMultipleLines`, async () => {    
     const runtime = new MdTimerCompiler();
     const { outcome } = runtime.read(`:11\r\n-:22`);

     expect(outcome[0].timer?.value).toBe(11);
     expect(outcome[1].timer?.value).toBe(22);    
});



test(`parseMultipleLinesInGroup`, async () => {    
     const runtime = new MdTimerCompiler();
     const { outcome } = runtime.read(`:11\r\n-:22`);    
     expect(outcome[0].timer?.value).toBe(11);
     expect(outcome[1].timer?.value).toBe(22);      
});


test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read(`:11\r\n-:22\r\n\r\n:33`);
    
    expect(outcome[0].timer?.value).toBe(11);
    expect(outcome[1].timer?.value).toBe(22);    
    expect(outcome[2].timer?.value).toBe(33);    
});
