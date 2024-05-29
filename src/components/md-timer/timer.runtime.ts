import type { MdTimerBlock, MdTimerStack} from "./timer.types";

export class MdTimerSpan {
    public start: Date;
    public stop: Date | undefined;
    public end: Date | undefined;
    
    constructor(public block: MdTimerBlock) {
        this.start = new Date();
    }

    IndexOf(stack: MdTimerStack) : number {
        return stack.blocks.indexOf(this.block);
    }
}

export class MdTimerRuntime {
    public state : string = "idle";
    public pointer : MdTimerSpan | null = null;   
    constructor(public script: MdTimerStack ) {    
    }
        
    start() : boolean {                        
        const position = this.pointer?.IndexOf(this.script) || -1;
        
        this.state = "running";        
        this.pointer = new MdTimerSpan(this.script.blocks[position + 1]);
        return true;
    }

    stop() : boolean {                        
        this.state = "stopped";
        if (this.pointer){
            this.pointer.stop = new Date();            
        }
        this.pointer
        return true;
    }

    reset() : boolean {                
        this.state = "idle";
        this.pointer = null;
        return true;
    }
}