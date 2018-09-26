import createHeader from "./build-header";
import { seminargruppeSelect, studiengangSelect, weekSelect, yearsSelect } from "./selects";
import Parser from "./parser";


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
    
            console.log(planMarkup)
    
            const planDoc = Parser.textToDom(planMarkup, "text/html")
            document.querySelector("main")!!.innerHTML = planDoc.querySelector("body")!!.innerHTML
        }

    })
}

main()
