import createHeader from "./build-header";
import { seminargruppeSelect, studiengangSelect, weekSelect, yearsSelect } from "./selects";
import Parser from "./parser";
import { Calendar } from "./calendar/calendar";

async function main() {
    createHeader()

    document.getElementById("go")!!.addEventListener("click", async function(){
        const year = yearsSelect.value,
              week = weekSelect.value,
              semgrp = seminargruppeSelect.value

        if (year && week && semgrp){
            const request = new Request(`/plan/${year}/${semgrp}/${week}`)
    
            const response = await fetch(request)
            const planMarkup = await response.text()
    
            const planDoc = Parser.textToDom(planMarkup, "text/html")

            
            const body = planDoc.documentElement.querySelector("body")!!

            //output Markup for Debug purpose
            //document.querySelector("footer")!!.innerHTML = `<pre>${planMarkup.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`


            console.log(body)

            const calendar = new Calendar(planDoc)

            const calendarWeeks = calendar.getMarkup()

            const matters = calendar.getMatters()

            if (calendarWeeks[0]) {
                calendarWeeks[0].classList.add("current")
            }
            if (calendarWeeks[1]) {
                calendarWeeks[1].classList.add("next")
            }

            const weekRange = document.getElementById("weekRange")

            calendarWeeks.forEach(week => {
                document.body.appendChild(week)
                const weekStart = week.getAttribute("data-start-date")
                const weekEnd = week.getAttribute("data-end-date")
                const weeknumber = week.getAttribute("data-week-number")
                const id = week.id
                const option = document.createElement("option")
                option.setAttribute("value", id)
                option.innerHTML = weeknumber + ": " + weekStart + " - " + weekEnd

                weekRange.appendChild(option)
            })

            document.querySelector(".settings").classList.remove("hidden")

            const matterList = document.querySelector(".mattersList")

            matters.forEach((matters, name) => {
                const li = document.createElement("li")
                const label = document.createElement("label")
                const checkbox = document.createElement("input")

                checkbox.setAttribute("type", "checkbox")
                checkbox.setAttribute("checked", "checked")
                
                
                checkbox.addEventListener("change", () => {
                    console.log("changed")
                    matters.forEach(matter => {
                        const name = matter.getId()
                        
                        const matterEls = document.querySelectorAll(`.event[data-id="${name}"]`)
                        
                        matterEls.forEach(matterEl => {
                            matterEl.classList.toggle("hidden")
                        })
                    })
                })
                
                label.appendChild(checkbox)
                label.appendChild(document.createTextNode(name))
                li.appendChild(label)
                matterList.appendChild(li)
            })

        }

    })

    /**
     * Event Listener for the Carousel
     */
    document.getElementById("prev").addEventListener("click", () => {
        const prev = document.querySelector(".calendar.prev")
        const current = document.querySelector(".calendar.current")
        const next = document.querySelector(".calendar.next")

        if(!prev){
            return
        }

        const newPrev = prev.previousElementSibling

        if(newPrev && newPrev.matches(".calendar")){
            newPrev.classList.add("prev")
        }
        prev.classList.remove("prev")
        prev.classList.add("current")

        current.classList.remove("current")
        current.classList.add("next")

        if(next){
            next.classList.remove("next")
        }

        const weekRange = document.getElementById("weekRange") as HTMLSelectElement

        weekRange.value = prev.id

    })

    /**
     * Event Listener for the Carousel
     */
    document.getElementById("next").addEventListener("click", () => {
        const prev = document.querySelector(".calendar.prev")
        const current = document.querySelector(".calendar.current")
        const next = document.querySelector(".calendar.next")

        if(!next){
            return
        }

        const newNext = next.nextElementSibling

        if(newNext && newNext.matches(".calendar")){
            newNext.classList.add("next")
        }
        next.classList.remove("next")
        next.classList.add("current")

        current.classList.remove("current")
        current.classList.add("prev")

        if(prev){
            prev.classList.remove("prev")
        }

        const weekRange = document.getElementById("weekRange") as HTMLSelectElement

        weekRange.value = next.id

    })

    document.getElementById("weekRange").addEventListener("change", () => {
        const weekRange = document.getElementById("weekRange") as HTMLSelectElement
        const prev = document.querySelector(".calendar.prev")
        const current = document.querySelector(".calendar.current")
        const next = document.querySelector(".calendar.next")

        const newCurrent = document.querySelector(`[id="${weekRange.value}"]`)
        const newPrev = newCurrent.previousElementSibling
        const newNext = newCurrent.nextElementSibling

        if(prev){
            prev.classList.remove("prev")
        }

        if(next){
            next.classList.remove("next")
        }

        current.classList.remove("current")

        newCurrent.classList.add("current")

        if(newPrev && newPrev.matches(".calendar")){
            newPrev.classList.add("prev")
        }

        if(newNext && newNext.matches(".calendar")){
            newNext.classList.add("next")
        }
    })

}

main()
