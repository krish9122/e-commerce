
import 'dotenv/config';
import dns from "node:dns";
import app from "./App.js"
import connectDB from "./db/index.js"
import { connect } from 'node:http2';

dns.setServers(["8.8.8.8","1.1.1.1"]);

connectDB()
.then(() => {
    app.listen(process.env.PORT || 7000, () => {
        console.log(`server is running on port ${process.env.PORT || 3000}`);  
    });
})
.catch((err) => {
    console.log("connection error !!!...", err);
});