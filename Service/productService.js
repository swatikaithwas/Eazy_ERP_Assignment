
const productModels = require("../Model/product");
const { uuid } = require('uuidv4');
const { Op } = require("sequelize");

const create = async ({ product_name, decription, image, price, rating }) => {
    try {
        /*
         1. product name ,decription ,image price are mandatory field
      
        */

        console.log({ product_name, decription, image, price, rating })
        let data = await productModels.create({
            id: uuid(),
            product_name: product_name,
            decription: decription,
            image: image,
            price: price,
            rating: rating,

        })
        if (data) return { code: 200, status: true, data };
        else return { code: 400, status: false, message: "something went wrong" }

    }
    catch (err) {
        console.log("error", err)
        return { code: 500, status: false, message: "Internal Error" }
    }
}
const getallproduct = async ({ skip, limit, search, columnName, orderBy }) => {
    try {
        /*
  1. find all product.
  2. Apply filter
  */
        columnName = 'id'; // default column name
        orderBy = 'ASC'; // default sort order

        const data = await productModels.findAll({
            // where: {
            //     [Op.iLike]: `%${search}%`,
            // },
            order: [
                [`${columnName}`, `${orderBy}`],
            ],
            offset: Number(skip) < 0 ? 0 : Number(skip) || 0,
            limit: Number(limit) < 0 ? 5 : Number(limit) || 60,
        });
        if (data) return { code: 200, status: true, data };
        else return { code: 400, status: false, message: "products unavailable" }
    }
    catch (err) {
        console.log("error", err)
        return { code: 500, status: false, message: "Internal Error" }
    }
}
const getByIdproduct = async (id) => {
    try {
        /*
          1. return product Details, if exist.
          2. else return false
        */
        const data = await productModels.findOne({ where: { id: id } });
        console.log("data", data)
        if (data) return { code: 200, status: true, data };
        else return { code: 400, status: false, message: "product not found" }
    }
    catch (err) {
        console.log("error", err)
        return { code: 500, status: false, message: "Internal Error" }
    }
}
const removeproduct = async (id) => {
    try {
        /*
         1. return product Details, if exist.
         2. else return false
        */
        const data = await productModels.findByPk(id);

        if (data) return { code: 200, status: true, data };
        else return { code: 400, status: false, message: "product not found" }
    }
    catch (err) {
        console.log("error", err)
        return { code: 500, status: false, message: "Internal Error" }
    }
}
const updateproduct = async (id) => {
    try {
        /*
          1. data that find and update 
       */
        const data = await productModels.findByPk(id);
        console.log("data", data)
        if (data) return { code: 200, status: true, data };
        else return { code: 400, status: false, message: "something went wrong" }
    }
    catch (err) {
        console.log("error", err)
        return { code: 500, status: false, message: "Internal Error" }
    }
}
module.exports = {
    create,
    getallproduct,
    getByIdproduct,
    removeproduct,
    updateproduct,

}
