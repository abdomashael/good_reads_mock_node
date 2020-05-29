const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authorModel = require("../models/authorModel");
const checkIsAdmin = require("../middlewares/admin_check");
const fs = require("fs")
const chalk = require("chalk")
const multer = require('multer');

const checkJWT = require("../middlewares/jwt_auth")


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/author_imgs/')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({storage: storage});


router.get("/", async (req, res) => {
    try {
        // Here we need to check the JWT token before getting all authors
        allAuthors = await authorModel.find({});
        //202 means accepted
        res.status(202).json(allAuthors);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Here we need to check the JWT token before getting a author
        const author = await authorModel.findById(req.params.id);
        //202 means accepted
        res.status(202).json(author);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

router.use(checkJWT)

router.use(checkIsAdmin)

router.post("/", upload.single('authorImage'), async (req, res) => {

    try {
        
        // Here we need to check the JWT token before creating a new author
        const newAuthor = new authorModel({
            _id: new mongoose.Types.ObjectId(),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fullName: req.body.firstName + " " + req.body.lastName,
            authorImage: req.file.path,
            DateofBirth: req.body.DateofBirth,
            bio: req.body.bio
        });
        const author = await newAuthor.save();
        res.status(201).json(author);
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        console.log(chalk.blue(JSON.stringify(req.body)));
        // Here we need to check the JWT token before updating a author
        let authorData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            fullName: req.body.firstName + " " + req.body.lastName,
            DateofBirth: req.body.DateofBirth,
            bio: req.body.bio};

        if(req.file){
            let author = await authorModel.findById(req.params.id).exec()
            fs.unlinkSync(author.authorImage);
            authorData["authorImage"]=req.file.path
        }
        
        const editedAuthor = await authorModel.findByIdAndUpdate(req.params.id, authorData).exec();
        //202 means accepted
        res.status(202).json(editedAuthor.nModified);
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // Here we need to check the JWT token before deleting a author
        const deleteAuthor = await authorModel.deleteOne({_id: req.params.id});
        //202 means accepted
        res.status(202).json(deleteAuthor.nModified);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

module.exports = router;
