import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";
import { MDTimerEntryType } from "./timer.types";


test(`parsedWeightAndTimeAndLabelAndMultiplier`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("2x :10 Kb Swings @53LB");
    const multiplier = outcome[0].multiplier?.value as number
    const time = outcome[0].timer?.value as number
    const weight = outcome[0].metrics[0].value as number
  
    expect(outcome[0].label).toBe("Kb Swings")
    expect(time).toBe(10);    
    expect(weight).toBe(53);    
    expect(multiplier).toBe(2)
});

test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`
test1, test2
:11
-:22 

:33`);
    
    expect(outcome[0].multiplier?.value).toBe(2);
    expect(outcome[0].children[0].timer?.value).toBe(11);    
    expect(outcome[0].children[1].timer?.value).toBe(22);
    expect(outcome[1].timer?.value).toBe(33);
});

test(`multiplierOnTimer`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("2x :11");        
    const repeater = outcome[0].multiplier;
    
    expect(repeater).not.toBeNull();    
});