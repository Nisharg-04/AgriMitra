import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import { getAllCrops } from "../Slices/CropsSlice/GetAllCrops";
import { useNavigate } from "react-router-dom";
const Marketplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { crops, loading, error } = useSelector((state) => state.crops);

  useEffect(() => {
    dispatch(getAllCrops());
  }, []);
//   if (!crops) {
//     return <h1>Loading...</h1>;
//   }
  return (
    <div className="flex flex-col gap-5">
      <div className="gap-2 flex flex-col">
        <h2 className="text-3xl font-bold font-grotesk text-lightgreen">
          Marketplace
        </h2>
        <p className="font-poppins text-lg max-sm:text-base">
          Platform for buying, selling, or exchanging goods, services, or
          handicrafts ...
        </p>
        {/* Seprator */}
        <div className="h-px my-1 bg-black w-full"></div>
      </div>
      <div className="flex w-full items-center justify-between">
        <span className="text-xl max-sm:text-base font-semibold font-grotesk">
          {crops.length} crops found
        </span>

        <select
          // value={sortOption}
          className="p-2 max-sm:p-1 font-poppins border rounded-md"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price (low to high)</option>
          <option value="priceDesc">Price (high to low)</option>
        </select>
      </div>
      <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1">
        {crops.map((item) => (
          <ProductCard data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
