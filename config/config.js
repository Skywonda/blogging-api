require("dotenv").config()

module.exports = {
    'port': process.env.PORT,
    'db_url': process.env.DB_URL,
    'secret': process.env.SECRET,

    GOOGLE_CLEINT_ID: process.env.GOOGLE_CLEINT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET
}