import mongoose from 'mongoose';


const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            ssl: true
        })
    } catch (error) {

    }
}

mongoose.connection.on("error", (err) => {
    console.log(err?.message)
})
mongoose.connection.on("connected", (err) => {
    console.log("Monogose db Connected")
})
mongoose.connection.on("disconnected", (err) => {
    console.log("Mongo db Disconnected")
})

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.log("Close Mongoose Db");
        process.exit(0);
    }
    )
})
export default ConnectDB;