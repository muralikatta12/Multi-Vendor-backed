const path = require('path');
const mongoose = require('mongoose');
const multer = require('multer');
const Product = require('../models/Product');
const Firm = require('../models/Firm');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
    try {
        const { productName, price, category, bestseller, description } = req.body;
        const firmId = req.params.firmId;

        // Convert category to an array if it's not already
        const categoryArray = category ? (Array.isArray(category) ? category : [category]) : [];

        // Convert bestseller to Boolean
        const bestsellerBoolean = bestseller === 'true' || bestseller === true;

        // Validate firm existence
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "Firm not found" });
        }

        const image = req.file ? req.file.filename : "";

        // Create and save product
        const product = new Product({
            productName,
            price,
            category: categoryArray,
            bestseller: bestsellerBoolean,
            description,
            image,
            firm: firm._id
        });

        const savedProduct = await product.save();
        firm.products.push(savedProduct._id);
        await firm.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        console.error("Error in addProduct:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getproductByFirm = async (req, res) => {
    try {
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);
        if (!firm) {
            return res.status(404).json({ error: "No firm found" });
        }

        const products = await Product.find({ firm: firmId });
        res.status(200).json({ firmName: firm.firmName, products });
    } catch (error) {
        console.error("Error in getproductByFirm:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const deleteProductById = async (req, res) => {
    try {
        const productId = req.params.productId;
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ error: "No product found" });
        }
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error("Error in deleteProduct:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { addProduct: [upload.single('image'), addProduct], getproductByFirm, deleteProductById };
