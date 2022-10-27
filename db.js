const mongoose = require("mongoose")
const config = require("./config/config")

const db_url = config.db_url

function connectToDatabase() {
    mongoose.connect(db_url)

    mongoose.connection.on("connected", () => {
        console.log("Database connected successfully")
    })

    mongoose.connection.on("error", (err) => {
        console.log("An error occured while connecting to the database")
        console.log(err)
    })
}

module.exports = {
    connectToDatabase
}