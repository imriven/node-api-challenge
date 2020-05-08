const express = require("express");
const router = express.Router();
const db = require("./projectModel");
const actionsdb = require("../actions/actionModel")



//router.post()

router.get("/", (req, res) => {
    db.get()
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

router.get("/:id", (req, res) => {
    db.get(req.params.id)
    .then(result => {
        if (result.length === 0){
            res.status(404).json({message: "project not in database"})
        } else {
          res.status(200).json(result)  
        } 
    })
    .catch(err => res.status(500).json({message: "error connecting to database"}))
})

// router.put()

// router.delete()

module.exports = router