import Inquiry from "../models/inquiry.js";
import { isItCustomer } from "./userController.js";

export async function addInquiry(req, res) {
  try {
    console.log(isItCustomer(req));
    if (isItCustomer(req)) {
      const data = req.body;
      data.email = req.user.email;
      data.phone = req.user.phone;

      let id = 0;

      const inquiries = await Inquiry.find().sort({ id: -1 }).limit(1);

      if (inquiries.length == 0) {
        id = 1;
      } else {
        id = inquiries[0].id + 1;
      }

      data.id = id;

      const newInquiry = new Inquiry(data);
      const response = await newInquiry.save();

      res.json({ message: "Inquiry added succesfully", id: response.id });
      // methana prashne thibbe oyage login user customer kenekda kiyala check krnwa. customer kenek nam prashnyak  wenne na.
      // but customer kenek newinam ethanin eht code eke thibbe na mkd krnn oni kiyala e nisa eya ethanin eht yann baruwa innwa e nisa postman eke waiting thibbe. koi wele hari time out wenkn catch eka yanne nah
      // me else eken customer kenek neminam dan error ekek ywanwa e nisa prashne hari
    } else{
        res.status(404).json({
            message: 'You are the unauthorized user. Please login as a customer user ',
          });
    }
  } catch (e) {
    res.status(500).json({
      message: "Failed to add inquiry",
    });
  }
}
