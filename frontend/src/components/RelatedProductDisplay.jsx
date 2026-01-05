import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../contextStore/ShopContext";

function RelatedProductDisplay({ id, name, price, image }) {
  const { currency, url1 } = useContext(ShopContext);
  return (
    <Link to={`/product/${id}`}>
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
        <img
          className="size-[150px] object-cover"
          src={`${url1}/images/${image[0]}`}
          alt="Product Image"
        />

        <div className="px-6 py-1">
          <div className="font-bold text-xl mb-1">
            {name.split(" ").slice(0, 2).join(" ")}
          </div>
        </div>
        <div className="px-6 pt-1 pb-1">
          <span className="text-gray-900 font-bold text-xl">
            {currency}
            {price}Rs
          </span>
        </div>
      </div>
    </Link>
  );
}

export default RelatedProductDisplay;
