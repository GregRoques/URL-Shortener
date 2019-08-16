const express = require("express");
const router = express.Router();
const db = require("../util/database");
const randomString = require("randomstring");

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

router.post("/newurl", (req, res, next) => {
    const originalUrl = req.query.originalurl;
    const urlSearch = `SELECT hash, url FROM urls WHERE url='${originalUrl}'`;
    db.execute(urlSearch).then(results => {
        if (!results[0][0]) {
            next();
        } else {
            res.json(results[0][0]);
        }
    }).catch(err => {
        if (err) {
            throw err;
        }
    });
});

router.post("/newurl", (req, res) => {
    const originalUrl = req.query.originalurl;
    const newHash = randomString.generate(12);
    const insertQuery = `INSERT INTO urls (url, hash) VALUES ('${originalUrl}', '${newHash}')`;
    db.execute(insertQuery).then(() => {
        const urlSearch = `SELECT hash, url FROM urls WHERE url='${originalUrl}'`;
        db.execute(urlSearch).then(results => {
            res.json(results[0][0]);
        }).catch(err => {
            if (err) {
                throw err;
            }
        });
    }).catch(err2 => {
        if (err2) {
            throw err2;
        }
    });
});

module.exports = router;
