import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected',() => {
        console.log("DB Connected");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

}

export default connectDB;
// import mongoose from "mongoose";

// const connectDB = async () => {
//     try {
//         // Add event listeners for mongoose connection
//         mongoose.connection.on('connected', () => {
//             console.log("MongoDB connection established successfully.");
//         });

//         mongoose.connection.on('error', (err) => {
//             console.error(`MongoDB connection error: ${err.message}`);
//         });

//         mongoose.connection.on('disconnected', () => {
//             console.warn("MongoDB connection is disconnected.");
//         });

//         // Attempt to connect to the MongoDB database
//         const connectionString = process.env.MONGODB_URI;
//         if (!connectionString) {
//             throw new Error("MongoDB connection string (MONGODB_URI) is not defined in environment variables.");
//         }

//         await mongoose.connect(`${connectionString}/e-commerce`, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log("MongoDB connection setup complete.");
//     } catch (error) {
//         console.error(`Failed to connect to MongoDB: ${error.message}`);
//         process.exit(1); // Exit process with failure
//     }
// };

// // Proper handling for app termination
// mongoose.connection.on('SIGINT', async () => {
//     await mongoose.connection.close();
//     console.log("MongoDB connection closed due to app termination.");
//     process.exit(0);
// });

// export default connectDB;
