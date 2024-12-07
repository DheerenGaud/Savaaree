import express from "express"
import cors from "cors"
import bodyparser from "body-parser"

// const router1 =require("./Router/router")


const app= express();



app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/public",express.static('public'))


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

app.get("/",(req,res)=>{
    res.send("hello")
})

export { app }