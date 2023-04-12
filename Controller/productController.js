
const productService = require("../Service/productService");




const createProduct = async (req, res) => {
    try {
        /*
       1. Validate mandatory fields.
       2. Is image available
       3. Save data
       */
        const { product_name, decription, price, rating } = req.body;
        const image = req.file.filename;
        // All are mandatory fields.
        if (!product_name || !decription || !image || !price)

            return res.status(400).send({ status: false, message: "product name,decription,image,price is required" })
        let data = await productService.create({ product_name, decription, image, price, rating })
        //   Image Url
        data.data.image = process.env.BASE_URL + "ProductImage/" + image;

        if (!data.status) return res.status(data.code).send({ status: false, data: null, message: data.message })
        else return res.status(data.code).send({ status: true, data: data.data, message: "successfully product created" })
    } catch (error) {
        return res.status(500).send({ status: false, message: "error" })
    }
}

const getAllProduct = async (req, res) => {
    try {
        /*
       1. Get all products.
       2. Apply filters
  
       */
        let data = await productService.getallproduct(req.query);
        if (!data) return res.status(data.code).send({ status: false, data: null, message: data.message })
        else return res.status(data.code).send({ status: true, data: data.data, message: "successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: "error" })
    }
}
const getProductById = async (req, res) => {
    try {
        /*
        1. product id is required

       */
        let id = req.body.id;
        if (!id) return res.status(400).send({ status: false, message: "product id is required" })
        let data = await productService.getByIdproduct(id);
        if (!data.status) return res.status(data.code).send({ status: false, data: null, message: data.message })
        else return res.status(data.code).send({ status: true, data: data.data, message: "successfully" })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const removeProduct = async (req, res) => {
    try {
        /*
        1. product id is required

       */
        const { id } = req.body;
        if (!id) {
            return res.status(400).send({ status: false, message: "Product ID is required." });
        }
        const product = await productService.removeproduct(id);

        if (!product) {
            return res.status(404).send({ status: false, message: "Product not found." });
        }
        await product.data.destroy();
        return res.status(200).send({ status: true, message: "Product deleted successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: false, message: "product not found " });
    }
};
const updateProduct = async (req, res) => {
    try {
        /*
        1. Id mandatory field.
        */

        const { id, product_name, decription, rating, price } = req.body;
        const updatedProduct = {
            product_name,
            decription,
            rating,
            price
        };
        if (!id) {
            return res.status(400).json({ status: false, message: "Product id is required" });
        }
        let data = await productService.updateproduct(id);
        if (!data) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }
        await data.data.update(updatedProduct);
        return res.status(200).json({ status: true, message: "Product updated successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
};
module.exports = {
    createProduct,
    getAllProduct,
    getProductById,
    removeProduct,
    updateProduct,

}
