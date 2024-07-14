
import mongoose from "mongoose";

const connectMongoDB = async()=>{

    try {
        await mongoose.connect(`${process.env.NEXT_PUBLIC_MONGODB_URI}`, )
        console.log("connected to Mongo DB")
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

export default connectMongoDB;