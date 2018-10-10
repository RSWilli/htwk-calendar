const URLS = {
    studienjahr: "https://stundenplan.htwk-leipzig.de/stundenplan/studienjahr.xml",
    seminargruppen: "https://stundenplan.htwk-leipzig.de/stundenplan/semgrp/semgrp_$SEMESTER$.xml",

    stundenplan: 'https://stundenplan.htwk-leipzig.de/$SEMESTER$/Berichte/Text-Listen;Studenten-Sets;name;$SEMINARGRUPPE$?template=UNBuchen&weeks=$WEEKS$&days=&periods=3-64&Width=0&Height=0'

}

module.exports = class UrlHelper {
    static studienJahr(){
        return URLS.studienjahr
    }
    static seminargruppen(semester){
        return URLS.seminargruppen.replace("$SEMESTER$", semester)
    }
    static stundenplan(semester, seminargruppe, week){
        let url = URLS.stundenplan.replace("$SEMESTER$", semester)
        url = url.replace("$SEMINARGRUPPE$", seminargruppe)
        return url.replace("$WEEKS$", week)
    }
}