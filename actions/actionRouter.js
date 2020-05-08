const express = require("express");
const router = express.Router();
const db = require("./actionModel");
const projectdb = require("../projects/projectModel")



router.post("/", validateActionCreate, validateProjectId, (req, res) => {
    db.insert(req.body)
    .then(result => res.status(201).send())
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})


router.get("/", (req, res) => {
    db.get()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

router.get("/:id", validateActionId, (req, res) => {
   res.status(200).json(req.action)
})

 router.put("/:id", validateActionId, (req, res) => {
    db.update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

 router.delete("/:id", validateActionId, (req, res) => {
    db.remove(req.params.id) 
    .then(result => result === 1 ? res.status(204).send() : res.status(500).json({message: "cannot delete action"}))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})


function validateActionId(req, res, next) {
    db.get(req.params.id)
    .then(result => {
        if (result.length === 0){
            res.status(404).json({message: "action not in database"})
        } else {
            req.action = result
            next()
        } 
    })
    .catch(err => res.status(500).json({message: "error connecting to database"}))
}


function validateActionCreate(req, res, next) {
if (!req.body.project_id) {
    res.status(400).json({message: "must supply project id"})
} else {
    next()
}
}

function validateProjectId(req, res, next) {
    projectdb.get(req.body.project_id)
    .then(result => {
        if (result.length === 0){
            res.status(404).json({message: "project not in database"})
        } else {
            req.project = result
            next()
        } 
    })
    .catch(err => res.status(500).json({message: "error connecting to database"}))
}

module.exports = router