import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../contextStore/ShopContext";
import RealtedProduct from "../components/RealtedProduct";

function Product() {
  const productId = useParams();
  const { products, addCartData, currency, url1, setSelectClothe } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [changeImage, setChangeImage] = useState();
  const [size, setSize] = useState("");
  const applyFilter = async () => {
    products.map((item) => {
      if (item._id === productId.productId) {
        setProductData(item);
        setChangeImage(item.image[0]);
        return null;
      }
    });
  };
  useEffect(() => {
    applyFilter();
  }, [products, productId]);
  return productData ? (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 pl-10 mb-8 flex flex-row">
              <img
                src={`${url1}/images/${changeImage}`}
                alt="Product"
                className="size-160 rounded-lg shadow-md mb-1 object-cover cursor-pointer"
                onClick={() => setSelectClothe(`${url1}/images/${changeImage}`)}
              />
              <div className="flex flex-col gap-4 py-4 justify-center overflow-x-auto">
                {productData.image.map((item, index) => {
                  return (
                    <img
                      src={`${url1}/images/${item}`}
                      onClick={() => setChangeImage(item)}
                      alt="Thumbnail 1"
                      className="size-[100px] sm:size-30 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300 mx-10"
                      key={index}
                    />
                  );
                })}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-4">
              <h2 className="text-3xl font-bold mb-2">{productData.name}</h2>
              <div className="mb-4">
                <span className="text-2xl font-bold mr-2">
                  {currency}
                  {productData.price}
                </span>
              </div>
              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-gray-600">4.5 (120 reviews)</span>
              </div>
              <p className="text-gray-700 mb-6">{productData.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">SIZE:</h3>
                <div className="flex space-x-2">
                  {productData.size.map((item, index) => {
                    return (
                      <button
                        onClick={() => setSize(item)}
                        className="w-8 h-8 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                        key={index}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => addCartData(productData._id, size)}
                  className="bg-indigo-600 flex gap-2 items-center text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                    />
                  </svg>
                  Add to Cart
                </button>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">
                  100% Original Product
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  <li>Cash on dilivery is available on this product</li>
                  <li>Easy return and exchange policy within 7 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RealtedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </>
  ) : null;
}

export default Product;
