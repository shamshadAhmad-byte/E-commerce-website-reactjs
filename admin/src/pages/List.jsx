import axios from "axios";
import React, { useEffect, useState } from "react";
import { url, url1 } from "../admin_assets/assets";

function List() {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/clothes/listclothe`);
      if (response.data.success) {
        setList(response.data.clothe);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching the list:", error);
      alert("Failed to fetch the list. Please try again later.");
    }
  };

  const removeProduct = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `${url}/api/product/clothes/removeclothe`,
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        fetchList();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error removing the product:", error);
      alert("Failed to remove the product. Please try again later.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      {list.map((item) => {
        return (
          <div
            className="flex flex-row gap-3 border-black border-[2px] px-2 py-2 w-[1299px] mx-5 justify-between pr-[4.5rem] mt-1"
            key={item._id} // Use unique identifier as key
          >
            <div className="mx-5 flex flex-row">
              {Array.isArray(item.image) &&
                item.image.map((image, index) => {
                  return (
                    <img
                      src={`${url1}/images/${image}`}
                      className="h-[100px] w-[70px] object-cover"
                      key={index}
                    />
                  );
                })}
            </div>
            <div className="flex flex-col gap-2">
              <div>{item.name}</div>
              <div className="flex flex-row gap-2">
                <span>₹{item.price}</span>
                <span>size: {item.size.join(",")}</span>
              </div>
              <div>13 march,2024</div>
            </div>
            <div className="flex flex-col gap-2">
              <div>Category: {item.category}</div>
              <div>subCategory: {item.subCategory}</div>
              <div>bestSeller: {item.bestSeller ? "true" : "false"}</div>
            </div>
            <div
              className="self-center text-[25px] font-[660] mr-2 cursor-pointer"
              onClick={() => {
                removeProduct(item._id);
              }}
            >
              x
            </div>
          </div>
        );
      })}
    </>
  );
}

export default List;
