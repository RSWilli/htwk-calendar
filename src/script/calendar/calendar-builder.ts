import { DAY, WEEK } from "./days";
import { Matter } from "./matter";

/**
 * Builds the Markup for ONE week
 */
export class CalendarBuilder {

    private rootElement:Element
    private weekDays:Map<DAY, Element>

    constructor() {
        this.initMarkup()
    }

    private initMarkup() {
        this.rootElement = CalendarBuilder.createElement("div", ["calendar"])
        const dayNameBox = CalendarBuilder.createElement("div", ["dayNameBox"])
        this.rootElement.appendChild(dayNameBox)
        
        const dayNameContainer = CalendarBuilder.createElement("div", ["dayNameContainer"])

        dayNameBox.appendChild(dayNameContainer)
        dayNameBox.appendChild(CalendarBuilder.createElement("div", ["scrollBarSpace"]))
        
        WEEK.forEach(day => {
            dayNameContainer.appendChild(CalendarBuilder.createElement("div", ["dayName"], day))
        })

        const weekWrapper = CalendarBuilder.createElement("div", ["weekWrapper"])
        this.rootElement.appendChild(weekWrapper)

        const times = CalendarBuilder.createElement("div", ["time"])
        weekWrapper.appendChild(times)
        for (let hour = 0; hour < 24; hour++) {
            ["00", "15", "30", "45"].forEach(minute => {
                times.appendChild(CalendarBuilder.createElement("span",[], `${hour}:${minute}`))
            })
        }

        const week = CalendarBuilder.createElement("div", ["week"])
        weekWrapper.appendChild(week)

        /**
         * Save the Containers for the Events for later use
         */
        WEEK.forEach(day => {
            const dayEl = CalendarBuilder.createElement("div", ["day"])
            week.appendChild(dayEl)

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
        
    }
}