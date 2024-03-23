import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";
import { Duration } from "luxon";

test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11");    
    
    expect(outcome[0].direction).toBe("count up");    
});

test(`parsedDirectionUpExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+11");    
    
    expect(outcome[0].direction).toBe("count up");    
});

test(`parsedDirectionDownExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("-11");    
    
    expect(outcome[0].direction).toBe("count down");    
});


test(`parsedSeconds`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11");
    const timer = outcome[0].timer as Duration;
    
    expect(timer.seconds).toBe(11);    
});

test(`parsedMinutes`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00");
    const timer = outcome[0].timer as Duration
    
    expect(timer.minutes).toBe(11);    
});

test(`parsedHours`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00");
    const timer = outcome[0].timer as Duration
    
    expect(timer.hours).toBe(11);    
});

test(`parsedDays`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00:00");
    const timer = outcome[0].timer as Duration    
    expect(timer.days).toBe(11);
});

test(`parseMonths`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00:00:00");
    const timer = outcome[0].timer as Duration    
    expect(timer.months).toBe(11);
});

test(`parseYears`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00:00:00:00");
    const timer = outcome[0].timer as Duration    
    expect(timer.years).toBe(11);
});
