import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const uri = process.env.DB_URI;
        if (!uri) {
            throw new Error("DB uri not found")
        }
        await mongoose.connect(uri);
        console.log("Connection Successful");
        
    } catch (error) {
        console.log("Connection Unsuccessful");
    }
}

export default connectMongo;
