import {app} from './app.js'
import dotenv from "dotenv"


dotenv.config({
    path: './.env'
})



// const connected = async () => {
//     try {
//         await mongoose.connect("mongodb://0.0.0.0:27017/WhatsAap", {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//           });
//           console.log("database is connected...");
//         } catch (error) {
//             console.log("some error in connecting database");
//        }
// };

// connected();
       

// app.use("/",router1);


app.listen(process.env.PORT,()=>{
    console.log(`Server is listen on ${process.env.PORT}`);
})