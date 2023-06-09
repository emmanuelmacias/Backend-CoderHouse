import mongoose from 'mongoose';

const connectionString = 'mongodb+srv://admin-user:yHpQ59f6Nm39JZlN@cluster0.72t9vwl.mongodb.net/coderhouse?retryWrites=true&w=majority';

/* const connectionString ='mongodb://localhost:27017/coderhouse' */

    try {
        await mongoose.connect(connectionString);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }


/* export const disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error(error);
    }
}; */
