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

            new Calendar(planDoc)

        }

    })
}

main()
