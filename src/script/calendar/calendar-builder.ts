import { DAY, WEEK } from "./days";
import { Matter } from "./matter";

/**
 * Builds the Markup for ONE week
 */
export class CalendarBuilder {

    private rootElement:Element
    private weekDays:Map<DAY, Element> = new Map()

    constructor(startDate:Date, weekNumber:string) {
        this.rootElement = CalendarBuilder.createElement("div", ["calendar"])
        const dayNameBox = CalendarBuilder.createElement("div", ["dayNameBox"])
        this.rootElement.appendChild(dayNameBox)
        
        const dayNameContainer = CalendarBuilder.createElement("div", ["dayNameContainer"])

        dayNameBox.appendChild(dayNameContainer)
        dayNameBox.appendChild(CalendarBuilder.createElement("div", ["scrollBarSpace"]))
        
        const currentDate = new Date(startDate.getTime())
        WEEK.forEach(day => {
            const dateString = currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getFullYear()
            dayNameContainer.appendChild(CalendarBuilder.createElement("div", ["dayName"], `${day}<h3>${dateString}</h3>`))

            currentDate.setDate(currentDate.getDate() + 1)
        })

        const startDateString = startDate.getDate() + "." + startDate.getMonth() + "." + startDate.getFullYear()
        const endDateString = currentDate.getDate() + "." + currentDate.getMonth() + "." + currentDate.getFullYear()

        /**
         * set the Attributes on the Calendar
         */
        this.rootElement.id = startDate.getTime().toString()
        this.rootElement.setAttribute("data-start-date", startDateString)
        this.rootElement.setAttribute("data-end-date", endDateString)
        this.rootElement.setAttribute("data-week-number", weekNumber)


        const weekWrapper = CalendarBuilder.createElement("div", ["weekWrapper"])
        const scrollWrapper = CalendarBuilder.createElement("div", ["scrollWrapper"])
        this.rootElement.appendChild(scrollWrapper)
        scrollWrapper.appendChild(weekWrapper)

        const times = CalendarBuilder.createElement("div", ["time"])
        weekWrapper.appendChild(times)
        for (let hour = 0; hour < 24; hour++) {
            ["00", "15", "30", "45"].forEach(minute => {
                times.appendChild(CalendarBuilder.createElement("span",[], `${hour}:${minute}`))
            })
        }
        times.appendChild(CalendarBuilder.createElement("span",[], "0:00"))

        const week = CalendarBuilder.createElement("div", ["week"])
        weekWrapper.appendChild(week)

        /**
         * Save the Containers for the Events for later use
         */
        WEEK.forEach(day => {
            const dayEl = CalendarBuilder.createElement("div", ["day"])
            week.appendChild(dayEl)

            dayEl.appendChild(CalendarBuilder.createElement("div", ["event", "hidden", "begin-0-0", "end-0-0"]))

            this.weekDays.set(day, dayEl)
        })

    }


    private static createElement(tagName, classes:Array<string>=[], innerHTML:String="") : Element{
        const el = document.createElement(tagName)
        classes.forEach((clazz)=>{
            el.classList.add(clazz)
        })
        el.innerHTML = innerHTML
        return el
    }

    /**
     * addEvent
     */
    public addEvent(weekDay:DAY, event:Matter) {
        const start = event.getStartTime()
        const end = event.getEndTime()

        const eventEl = CalendarBuilder.createElement("div", ["event", `begin-${start}`, `end-${end}`], event.getName())

        eventEl.setAttribute("data-name", event.getName()) 

        this.weekDays.get(weekDay).appendChild(eventEl)
    }

    public build() : HTMLElement{
        return this.rootElement as HTMLElement
    }
}