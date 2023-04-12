require("dotenv").config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var http = require("http");
const productRoutes = require("./routes/product");

const database = require("./Service/database")
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/product", productRoutes);

//<<< Server Started At port : 3001 >>>//

var server = http.createServer(app);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server started at port : ${port}`);
});
