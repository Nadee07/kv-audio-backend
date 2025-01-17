
import express from "express";
import bodyParser from "body-parser"; 
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRoute.js";

dotenv.config();

let app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
   let token = req.header("Authorization");  //crated the auth

   if(token!=null){
      token= token.replace("Bearer ","")

      jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
          
         if(!err){
            req.user = decoded;
         }
      });
   } 
   next() 
}

)


let mongourl = process.env.MONGO_URL;

mongoose.connect(mongourl)

let connection = mongoose.connection
connection.once("open",()=>{
   console.log("MongoDB Connection established successfully")
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/reviews",reviewRouter);
/*app.get("/", (req,res) => {

  

   Student.find().then(
      (result)=>{
         res.json(result)
      }
   ).catch(
      ()=>{
         message:"error occured"
      }
   )


  // console.log("That is a  get request")
   res.json({message:"Good Morning!"+req.body.Name});
   
}); 

app.post("/", (req,res) =>{

  

   let newStudent = req.body

   let student = new Student(newStudent)

   student.save().then(
      ()=>{
         res.json(
            {
               "message": "Student save successfully"
            }
         )
         }
      
   ).catch(
      ()=>{
         res.json(
            {
               "message":"Student could not be saved"
            }
         )
      }
   )

  /* console.log("This is a post request")
   res.json({message:"This is a post request",status:"success"})*/
 // });   


app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
