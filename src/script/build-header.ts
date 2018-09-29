import Parser from "./parser"
import { fakultaetSelect, seminargruppeSelect, studiengangSelect, weekSelect, yearsSelect } from "./selects";
import { DateFactory } from "./calendar/dateFactory";

declare global {
    interface Window {
        yearDoc: Document,
        seminargruppenDoc: Document
    }
}

function createOptionTag(text:string, value:string) : HTMLOptionElement{
    const el = document.createElement("option")

    el.setAttribute("value", value)

    el.innerHTML = text

    return el
}

function nodeListToOptionTags(nodelist:NodeListOf<Element>) : Array<HTMLOptionElement> {
    const returnArray : Array<HTMLOptionElement> = []

    nodelist.forEach(node => {
        const name = node.getAttribute("name")
        const id = node.getAttribute("id")

        returnArray.push(createOptionTag(name!!, id!!))
    })

    return returnArray
}

function fillSelectWithData(select:HTMLSelectElement, nodelist:NodeListOf<Element>) {
    const firstOption = select.querySelector("option")!!

    firstOption.remove()

    select.innerHTML = ""

    const optionTags = nodeListToOptionTags(nodelist)
    select.appendChild(firstOption)
    optionTags.forEach(option => select.appendChild(option))
}

async function fetchYear() {
    const request = new Request("/years")

    return await fetch(request)
}

async function fetchSeminargruppen(semester:string) {
    const request = new Request(`/groups/${semester}`)

    return await fetch(request)
}

function createYearSelect() {
    const semesters = window.yearDoc.querySelectorAll("semester")

    fillSelectWithData(yearsSelect, semesters)
}

function createFakultaetSelect(){
    const fakultaeten = window.seminargruppenDoc.querySelectorAll("fakultaet")

    fillSelectWithData(fakultaetSelect, fakultaeten)
}

function createFakultaetEventListener() {
    fakultaetSelect.addEventListener("change", function () {
        const value = fakultaetSelect.value
        const fakultaet = window.seminargruppenDoc.querySelector(`[id="${value}"]`)!!

        const studiengaenge = fakultaet.querySelectorAll("studiengang")

        fillSelectWithData(studiengangSelect, studiengaenge)
    })
}

function createStudiengangEventListener() {
    studiengangSelect.addEventListener("change", function () {
        const value = studiengangSelect.value
        const studiengang = window.seminargruppenDoc.querySelector(`[id="${value}"]`)!!

        const seminargruppen = studiengang.querySelectorAll("semgrp")

        fillSelectWithData(seminargruppeSelect, seminargruppen)
    })
}

function createYearEventListener(){
    yearsSelect.addEventListener("change", function() {

        const weekOptions = [...weekSelect.querySelectorAll("option")]
        weekOptions.shift()

        weekOptions.forEach(el => el.remove())

        const value = yearsSelect.value

        const period = window.yearDoc.querySelector(`period[id="${value}"]`)!!

        const weeks = period.querySelectorAll("woche")

        fillSelectWithData(weekSelect, weeks)
    })

    yearsSelect.addEventListener("change", async function() {
        const value = yearsSelect.value

        const response = await fetchSeminargruppen(value)
        const seminargruppenXml = await response.text()

        window.seminargruppenDoc = Parser.textToDom(seminargruppenXml)

        createFakultaetSelect()
    })
}

async function createHeader() {
    const response = await fetchYear()
    const yearXml = await response.text()

    window.yearDoc = Parser.textToDom(yearXml)
    
    createYearSelect()
    createYearEventListener()
    createFakultaetEventListener()
    createStudiengangEventListener()

}

export default createHeader