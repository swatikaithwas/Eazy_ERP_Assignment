var Sequelize = require('sequelize');
var db = require('../Service/database');

var productModel = {
   product_name: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   decription: {
      type: Sequelize.STRING,
      allowNull: false
   },
   image: {
      type: Sequelize.STRING,
      allowNull: false
   },
   price: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   rating: {
      type: Sequelize.INTEGER,
      defaultValue: 3,
   }


}

var productModels = db.define('productModel', productModel);

module.exports = productModels
