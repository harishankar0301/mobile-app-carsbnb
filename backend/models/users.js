var Sequelize = require("sequelize");
const users = {
    email: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.BLOB("long"),
    },

}
module.exports = users;