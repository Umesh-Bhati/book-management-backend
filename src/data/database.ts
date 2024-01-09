import mongoose from 'mongoose';



export const connectToDB = async () => {
    try {
        const URI = process.env.MONGODB_URI || ''
        await mongoose.connect(URI);
    } catch (error) {
        console.error(error)
    }
}