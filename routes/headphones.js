const express = require("express");
const Headphones = require("../models/headphones");
const passport = require("passport");

const router = express.Router();

module.exports = function () {

    router.get("/:id", (req, res) => {

        Headphones.findById(req.params.id, (error, result) => {
            if (error) {
                res.statusCode(500).json(error);
            }
            else {
                res.json(result)
            };
        })
    })

    router.get("/", (req, res) => {

        Headphones.find({}, (error, result) => {
            if (error) {
                res.statusCode(500).json(error);
            }
            else {
                res.json(result)
            };
        });
    });

    router.post("/", (req, res) => {

        if (!req.files.picture) {
            return res.status(400).send("No files were uploaded");
        }

        let image = req.files.picture;
        // let date = new Date();
        let imageName = req.body.name + ".png";

        image.mv("./public/headphones/" + imageName, (error) => {
            if (error) return res.status(500).send(error);

            let newObj = new Headphones({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                picture: "http://localhost:3000/" + imageName
                //metode apabila memasukan data dari raw json
            })

            newObj.save((error) => {
                if (error) {
                    res.status(500).send(error);
                }
                else {
                    res.json(newObj);
                }
            })
        });
    })

    router.delete("/:id", (req, res) => {

        Headphones.findByIdAndRemove(req.params.id, (error, result) => {
            if (error) {
                res.statusCode(500).json(error);
            }
            else {
                res.json({ message: "Data Deleted" });
            };
        })
    })

    router.put("/", (req, res) => {

        let newObj = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            picture: "http://localhost:3000/" + imageName
            //metode apabila memasukan data dari raw json
        }

        Headphones.findByIdAndUpdate(req.body._id, newObj, (error, result) => {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.status(500).json({ message: "Data Updated" });
            };
        })
    })
    
    return router;
};