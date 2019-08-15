const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.get("/:hash", (req, res) => {
    const hashSearch = req.params.hash;
    const selectUrl = `SELECT url FROM urls WHERE hash='${hashSearch}'`;
    db.execute(selectUrl).then(results => {
        res.json(results[0][0].url);
    }).catch(err => {
        console.log(err);
        if (err) {
            throw err;
        }
    });
});

module.exports = router;
