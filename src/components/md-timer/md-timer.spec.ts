import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(":11");    
    
    expect(outcome[0].metrics[0].value).not.toBeNull();    
});
 
// test(`parsedDirectionUpExplicit`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read("+:11");    
    
//     expect(outcome[0].icon).toBe("up");    
// });

// test(`parsedDirectionDownExplicit`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read("-:11");    
    
//     expect(outcome[0].icon).toBe("down");    
// });


// test(`parsedSeconds`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read(":11");
//     const timer = outcome[0].timer as number;
    
//     expect(timer).toBe(11);    
// });

 test(`parsedMinutes`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00");
     const timer = outcome[0].metrics[0].value as number
   
     expect(timer).toBe(11 * 60);    
});

test(`parsedHours`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00:00");
     const timer = outcome[0].metrics[0].value as number
   
     expect(timer).toBe(11 * 60 * 60);    
 });

 test(`parsedDays`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read("11:00:00:00");
     const timer = outcome[0].metrics[0].value as number
     expect(timer).toBe(11 * 60 * 60 * 24);
 });


test(`parseMultipleLines`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read(`:11\r\n-:22`);

     expect(outcome[0].metrics[0].value).toBe(11);
     expect(outcome[1].metrics[0].value).toBe(22);    
});



test(`parseMultipleLinesInGroup`, async () => {    
     const runtime = new MdTimerRuntime();
     const { outcome } = runtime.read(`[:11\r\n-:22]`);    
     expect(outcome[0].metrics[0].value).toBe(11);
     expect(outcome[1].metrics[0].value).toBe(22);      
});


test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`:11\r\n-:22\r\n\r\n:33`);
    
    expect(outcome[0].metrics[0].value).toBe(11);
    expect(outcome[1].metrics[0].value).toBe(22);    
    expect(outcome[2].metrics[0].value).toBe(33);    
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