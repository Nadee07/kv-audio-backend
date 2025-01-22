import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    key:{ 
        type : String, 
        required : true,
        unique : true
    },

    name:{
        type: String,
        required: true
    },

    price:{
        type: Number,
        required: true
    },

    category : {
        type : String,
        required: true,
        default : "uncategorized"
    },

    dimensions:{
        type: String,
        required : true
    },

    description: {
        type: String,
        required: true
    },

    availability : {
        type : Boolean,
        required : true,
        default : true
    },

    image : {
        type: [String],
        required : true,
        default : ["https://img.freepik.com/free-vector/white-wireless-headphones-set_1284-71984.jpg?t=st=1737529426~exp=1737533026~hmac=147fc262c529058dbb1a74dd24b153f85cd2b8152352512a5655b0f5b4a201de&w=740 "]
    }
})

const Product = mongoose.model("products",productSchema);

export default Product;