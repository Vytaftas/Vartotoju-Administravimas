import mongoose from 'mongoose';
import 'dotenv/config';

const DB_URI = process.env.MONGO_URI;

(() => {
    if (DB_URI)
        mongoose.connect(DB_URI).catch((error: string | undefined) => {
            console.log(error);
            process.exit(1);
        });
})();
