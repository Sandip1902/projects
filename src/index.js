import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config();

console.log('MONGODB_URI:', process.env.MONGODB_URI);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000 , () => {
        console.log('server is running at port: ${process.env.PORT}' );

    })
})
.catch((err) => {
    console.log('MongoDB connection failed !!',err);
})


