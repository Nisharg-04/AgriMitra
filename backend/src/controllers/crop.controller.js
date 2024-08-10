import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";
import { crop } from "../models/crop.model.js";
import cloudinary from "cloudinary";


const createCrop = catchAsyncError(async (req, res,next) => {
    // get crop data from request body
    // create crop
    // return response

    const { category, description, price, stockQuantity } = req.body;
    if (!category || !description || !price || !stockQuantity) {
        return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const existedCrop = await crop.findOne({ category });
    if (existedCrop) {
        return next(new ErrorHandler("Crop already exits", 400));
    }

    // const photoLocalPath = req.files?.photo[0]?.path;
    // if (!photoLocalPath) {
    //     return next(new ErrorHandler("Please provide an Photo of the product", 400));
    // }
    // const photo = await uploadOnCloudinary(photoLocalPath);
    // if (!photo) {
    //     return next(new ErrorHandler("Photo upload failed", 500));
    // }

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "home",
        width: 150,
        crop: "scale",
      });
    
      if (!myCloud) {
        return next(new ErrorHandler("Avatar upload failed", 500));
      }

    const cropProduct = await crop.create({
        category,
        description,
        price,
        photo: myCloud.url,
        stockQuantity,
        producer: req.user._id,
    });

    const createdCrop = await crop.findById(cropProduct._id);
    if (!createCrop) {
        return next(new ErrorHandler("Crop creation failed", 500));
    }
    return res.status(201).json(new ApiResponse(201, "Crop created", cropProduct));
});

const getCrops = catchAsyncError(async (req, res,next) => {
    const crops = await crop.find();
    return res.status(200).json(new ApiResponse(200, "All crops", crops));
});

const updateCrop = catchAsyncError(async (req, res,next) => {
    
    const { category, description, price, stockQuantity } = req.body;
    const cropId = req.params.id;
    const cropDate=await crop.findById(cropId);
    if(!cropDate){
        return next(new ErrorHandler("Crop not found", 401));
    }
    const cropBeforeChange=cropDate;
    cropDate.category=category||cropDate.category;
    cropDate.description=description||cropDate.description;
    cropDate.price=price||cropDate.price;
    cropDate.stockQuantity=stockQuantity||stockQuantity;
    const updatedCrop=await cropDate.save();
    
    if(updateCrop==cropBeforeChange){
        return next(new ErrorHandler("Product not updated",401));
    }
    return res.status(200).json(new ApiResponse(200, "Crop updated", updatedCrop));
})

const deleteCrop = catchAsyncError(async (req, res,next) => {
    // get crop id from request params
    // find crop by id and delete
    // return response
    const cropId = req.params.id;

    const cropDelete=await crop.findByIdAndDelete(cropId);
    if(!cropDelete){
        return next(new ErrorHandler("Crop not found", 404));
    }
    return res.status(200).json(new ApiResponse(200, "Crop deleted"));
});

export { createCrop, getCrops, updateCrop, deleteCrop };
