import { Matter } from "./matter";
import { DAY, WEEK } from "./days"
import { DateFactory } from "./dateFactory";
import { Schedule } from "./schedule";

export class Calendar {

    /**
     * 2D - Map: Name -> [Matter] for Color generation
     */
    private mapNameToMatters:Map<string, Array<Matter>> = new Map()

    /**
     * 3D - Map: Day.getTime() -> [Matter] for Iteration
     */
    private mapDateToMatters:Map<number, Array<Matter>> = new Map()
    private dateFactory: DateFactory;

    constructor(htwkDoc:Document) {
        let currentDay:DAY
        this.dateFactory = new DateFactory()
        htwkDoc.body.querySelectorAll(".spreadsheet").forEach((node, index) => {
            this.parseTable(node as HTMLTableElement, WEEK[index])
        })
        console.log(this)
    }

    private parseTable(table:HTMLTableElement, day:DAY) {

        const rows = [...table.querySelectorAll("tr")]
        rows.shift() // first rows is table Headers

        rows.forEach(row => {
            const columns = [...row.querySelectorAll("td")]

            const weeks = columns[0].textContent
            const startTime = columns[1].textContent
            const endTime = columns[2].textContent
            const name = columns[3].textContent
            const type = columns[4].textContent
            const prof = columns[5].textContent
            const room = columns[6].textContent
            const note = columns[7].textContent
            const dayCreated = columns[8].textContent

            const schedules:Array<Schedule> = this.parseTimes(weeks, day,  startTime, endTime)



            const matter = new Matter(schedules,name,type,prof,room,note)
            /**
             * Group Matters by Name for Color Matching and Color Generation
             */
            const matterName = columns[3].textContent!!
            if(this.mapNameToMatters.has(matterName)){
                const matterList = this.mapNameToMatters.get(matterName)
                matterList!!.push(matter)
            }else{
                this.mapNameToMatters.set(matterName, [matter])
            }

            /**
             * Group Matters by Date for Iteration
             */
            matter.getSchedules().forEach(schedule => {
                const key = schedule.day.getTime()
                if(this.mapDateToMatters.has(key)){
                    const dayMatters = this.mapDateToMatters.get(key)

                    dayMatters.push(matter)
                }else{
                    this.mapDateToMatters.set(key, [matter])
                }
            })
             
        })

    }
    private parseTimes(weekString:string, day:DAY, startTime:string, endTime:string) : Array<Schedule> {
        const schedules:Array<Schedule> = []

        /**
         * week parsing
         */
        const weekSequences = weekString.split(", ")
        const weekList:Array<string> = []

        weekSequences.forEach(weekSequence =>{
            const interval = weekSequence.split("-")

            if(interval.length == 1){
                // single week, like 42
                weekList.push(interval[0])
            }else{
                // week sequence, like 50-54
                const start = parseInt(interval[0])
                const end = parseInt(interval[1])

                for(let i = start; i <= end; i++){
                    weekList.push(i.toString())
                }
            }
        })

        /**
         * time parsing
         */
        const startTimeStringArray = startTime.split(":")
        const endTimeStringArray = endTime.split(":")

        const startTimeArray = startTimeStringArray.map(timeString => parseInt(timeString))
        const endTimeArray = endTimeStringArray.map(timeString => parseInt(timeString))



        weekList.forEach(week => schedules.push(this.dateFactory.getDate(week, day, startTimeArray[0],startTimeArray[1], endTimeArray[0], endTimeArray[1])))

        return schedules
    }
}