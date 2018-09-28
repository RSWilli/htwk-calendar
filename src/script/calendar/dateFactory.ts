import { weekSelect, yearsSelect } from "../selects";
import { start } from "repl";
import { DAY } from "./days";
import { Schedule } from "./schedule";

/**
 * Class to generate Dates from Week Numbers and Days
 */
export class DateFactory {

    private mapWeekNumberToDate:Map<string, Date> = new Map()

    /**
     * Parse the Dates from the xml yearDoc
     */
    constructor(){
        const semester = yearsSelect.value

        const periodEl = window.yearDoc.querySelector(`period[id='${semester}']`)

        const weekElements = [...periodEl.querySelectorAll("woche[name*='Planungswoche']")]   // Exclude current and all weeks

        const period = periodEl.getAttribute("name")

        const match = period.match(/\d\d\.\d\d\.(\d\d\d\d)-\d\d\.\d\d\.(\d\d\d\d)/)

        const startYear = match[1]
        const endYear = match[2]

        weekElements.forEach(weekEl => {
            const weekNumber = weekEl.getAttribute("id")
            const nameAttr = weekEl.getAttribute("name")

            const dateRangeMatch = nameAttr.match(/:*Planungswoche (\d\d)\.(\d\d)\. - (\d\d)\.(\d\d)\.(\d\d\d\d)/)

            //guess the start Year and correct it later
            let startDate = new Date(startYear + "-" + dateRangeMatch[2] + "-" + dateRangeMatch[1])
            //end Date has a year
            const endDate = new Date(dateRangeMatch[5] + "-" + dateRangeMatch[4] + "-" + dateRangeMatch[3])

            //if the difference is more than 7 days change the year
                                                        // s    m    h    d    w
            if(endDate.getTime() - startDate.getTime() > 1000 * 60 * 60 * 24 * 7 ){
                startDate = new Date(endYear + "-" + dateRangeMatch[2] + "-" + dateRangeMatch[1])
            }

            this.mapWeekNumberToDate.set(weekNumber, startDate)
        })
    }

    public getDate(week:string, day:DAY, startHour:number, startMinute:number, endHour:number, endMinute:number) : Schedule {
        let offset:number
        switch (day) {
            case DAY.MONDAY: offset = 0 ;break;
            case DAY.TUESDAY: offset = 1 ;break;
            case DAY.WEDNESDAY: offset = 3 ;break;
            case DAY.THURSDAY: offset = 4 ;break;
            case DAY.FRIDAY: offset = 5 ;break;
            case DAY.SATURDAY: offset = 6 ;break;
            case DAY.SUNDAY: offset = 7 ;break;
        }
        const weekstart = this.mapWeekNumberToDate.get(week)

        const dayDate = new Date(weekstart.getTime())
        dayDate.setDate(weekstart.getDate() + offset)

        const startDate = new Date(dayDate.getTime())
        startDate.setHours(startHour)
        startDate.setMinutes(startMinute)

        const endDate = new Date(dayDate.getTime())
        endDate.setHours(endHour)
        endDate.setMinutes(endMinute)

        return {
            day: dayDate,
            start: startDate,
            end: endDate
        }
    }
}