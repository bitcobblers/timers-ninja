class MdTimer {
    steps:MdSpan[] = []
 }

type MdSpan = {    
    start: number;
    end: number;
    step: TimeStep;

}

class TimeStep {
    constructor(private step?: number) {
    }    

    do(){
        return this.step || 1;
    }
}
    
const upOne = new TimeStep(1);
const timer = new MdTimer();
timer.steps.push({
    start:0,
    end:60,
    step: upOne
    
});


