const URLS = {
    options: "https://www.htwk-leipzig.de/studieren/im-studium/online-services/lehrveranstaltungsplan/seminargruppenplan/",
    calendar: ""
}

export async function fetchOptions(){
    const request = new Request(URLS.options)
    return fetch(request)
}

export async function fetchCalendar() {
    
}