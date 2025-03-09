const express = require("express");
const Firm = require('../models/Firm');
const Vendor = require('../models/Vendor');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/");//Destination folder where the uploaded files will be stored
    },
    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now() + path.extname(file.originalname));//Generating unique filename
    }
});

const upload = multer({ storage: storage });

const addFirm = async (req, res) => {
    try {
        const { firmName, area, category, region, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

     
        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found.' });
        }

        const firm = new Firm({
            firmName, area, category, region, offer, image, vendor: vendor._id
        });

        const savedFirm =await firm.save();
        vendor.firm.push(savedFirm);
        await vendor.save();
        return res.status(201).json({ message: 'Firm added successfully', firm });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding firm', error: error.message });
    }
};

const deleteFirmById = async (req,res)=>{
    try{
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId);
        if(!deletedFirm){
            return res.status(404).json({error:"No firm found"});
        }
        res.status(200).json({message:"Firm deleted successfully"});
        
    }catch(error){
        console.error("Error in deleteFirmById:",error);
        res.status(500).json({error:"Internal server error"});
    }
}
module.exports = { addFirm: [upload.single('image'), addFirm], deleteFirmById};