import moment from "moment";

export type TimeSegment = {
    current?: number;
    next?: TimeSegment;
}

export class SegmentComposer {
    
    compose(item:TimeSegment): any{ 
        const result = this.c(item);
        while(result.length < 6) {
            result.push(0);
        }
        return moment(0,)
            .add(result[5], 'years')
            .add(result[4], 'months')
            .add(result[3], 'days')
            .add(result[2], 'hours')
            .add(result[1], 'minutes')
            .add(result[0], 'seconds')
            .utc();
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



