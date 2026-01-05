import React, { useEffect, useState } from "react";
import { assets, url } from "../admin_assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

function Add() {
  const [images, setImages] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
    subCategory: "Topwear",
    sizes: "",
    bestSeller: "true",
  });
  const onChangeHandle = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  useEffect(() => {
    const temp = [];
    if (images.length > 0) {
      for (const image of images) {
        temp.push(image);
      }
    }
    setImageData(temp);
  }, [images]);
  const onSubmitHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("sizes", data.sizes);
    formData.append("bestSeller", data.bestSeller === "true" ? true : false);

    imageData.forEach((image) => {
      formData.append("image", image);
    });
    const token = localStorage.getItem("token");
    const response = await axios.post(`${url}/api/product/clothes/addclothe`, formData, {
      headers: { token },
    });
    if (response.data.success) {
      toast(response.data.message);
      setData({
        name: "",
        description: "",
        price: "",
        category: data.category,
        subCategory: data.subCategory,
        sizes: "",
        bestSeller: data.bestSeller,
      });
      setImageData([]);
      setImages(false);
    } else {
      toast(response.data.message);
    }
  };
  return (
    <form className="justify-itmes-center relative" onSubmit={onSubmitHandle}>
      <div className="flex flex-row gap-5 justify-around mb-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <label>name</label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={onChangeHandle}
              className="border-black border-[2px] outline-none px-3 py-1 rounded-[5px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <p>description</p>
            <textarea
              className="border-black border-[2px] outline-none px-3 py-1 rounded-[5px]"
              name="description"
              onChange={onChangeHandle}
              value={data.description}
              type="text"
              rows={6}
              placeholder="Write content here"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>price</label>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandle}
              className="border-black border-[2px] outline-none px-3 py-1 rounded-[5px]"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>category</label>
            <select
              className="py-2 px-5"
              name="category"
              value={data.category}
              onChange={onChangeHandle}
              required
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>subCategory</label>
            <select
              className="py-2 px-5"
              name="subCategory"
              value={data.subCategory}
              onChange={onChangeHandle}
              required
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>sizes</label>
            <input
              type="text"
              name="sizes"
              value={data.sizes}
              onChange={onChangeHandle}
              className="border-black border-[2px] outline-none px-3 py-1 rounded-[5px]"
              required
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <p>uploads file : atmost 5 files</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                setImages(e.target.files);
                e.target.value = "";
              }}
              multiple
              hidden
            />
            <label htmlFor="image" className="flex flex-col gap-5">
              {!images ? (
                <img src={assets.upload_area} />
              ) : (
                <div>
                  {imageData.map((image, index) => {
                    return (
                      <img
                        src={URL.createObjectURL(image)}
                        key={index}
                        className="size-[60px] object-cover mt-[10px]"
                      />
                    );
                  })}
                </div>
              )}
            </label>
          </div>
          <div className="flex flex-col">
            <label>bestSeller</label>
            <select
              className="py-2 px-5"
              name="bestSeller"
              value={data.bestSeller}
              onChange={onChangeHandle}
              required
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
        </div>
      </div>
      <button
        className="w-[80px] h-[40px] text-white bg-black rounded-[5px] float-right mr-10 -mt-10"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
}

export default Add;
