
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    'crud_operation',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

sequelize
    .sync()
    .then((result) => {
        // console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

module.exports = sequelize