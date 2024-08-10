import { FormProvider, useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import { useAppContext } from "../../context/AppContext";
import { API_URL } from "../../api";
import React, { useRef, useState, useEffect } from "react";
import { newCropEntry } from "../../Slices/CropsSlice/createCrop";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
const ProductDetails = ({ onSave }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState(null);

  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    // console.log(price);
    dispatch(
      newCropEntry({
        category:name,
        price,
        stockQuantity:quantity,
        description,
        avatar,
      })
    );
  };
  const registerDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        console.log("je;;p");
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <FormProvider>
      <form
        className="flex flex-col gap-4"
        onSubmit={onSubmit}
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-lightred font-grotesk">
          Add a Product
        </h1>
        <p className="font-poppins text-lg max-sm:text-base">
          Fill out all necessary details required for the product to be listed
          on marketplace{" "}
        </p>
        {/* Seprator */}
        <div className="h-px my-1 bg-black border-[1px] w-full"></div>
        {/* Add product Container */}
        <div className="flex max-sm:flex-col p-2 gap-2 max-sm:gap-4 max-sm:p-4 justify-between border border-lightgray rounded-md">
          {/* Image Upload Section */}
          <div className="flex flex-col w-1/2 max-sm:w-full p-4 border rounded-md border-gray-400">
            <h2 className="text-2xl max-sm:text-xl font-bold font-grotesk text-lightgreen mb-3">
              Choose Product Images to upload
            </h2>
            {/* Seprator */}
            <div className="h-px my-1 bg-black border-[1px] w-full mb-3"></div>
            <label className="text-gray-700 text-md font-bold ">
              {/* Images upload  */}
              <div className="border rounded p-4 flex flex-col gap-4">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={registerDataChange}
                  className="w-full text-gray-700  font-grotesk font-thin "
                />
              </div>
            </label>
          </div>
          <div className="font-grotesk p-4 border rounded-md border-gray-400">
            <h2 className="text-2xl max-sm:text-xl font-bold font-grotesk text-lightgreen mb-3">
              Product Details
            </h2>

            {/* Seprator */}
            <div className="h-px my-1 bg-black border-[1px] w-full mb-3"></div>
            <label className="text-black text-md font-bold font-grotesk flex-1">
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-400 rounded w-full py-1 px-2 font-grotesk"
              />
            </label>

            <div className="flex gap-4 max-sm:flex-col">
              <label className="text-black text-md font-bold flex-1">
                Price
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min={1}
                  className="border border-gray-400 rounded w-full py-1 my-1 px-2"
                />
              </label>
              <label className="text-black text-md font-bold flex-1">
                Quantity
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={1}
                  className="border border-gray-400 rounded w-full py-1 my-1 px-2"
                />
              </label>
            </div>

            <label className="text-black text-md font-bold flex-1">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={10}
                className="border border-gray-400 rounded w-full py-1 my-1 px-2"
              />
            </label>

            <span className="flex justify-end">
              <button
                type="submit"
                className="text-lg bg-lightgreen py-1 my-1 px-6 text-black font-semibold font-grotesk rounded-lg  hover:bg-lightyellow  hover:text-white transition-all"
              >
                Add Product
              </button>
            </span>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductDetails;
