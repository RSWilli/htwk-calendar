import { Matter } from "./matter";
import { DAY, WEEK } from "./days";

/**
 * Class for the representation of one week in a Semester
 */
export class Week {
    /**
     * map Weekdays to Matters on that date
     */
    private week : Map<DAY, Matter[]> = new Map()

    /**
     * map Weekdays to their Dates
     */
    private mapWeekDayToDate : Map<DAY, Date> = new Map()

    constructor(startDate : Date) {
        let currentDate = new Date(startDate.getTime())

        /**
         * init the maps
         */
        WEEK.forEach((day, index) => {
            this.week.set(day, [])
            this.mapWeekDayToDate.set(day, currentDate)

            currentDate.setDate(currentDate.getDate() + 1)
        })
    }

    /**
     * Function to add a Matter to this week
     * it resolves the Weekday from the Matter
     * @param matter - Matter to add
     */
    public addMatter(matter:Matter){
        const day = matter.getDay()

        const matterListForDay = this.week.get(day)

        matterListForDay.push(matter)
    }
}