import { Calendar } from "./calendar";
import { Schedule } from "./schedule";

export class Matter {
    private schedules:Array<Schedule>

    private kind:string

    private name:string

    private prof:string

    private room:string

    private note:string

    constructor(schedules:Array<Schedule>, name:string, kind:string, prof:string, room:string, note:string) {

        this.schedules = schedules

        this.room = room

        this.prof = prof

        this.note = note

        this.kind = kind

        this.name = name
    }

    /**
     * getSchedules
     */
    public getSchedules() : Array<Schedule>{
        return this.schedules
    }

    /**
     * getStartTime
     */
    public getStartTime() : string {
        const time = this.schedules[0].start

        return `${time.getHours()}-${time.getMinutes()}`
    }

    /**
     * getEndTime
     */
    public getEndTime() : string{
        const time = this.schedules[0].end

        return `${time.getHours()}-${time.getMinutes()}`
    }

    /**
     * getName
     */
    public getName() : string{
        return this.name
    }
}