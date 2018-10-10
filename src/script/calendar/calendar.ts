import { Matter } from "./matter";
import { DAY, WEEK, convertToEnumDay } from "./days"
import { DateFactory } from "./dateFactory";
import { CalendarBuilder } from "./calendar-builder";
import { Week } from "./week";

export class Calendar {

    /**
     * 2D - Map: Name -> [Matter] for Color generation
     */
    private mapNameToMatters:Map<string, Array<Matter>> = new Map()

    /**
     * 3D - Map: Week -> Week()
     */
    private mapWeeks:Map<string, Week> = new Map()

    private dateFactory: DateFactory;

    constructor(htwkDoc:Document) {
        let currentWeek:string
        this.dateFactory = new DateFactory()

        /**
         * map the weekString to the week
         * e.g.: "1, 2-5, 7" -> Week()
         */
        const tmpWeekStringToWeek : Map<string, Week> = new Map()

        const weekIt = this.dateFactory.getWeekIterator()

        htwkDoc.body.querySelectorAll("p, table.spreadsheet").forEach((node, index) => {
            let currentWeekStartDate = weekIt.next().value
            if(index%2 == 0){ // even is p tag
                currentWeek = node.textContent
                return;
            }

            // odd is table
            const week = this.parseTable(node as HTMLTableElement, currentWeekStartDate)

            tmpWeekStringToWeek.set(currentWeek, week)
        })

        /**
         * parse the weekstrings and map each 
         */
        tmpWeekStringToWeek.forEach((week, weekString) => {
            const weekNumbers = DateFactory.parseWeekString(weekString)

            weekNumbers.forEach(number => this.mapWeeks.set(number, week))
        })

        console.log(this)

        const neededColors = this.mapNameToMatters.size

        //300, because 360 would mean two reds
        const colorDiff = Math.round(300/neededColors)

        let currentColor = 0
        this.mapNameToMatters.forEach(matterArray => {
            matterArray.forEach(matter => matter.setColor(currentColor))

            currentColor += colorDiff
        })
    }

    private parseTable(table:HTMLTableElement, startDate : Date) : Week {

        const rows = table.querySelectorAll("tr:not(.columnTitles)") as NodeListOf<HTMLTableRowElement>

        const week = new Week(startDate)

        rows.forEach(row => {
            const columns = row.querySelectorAll("td")

            const matter = Calendar.parseColumns(columns)
            /**
             * Group Matters by Name for Color Matching and Color Generation
             */
            const matterName = matter.getName()
            if(this.mapNameToMatters.has(matterName)){
                const matterList = this.mapNameToMatters.get(matterName)
                matterList!!.push(matter)
            }else{
                this.mapNameToMatters.set(matterName, [matter])
            }
        })

        return week

    }

    /**
     * Function to parse a table row to a Matter
     * @param columns - td elements with the Matter Data odered as: day, room, start, end, systemname, note, name, prof
     */
    private static parseColumns(columns: NodeListOf<HTMLTableDataCellElement>): Matter {
        const day = convertToEnumDay(columns[0].textContent)
        const room = columns[1].textContent
        const startTime = columns[2].textContent
        const endTime = columns[3].textContent
        const systemName = columns[4].textContent   // not in use
        const note = columns[5].textContent
        const name = columns[6].textContent
        const prof = columns[7].textContent

        return new Matter(day, room, startTime, endTime, note, name, prof, systemName)
    }
    /**
     * getMarkup return the complete HTML Markup for the parsed calendar
     */
    public getMarkup() : Array<HTMLElement>{
        const weekMap = this.dateFactory.getAllWeeks()

        const calendarArray:Array<HTMLElement> = []

        weekMap.forEach((startDate, weekNumber) => {
            let currentDate = new Date(startDate.getTime())
            const calendarWeek = new CalendarBuilder(currentDate, weekNumber)
            WEEK.forEach(weekDay => {

                const eventList = this.mapDateToMatters.get(currentDate.getTime()) || []
                
                eventList.forEach(matter => {
                    calendarWeek.addEvent(weekDay, matter)
                })

                // next Day
                currentDate.setDate(currentDate.getDate() + 1)
            })

            calendarArray.push(calendarWeek.build())
        })

        return calendarArray
    }

    /**
     * getMatters
     */
    public getMatters() {
        return this.mapNameToMatters
    }
}