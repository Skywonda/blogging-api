const app = require('./app')
const { connectToDatabase } = require("./db")
const config = require("./config/config")

const port = config.port


connectToDatabase()


app.listen(port, () => {
    console.log(`Server is running now on localhost:${port}`)
})