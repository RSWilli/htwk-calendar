
export enum DAY {
    MONDAY="Mo",
    TUESDAY="Di",
    WEDNESDAY="Mi",
    THURSDAY="Do",
    FRIDAY="Fr",
    SATURDAY="Sa",
    SUNDAY="So"
}

export const WEEK = [DAY.MONDAY, DAY.TUESDAY, DAY.WEDNESDAY, DAY.THURSDAY, DAY.FRIDAY, DAY.SATURDAY, DAY.SUNDAY]

export function convertToEnumDay(day:string) : DAY {
    switch (day) {
        case "Mo": return DAY.MONDAY
        case "Di": return DAY.TUESDAY
        case "Mi": return DAY.WEDNESDAY
        case "Do": return DAY.THURSDAY
        case "Fr": return DAY.FRIDAY
        case "Sa": return DAY.SATURDAY
        case "So": return DAY.SUNDAY
        default:
            console.error("Unknown Day", day)
            break;
    }
}