const express = require("express");
const router = express.Router();
const cors = require('../helper/cors');
const { getGroups, save, deleteGroup, updateGroup} = require('../services/groupHandler');

router.get("/", cors, async function (req, res, next) {
  const { query } = req;
  const groups = await getGroups(query);
  res.status(200).json(groups);
});

router.post("/", cors, async function (req, res, next) {
    try {
        const groups = await save(req.body);
        res.status(200).json(groups);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.delete("/:id", cors, async function (req, res, next) {
    try {
        const groups = await deleteGroup(req.params.id);
        res.status(200).json(groups);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).send(error);
    }
});

router.put("/:id", cors, async function(req, res) {
    const {id} = req.params;
    const updatedGroup = await updateGroup(id, req.body);
    if (typeof updatedGroup === "string") {
        return res.status(404).json({message: updatedGroup});
    }
    res.status(200).json(updatedGroup);
})

module.exports = router;