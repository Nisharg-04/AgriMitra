import { asyncHandler } from "../utils/asyncHandler.util.js";
import { ApiResponse } from "../utils/apiResponse.util.js";
import { uploadOnCloudinary } from "../utils/cloudinary.util.js";
import { ErrorHandler } from "../utils/errorHandler.util.js";
import { catchAsyncError } from "../middleware/catchAsyncError.middleware.js";

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

    const photoLocalPath = req.files?.photo[0]?.path;
    if (!photoLocalPath) {
        return next(new ErrorHandler("Please provide an Photo of the product", 400));
    }
    const photo = await uploadOnCloudinary(photoLocalPath);
    if (!photo) {
        return next(new ErrorHandler("Photo upload failed", 500));
    }

    const crop = await crop.create({
        category,
        description,
        price,
        photo: photo.url,
        stockQuantity,
        producer: req.user._id,
    });
    const createdCrop = await findById(crop._id);
    if (!createCrop) {
        return next(new ErrorHandler("Crop creation failed", 500));
    }
    return res.status(201).json(new ApiResponse(201, "Crop created", crop));
});


const getCrops = asyncHandler(async (req, res) => {
    // get all crops
    // return response

    const crops = await Crop.find();

    return res.status(200).json(new ApiResponse(200, "All crops", crops));
});

const updateCrop = asyncHandler(async (req, res) => {
    // get crop id from request params
    // get crop data from request body
    // find crop by id and update
    // return response

    const cropId = req.params.id;
    const cropData = req.body;

    const crop = await Crop.findByIdAndUpdate(cropId, cropData, {
        new: true,
    });

    return res.status(200).json(new ApiResponse(200, "Crop updated", crop));
})

const deleteCrop = asyncHandler(async (req, res) => {
    // get crop id from request params
    // find crop by id and delete
    // return response

    const cropId = req.params.id;

    await Crop.findByIdAndDelete(cropId);

    return res.status(200).json(new ApiResponse(200, "Crop deleted"));
});

export { createCrop, getCrops, updateCrop, deleteCrop };

