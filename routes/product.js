const express = require('express');
const router = express.Router();

const { createProduct, getAllProduct, getProductById, removeProduct, updateProduct } = require("../Controller/productController");
const { upload } = require("../Helper/multer")

router.use((req, res, next) => {
    console.log("PRODUCT ROUTE: " + req.originalUrl + "::" + new Date().toISOString());
    next();
});
// All api routes
router.post("/create-product", upload.single("image"), createProduct);
router.get("/get-all-product", getAllProduct);
router.post("/get-product-byId", getProductById);
router.delete("/remove-product", removeProduct);
router.patch("/update-product", updateProduct);
module.exports = router;