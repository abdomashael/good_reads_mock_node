const express = require('express');
const router = express.Router();
const categoryModel = require("../models/categoryModel");
const multer = require('multer');
const fs = require("fs");

const checkIsAdmin = require("../middlewares/admin_check");


const checkJWT = require("../middlewares/jwt_auth")

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/category_imgs/')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});
const upload = multer({storage: storage});


router.get("/", async (req, res) => {
    try {
        // Here we need to check the JWT token before getting all categories
        allCategories = await categoryModel.find({});
        //202 means accepted
        res.status(202).json(allCategories);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

router.get("/:id", async (req, res) => {
    try {
        // Here we need to check the JWT token before getting a category
        const category = await categoryModel.findById(req.params.id);
        //202 means accepted
        res.status(202).json(category);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

router.use(checkJWT)

router.use(checkIsAdmin)

router.post("/", upload.single('categoryImage'), async (req, res) => {
        try {
            // Here we need to check the JWT token before creating a new category
            const newCategory = new categoryModel({
                    categoryName: req.body.categoryName,
                    categoryImage: req.file.path,
                    summary: req.body.summary
                }
            );
            const category = await newCategory.save();
            res.json(category);
        } catch (error) {
            console.log(error);
            res.sendStatus(409);
        }
    }
)
;

// //Search by name just in case because every name is unique
// router.get('/:name', async (req, res) => {
//     console.log(req.params.name);
//     const searchCategory = req.params.name;
//     try {
//         const result = await categoryModel.find({name: { $regex: searchCategory, $options: 'i'}}).exec();
//         console.log(result);
//         res.json(result);
//     } catch (error) {
//         console.log(error);
//         res.json(error);
//     }
// });

router.patch("/:id", async (req, res) => {
    try {
        // Here we need to check the JWT token before updating a category
        let categoryData = {
            categoryName: req.body.categoryName,
            summary: req.body.summary
        };
        if (req.file) {
            let category = await categoryModel.findById(req.params.id).exec()
            fs.unlinkSync(category.categoryImage);
            categoryData["categoryImage"] = req.file.path
        }

        const editedCategory = await categoryModel.updateOne({_id: req.params.id}, categoryData);
        //202 means accepted
        res.status(202).json(editedCategory.nModified);
    } catch (error) {
        console.log(error);
        res.sendStatus(409);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        // Here we need to check the JWT token before deleting a category
        const deleteCategory = await categoryModel.deleteOne({_id: req.params.id});
        //202 means accepted
        res.status(202).json(deleteCategory.nModified);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});

module.exports = router;



