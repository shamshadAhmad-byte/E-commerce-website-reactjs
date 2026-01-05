import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import axios from "axios";

function Order() {
  const { url,url1, token } = useContext(ShopContext);
  const [itemsOrder, setItemsOrder] = useState([]);
  const fetchOrder = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${url}/api/order/userorder`,
          { headers: { token } }
        );
        const temp = [];
        response.data.data.forEach((order) => {
          order.items.forEach((item) => {
            temp.push(item);
          });
        });
        setItemsOrder(temp);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, [token]);
  return (
    <div>
      <div className="flex flex-row">
        <h1 className="text-[20px] font-[600] self-center">
          Delivery Information
        </h1>
        <div className="w-[50px] h-[2px] bg-black self-center ml-2 mt-[2px]"></div>
      </div>
      <hr />
      <div className="flex flex-col gap-2">
        {itemsOrder.map((item, index) => {
          return (
            <div
              className="flex flex-row justify-between border-black border-[2px] mx-[5px]"
              key={index}
            >
              <div>
                <img
                  src={`${url1}/images/${item.image[0]}`}
                  className="w-[90px] h-[105px] object-cover"
                />
              </div>
              <div className="flex flex-col my-2 gap-2">
                <div className="text-[20px] font-[600]">{item.name}</div>
                <div className="flex flex-row gap-4">
                  <span>₹{item.price}</span>
                  <span>Quantity: {item.quantity}</span>
                  <span>size: {item.size}</span>
                </div>
                <div className="white-space-normal">
                  {new Date().toDateString()}
                </div>
              </div>
              <div className="flex flex-row self-center cursor-pointer">
                <div className="size-2 bg-green-600 self-center rounded-[50%] mt-[2px] mr-[2px]"></div>
                Ready to ship
              </div>
              <div className="self-center border-[2px] rounded-[5px] mr-[30px] p-[5px] border-black cursor-pointer">
                Track Order
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Order;
