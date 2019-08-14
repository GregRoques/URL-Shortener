const express = require("express");
const router = express.Router();
const db = require("../util/database");

router.get("/redirect", (req, res, next) => {
    const hashSearch = req.body.data.hash;
    console.log(hashSearch);
    const selectUrl = `Select url from urls where hash = '${hashSearch}'`;
    db.query(selectUrl).then(results => {
        console.log(results);
        res.json(results);
    }).catch(err => {
        console.log(err);
        if (err) {
            throw err;
        }
    });
});

module.exports = router;
