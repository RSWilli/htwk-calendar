import { Calendar } from "./calendar";
import { DAY } from "./days";

export class Matter {

    private day:DAY

    private name:string

    private prof:string

    private room:string

    private note:string

    private color:number

    private id:string

    private start: string;
    private end: string;

    constructor(day:DAY, room:string, start:string, end:string, note:string, name:string, prof:string, systemName:string) {

        this.id = systemName + day + start + end

        this.room = room

        this.start = start
        this.end = end

        this.prof = prof

        this.note = note

        this.day = day

        this.name = name
    }

    public getDay(): DAY {
        return this.day
    }

    /**
     * getStartTime
     */
    public getStartTime() : string {
        return this.start
    }

    /**
     * getEndTime
     */
    public getEndTime() : string{
        return this.end
    }

    /**
     * getName
     */
    public getName() : string{
        return this.name
    }

    /**
     * setColors
     */
    public setColor(color:number) {
        this.color = color
    }

    /**
     * getColor
     */
    public getColor() : number{
        return this.color
    }

    /**
     * getId
     */
    public getId() : string{
        return this.id
    }
}