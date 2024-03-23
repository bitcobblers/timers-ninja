import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";
import moment from "moment";

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11");    
    
    expect(outcome.direction).toBe("count up");    
});

test(`parsedDirectionUpExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+11");    
    
    expect(outcome.direction).toBe("count up");    
});

test(`parsedDirectionDownExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("-11");    
    
    expect(outcome.direction).toBe("count down");    
});


test(`parsedSeconds`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11");
    const timer = outcome.timer as moment.Moment;
    
    expect(timer.seconds()).toBe(11);    
});

test(`parsedMinutes`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00");
    const timer = outcome.timer as moment.Moment;
    
    expect(timer.minutes()).toBe(11);    
});

test(`parsedHours`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00");
    const timer = outcome.timer as moment.Moment;
    
    expect(timer.hours()).toBe(11);    
});


// test(`parsedDays`, async () => {    
//     const runtime = new MdTimerRuntime();
//     const { outcome } = runtime.read("11:00:00:00");
//     const timer = outcome.timer as moment.Moment;
//     console.log(timer);
//     expect(timer.day()).toBe(11);
// });



test(`longDate`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+1:80:5:3:10:00");
        
    expect(outcome.timer).toBeTruthy();
});

test(`ExpectingTokenToWorkNegative`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+1:80:5:3:10:00");
        
    expect(outcome.timer).toBeTruthy();
});


