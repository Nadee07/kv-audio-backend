import Review from "../models/review"; 

export function addReview(req,res){
     if(req.user == null){
        res.status(401).json({
            message:"Please login and try again"
        });
        return;
     }

     const data = req.body;

     data.name = req.user.firstName + "" + req.user.lastName ;
     

     const newReview = new Review(data);
}