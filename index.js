
import express from "express";
import bodyParser from "body-parser"; 
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt, { decode } from "jsonwebtoken";




let app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
   let token = req.header("Authorization")

   if(token!=null){
      token= token.replace("Bearer ","")

      jwt.verify(token,"kv-secret-89!",(err,decoded)=>{
          
         if(!err){
            req.user = decoded;
         }
      });
   } 
   next() 
}

)


let mongourl = "mongodb+srv://Admin:123@cluster0.brnb9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongourl)

let connection = mongoose.connection
connection.once("open",()=>{
   console.log("MongoDB Connection established successfully")
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
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
