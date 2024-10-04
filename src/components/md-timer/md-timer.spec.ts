import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";
import { MDTimerEntryType } from "./timer.types";



test(`parseRepeater`, async () => {
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("2x");    

    expect(outcome[0].multiplier?.value).toBe(2);    
})

test(`parseRepeaterAndLabel`, async () => {
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("2x Rounds");    

    expect(outcome[0].label).toBe("Rounds");    
})

test(`parseRepeaterAndLabelWithSpaces`, async () => {
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("2x Multi Rounds");    

    expect(outcome[0].label).toBe("Multi Rounds");    
})


test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":11");    
    
    expect(outcome[0].timer?.value).not.toBeNull();    
});
 

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":11 Pushups");    
    
    expect(outcome[0].label).toBe("Pushups")
});
 

test(`parsedDirectionUpExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+:11");    
    
    expect(outcome[0].timer?.type).toBe(MDTimerEntryType.StopWatch);    
});

test(`parsedDirectionDownExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("-:11");    
    
    expect(outcome[0].timer?.type).toBe(MDTimerEntryType.Timer);    
});


test(`parsedSeconds`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":11");
    const timer = outcome[0].timer?.value as number;
    ``
    expect(timer).toBe(11);    
});

 test(`parsedMinutes`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00");
     const timer = outcome[0].timer?.value as number
   
     expect(timer).toBe(11 * 60);    
});

test(`parsedHours`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00:00");
     const timer = outcome[0].timer?.value as number
   
     expect(timer).toBe(11 * 60 * 60);    
 });

 test(`parsedDays`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00:00:00");
     const timer = outcome[0].timer?.value as number
     expect(timer).toBe(11 * 60 * 60 * 24);
 });


test(`parseMultipleLines`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read(`:11\r\n-:22`);

     expect(outcome[0].timer?.value).toBe(11);
     expect(outcome[1].timer?.value).toBe(22);    
});



test(`parseMultipleLinesInGroup`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read(`:11\r\n-:22`);    
     expect(outcome[0].timer?.value).toBe(11);
     expect(outcome[1].timer?.value).toBe(22);      
});


test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`:11\r\n-:22\r\n\r\n:33`);
    
    expect(outcome[0].timer?.value).toBe(11);
    expect(outcome[1].timer?.value).toBe(22);    
    expect(outcome[2].timer?.value).toBe(33);    
});


test(`parsedShortWeight`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("@11");
    const weight = outcome[0].metrics[0].value as number
  
    expect(weight).toBe(11);    
});

test(`parsedWeightAndTime`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":10 @11LB");
    const time = outcome[0].timer?.value as number
    const weight = outcome[0].metrics[0].value as number
  
    expect(time).toBe(10);    
    expect(weight).toBe(11);    
});


test(`parsedWeightAndTimeAndLabel`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":10 Kb Swings @53LB");
    const time = outcome[0].timer?.value as number
    const weight = outcome[0].metrics[0].value as number
  
    expect(outcome[0].label).toBe("Kb Swings")
    expect(time).toBe(10);    
    expect(weight).toBe(53);    
});


// test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read(`[\r\n:11\r\n-:22\r\n test1,test2)\r\n:33`);
    
//     expect(outcome[0].metrics[0].value).toBe(11);
//     expect(outcome[1].metrics[0].value).toBe(22);    
//     expect(outcome[2].metrics[0].value).toBe(11);
//     expect(outcome[3].metrics[0].value).toBe(22);        
//     expect(outcome[4].metrics[0].value).toBe(33);    
// });

// test(`multiplierOnTimer`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read("2x :11");        
//     const repeater = outcome[0].repeater;
    
//     expect(repeater).not.toBeNull();    
// });