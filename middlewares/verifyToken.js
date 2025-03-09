const Vendor = require('../models/Vendor');
const jwt = require('jsonwebtoken');
const dotEnv = require('dotenv');

dotEnv.config()

const secretKey = process.env.SECRET_KEY;

const verifyToken = async (req, res, next) => {
    try {
        // Check if the Authorization header exists
        if (!req.headers.authorization) {
            return res.status(401).json({ error: "Authorization header is missing" });
        }

        // Split the token
        const loginToken = req.headers.authorization.split(' ')[1];

        if (!loginToken) {
            return res.status(401).json({ error: "Token is required" });
        }
        //verifying   the token
        const decoded = jwt.verify(loginToken, secretKey);
        const vendor = await Vendor.findById(decoded.vendorId);

        if (!vendor) {
            return res.status(404).json({ error: "Vendor not found" });
        }

        // Attach vendor ID to the request object
        req.vendorId = vendor._id;

        next();
    } catch (error) {

        
        return res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = verifyToken;
///exporting the verifyToken middleware
