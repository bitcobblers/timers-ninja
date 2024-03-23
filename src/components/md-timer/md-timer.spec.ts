import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";

test(`ExpectingTokenToWorkNegative`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+1:80:5:3:10:00");
        
    expect(outcome.timer).toBeTruthy();
});

