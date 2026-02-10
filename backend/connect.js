const mongoose = require( "mongoose")
module.exports = { connectDB : async () => {

const mongoDBUri = process.env.MongoUri;
const options = {
    dbName: "shop",
    /** username for authentication, equivalent to `options.auth.user`. Maintained for backwards compatibility. */
    user: "",
    /** password for authentication, equivalent to `options.auth.password`. Maintained for backwards compatibility. */
    pass: ""
}

    const connectionState =await mongoose.connect(mongoDBUri, options).then((m) => {
        m.connection
       console.log("Connected to MongoDB : ", m.connection.host);}, (e) => {console.log("Error to connect to MongoDB : ", e.message) });

}
}

// const dbName = mongoose.connection.db;
// console.log("Database Name  : ", dbName);