import {app} from './app.js'
import connectDB from "./db/index.js"
import dotenv from "dotenv"
import { start } from './services/aws.js'


dotenv.config({
    path: "../.env"
})
console.log(`⚙️ Server is running at port : ${process.env.PORT}`);


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        // start()
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
    process.exit(1);
})

//  temp line there 

//hello
// hello
// new line