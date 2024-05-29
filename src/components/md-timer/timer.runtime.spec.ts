import { test, expect } from "vitest";
import { MdTimerRuntime } from "./timer.runtime";

test(`parsedDirectionUpDefault`, async () => {    
    var runtime = new MdTimerRuntime({ blocks : []});
    expect(runtime.start()).toBe(true);
});