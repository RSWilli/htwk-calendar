
export class Matter {
    private weeks : Array<Number> = []
    private day:string

    private startHour : Number
    private startMinute : Number

    private endHour : Number
    private endMinute : Number

    private kind:string

    private name:string

    private prof:string

    private room:string

    private note:string

    constructor(day:string, weeks:string, start:string, end:string, name:string, kind:string, prof:string, room:string, note:string) {
        this.day = day

        const startTime = start.split(":")
        const endTime = end.split(":")

        this.startHour = parseInt(startTime[0])
        this.startHour = parseInt(startTime[1])
        this.endHour = parseInt(endTime[0])
        this.endMinute = parseInt(endTime[1])

        this.room = room

        this.prof = prof

        this.note = note

        this.kind = kind

        this.name = name

        const weekSequences = weeks.split(", ")

        weekSequences.forEach(weekSequence =>{
            const interval = weekSequence.split("-")

            if(interval.length == 1){
                this.weeks.push(parseInt(interval[0]))
            }else{
                const start = parseInt(interval[0])
                const end = parseInt(interval[1])

                for(let i = start; i <= end; i++){
                    this.weeks.push(i)
                }
            }
        })
    }
}