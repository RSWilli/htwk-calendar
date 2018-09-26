const express = require("express")
require("./gulpfile")
const gulp = require("gulp")

const proxy = require("./proxy")

const urlHelpers = require("./urlHelper")

const app = express()

app.get("/years", proxy(urlHelpers.studienJahr(), "application/xml"))

app.get("/groups/:semester", (req, res, next) => {
    proxy(urlHelpers.seminargruppen(req.params.semester), "application/xml")(req, res, next)
})
app.get("/plan/:semester/:group/:week", (req, res, next) => {
    proxy(urlHelpers.stundenplan(req.params.semester, req.params.group, req.params.week), "text")(req, res, next)
})

app.use(function(err, req, res, next) {
    res.status(500).send(err.message);
});

app.get("/", (req, res)=>{
    res.sendFile(`${process.cwd()}/index.html`)
})

app.use("/", express.static("dist"))

app.use("/", (req, res, next) => {
    const e = new Error("Not Found")

    e.code = 404
    
    next(e)
})

app.use(function(err, req, res, next) {
    res.status(err.code || 500).send(err.message);
});
  

app.listen(3000, function () {
    console.log("app started")
    gulp.start("default")
})