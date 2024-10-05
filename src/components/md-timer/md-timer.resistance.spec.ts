import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";

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
