import { ApiResponse } from "../utils/apiResponse.util.js";
import { User } from "../models/user.model.js";
import {crop} from "../models/crop.model.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";

const createOrder = catchAsyncError(async (req, res, next) => {
    // get order data from request body
    // check if order already exists
    // create order
    // return response
    // console.log(req.body);
    
    const {products,shippingAddress,status}=req.body;

    if(products ||!shippingAddress || !status){
        return next(new ErrorHandler("Please Provide All The Feilds",400));
    }
    
    //check that all the products are available or not
   for(let orderedProduct of products){   
    const existProduct=await crop.findById  (orderedProduct.productId)
        if(existProduct.stock<orderedProduct.quantity){
            return next(new ErrorHandler(`${existProduct.category} is out of stock`,400));
        }
    }
    
    //now remove the stock from the products
    for(let orderedProduct of products){
        await crop.findByIdAndUpdate(orderedProduct.productId,{
            stock:crop.stock-orderedProduct.quantity,
        },{
            new:true,
            runValidators:true,
            useFindAndModify:false,
        });
    }
    
    //get ObjectId of buyer
    const buyer=req.cookies?.accessToken;
    if(!buyer){
        return next(new ErrorHandler("Please Login First",401));
    }    
    const order = await orderCrop.create({
        products,
        shippingAddress,
        buyer,
        status,
       //here add paymentId
    });
    
    if (!order) {
        return next(new ErrorHandler("Order creation failed", 500));
    }
    
    res.status(201).json({
        success: true,
        order,
    })
});
const getAllOrders = catchAsyncError(async (req, res, next) => {});
const getOrderById = catchAsyncError(async (req, res, next) => {});
const updateOrder = catchAsyncError(async (req, res, next) => {});
const deleteOrder = catchAsyncError(async (req, res, next) => {});

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    };
