import { test, expect } from "vitest";
import { MdTimerCompiler } from "./md-timer";

test(`parseRepeater`, async () => {
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read("2x");    

    expect(outcome[0].multiplier?.value).toBe(2);    
})

test(`parseRepeaterAndLabel`, async () => {
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read("2x Rounds");    

    expect(outcome[0].label).toBe("Rounds");    
})

test(`parseRepeaterAndLabelWithSpaces`, async () => {
    const runtime = new MdTimerCompiler();
    const { outcome } = runtime.read("2x Multi Rounds");    

    expect(outcome[0].label).toBe("Multi Rounds");    
})
