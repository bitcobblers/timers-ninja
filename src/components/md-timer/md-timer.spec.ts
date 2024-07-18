import { test, expect } from "vitest";
import { MdTimerRuntime } from "./md-timer";
import { Duration } from "luxon";

import { Subject, interval, lastValueFrom, withLatestFrom, takeUntil, of, map } from 'rxjs';

test(`observableTakeUnit`, async () => {    
// Create a subject as the notifier
    const stopSignal$ = new Subject<void>();
    const counter: string[] = [];
    // Main observable (e.g., emitting values every second)
    const mainObservable$ = interval(100); // Emits 0, 1, 2, ... every second

    // Combine with takeUntil
    const controlledObservable$ = mainObservable$.pipe(
    takeUntil(stopSignal$)
    );

    const userInput$ = new Subject<string>();
    

    // Subscribe to the controlled observable
    const combined$ = controlledObservable$.pipe(
        withLatestFrom(userInput$),
        map(([intervalValue, latestUserInput]) => [intervalValue, latestUserInput]) // Create tuple
      );

      combined$.subscribe({
        next: (value) => counter.push(value[0].toString() + value[1]),
        complete: () => counter.push("done")
    });

    userInput$.next("start");
    setTimeout(() => {
        console.log('Stopping the main observable...');
        userInput$.next("pause");
    }, 150);

    setTimeout(() => {
        console.log('Stopping the main observable...');
        userInput$.next("start");
    }, 350);

    // Simulate an external event after 5 seconds
    setTimeout(() => {
        console.log('Stopping the main observable...');
        stopSignal$.next(); // Emit a value to stop the main observable
    }, 550);
    
    await lastValueFrom(controlledObservable$);
    expect(counter.length).toBe(6);
});
test(`parsedDirectionUpDefault`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11");    
    
    expect(outcome[0].type?.label).toBe("up");    
});
 
test(`parsedDirectionUpExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("+11");    
    
    expect(outcome[0].type?.label).toBe("up");    
});

test(`parsedDirectionDownExplicit`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("-11");    
    
    expect(outcome[0].type?.label).toBe("down");    
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
    const {outcome} = runtime.read("11:00:00:00:00");
    const timer = outcome[0].timer as Duration    
    expect(timer.months).toBe(11);
});

test(`parseYears`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11:00:00:00:00:00");
    const timer = outcome[0].timer as Duration    
    expect(timer.years).toBe(11);
});

test(`parseMultipleLines`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`11\r\n-22`);

    expect(outcome[0].timer.seconds).toBe(11);
    expect(outcome[1].timer.seconds).toBe(22);    
});



test(`parseMultipleLinesInGroup`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`[11\r\n-22]`);    
    expect(outcome[0].timer.seconds).toBe(11);
    expect(outcome[1].timer.seconds).toBe(22);    
});


test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`[\r\n11\r\n-22\r\n]\r\n33`);
    
    expect(outcome[0].timer.seconds).toBe(11);
    expect(outcome[1].timer.seconds).toBe(22);    
    expect(outcome[2].timer.seconds).toBe(33);    
});


test(`parseMultipleLinesInMixedGroupAndStandAlone`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read(`[\r\n11\r\n-22\r\n](test1,test2)\r\n33`);
    
    expect(outcome[0].timer.seconds).toBe(11);
    expect(outcome[1].timer.seconds).toBe(22);    
    expect(outcome[2].timer.seconds).toBe(11);
    expect(outcome[3].timer.seconds).toBe(22);        
    expect(outcome[4].timer.seconds).toBe(33);    
});

test(`multiplierOnTimer`, async () => {    
    const runtime = new MdTimerRuntime();
    const { outcome } = runtime.read("11(2)");        
    const timer = outcome[1].timer as Duration;
    
    expect(timer.seconds).toBe(11);    
});