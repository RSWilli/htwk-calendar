import { Matter } from "./matter";

export enum DAY {
    MONDAY="Montag",
    TUESDAY="Dienstag",
    WEDNESDAY="Mittwoch",
    THURSDAY="Donnerstag",
    FRIDAY="Freitag",
    SATURDAY="Samstag",
    SUNDAY="Sonntag"
}

export class Calendar {

    private mapNameToMatters:Map<string, Array<Matter>> = new Map()

    constructor(htwkDoc:Document) {
        let currentDay:DAY
        const days = [DAY.MONDAY, DAY.TUESDAY, DAY.WEDNESDAY, DAY.THURSDAY, DAY.FRIDAY, DAY.SATURDAY, DAY.SUNDAY]
        htwkDoc.body.querySelectorAll(".spreadsheet").forEach((node, index) => {
            this.parseTable(node as HTMLTableElement, days[index])
        })
    }

    private parseTable(table:HTMLTableElement, day:DAY) {

        const rows = [...table.querySelectorAll("tr")]
        rows.shift() // first rows is table Headers

        rows.forEach(row => {
            const columns = [...row.querySelectorAll("td")]

            const matter = new Matter(
                day,
                columns[0].textContent!!, 
                columns[1].textContent!!, 
                columns[2].textContent!!, 
                columns[3].textContent!!,
                columns[4].textContent!!,
                columns[5].textContent!!,
                columns[6].textContent!!,
                columns[7].textContent!!
            )

            const matterName = columns[3].textContent!!
            if(this.mapNameToMatters.has(matterName)){
                const matterList = this.mapNameToMatters.get(matterName)
                matterList!!.push(matter)
            }else{
                this.mapNameToMatters.set(matterName, [matter])
            }

        })
    }
}