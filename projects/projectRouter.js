const express = require("express");
const router = express.Router();
const db = require("./projectModel");
const actionsdb = require("../actions/actionModel")



router.post("/", (req, res) => {
    db.insert(req.body)
    .then(result => res.status(201).send())
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

router.post("/:id/actions", validateProjectId, (req, res) => {
    const action = req.body
    action.project_id = req.params.id
    actionsdb.insert(action)
    .then(result => res.status(201).send())
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

router.get("/", (req, res) => {
    db.get()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

router.get("/:id", validateProjectId, (req, res) => {
   res.status(200).json(req.project)
})

router.get("/:id/actions", validateProjectId, (req, res) => {
    db.getProjectActions(req.params.id)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
 })

 router.put("/:id", validateProjectId, (req, res) => {
    db.update(req.params.id, req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

 router.delete("/:id", validateProjectId, (req, res) => {
    db.remove(req.params.id) 
    .then(result => result === 1 ? res.status(204).send() : res.status(500).json({message: "cannot delete project"}))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})


function validateProjectId(req, res, next) {
    db.get(req.params.id)
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

