import mongoose from "mongoose";

// Connecting to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://Navin_Venkat:NavinVenkatV@cluster0.fnpwr.mongodb.net/");
        console.log("Successfully connected to database");
    } catch (e) {
        console.error("Error connecting to database", e);
    }
};
connectDB();

// Schema 
const sendDetailSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
    },
    emailBody: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['scheduled', 'sent', 'failed'],
        default: 'scheduled'
    }
});

const SenderDetail = mongoose.model('SenderDetail', sendDetailSchema);

export default SenderDetail;
