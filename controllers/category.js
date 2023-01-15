const categoryModel = require('../models/category')

async function createCategory(req, res) {
    const { name } = req.body
    const category = await categoryModel.findOne({ name })
    if (category) {
        return res.status(409).json({
            msg: 'This is category already exist'
        })
    }
    const newCategory = await categoryModel.create({ name })
    res.status(201).json({
        msg: 'Category created successfully!',
        newCategory
    })
}

async function getAllCategory(req, res) {
    const categories = await categoryModel.find({})
    if (categories.length === 0) {
        return res.json({
            msg: 'category is empty'
        })
    }
    res.json({
        msg: 'List of categories',
        categories
    })
}



module.exports = {
    createCategory,
    getAllCategory
}