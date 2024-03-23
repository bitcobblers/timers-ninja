import { Duration } from "luxon";

export type TimeSegment = {
    current?: number;
    next?: TimeSegment;
}

export type TimerInstance = {
    direction: string;
    timer: Duration
}

export class SegmentComposer {
    
    compose(item:TimeSegment): Duration{ 
        const result = this.c(item);
        while(result.length < 6) {
            result.push(0);
        }
        return Duration.fromObject({
            'years': result[5], 
            'months': result[4], 
            'days': result[3], 
            'hours': result[2], 
            'minutes': result[1], 
            'seconds': result[0]});
    }
    
    private c(item: TimeSegment): number[] {
        if (!item.next) {
            return [item.current||0];
        }
        const result = this.c(item.next);
        result.push(item.current || 0);
        return result;
    }
}



