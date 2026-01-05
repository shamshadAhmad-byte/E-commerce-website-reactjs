import React from "react";
import axios from "axios";
import { url,url1 } from "../admin_assets/assets";
import { useState } from "react";
import { useEffect } from "react";
function Order() {
  const [orderData, setOrderData] = useState([]);
  const getOrderData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          `${url}/api/order/listorders`,
          { headers: { token } }
        );
        if (response.data.orders) {
          setOrderData(response.data.orders);
          const temp = [];
          response.data.orders.forEach((order) => {
            const itemInfo = structuredClone(order);
            order.items.forEach((item) => {
              itemInfo.image = item.image[0];
              itemInfo.name = item.name;
              itemInfo.size = item.size;
              itemInfo.quantity = item.quantity;
              itemInfo.price = item.price;
              itemInfo.itemId = item._id;
              temp.push(itemInfo);
            });
          });
          setOrderData(temp);
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (status, orderId, itemId) => {
    console.log(orderId);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${url}/api/order/updatestatus`,
        { orderId, status },
        { headers: { token } }
      );
      if (!response.data.success) {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrderData();
  }, []);
  return (
    <div className="flex flex-col gap-2">
      {orderData.map((order, index) => {
        return (
          <div
            className="flex flex-row mx-3 border-black border-[2px] w-[1280px] ml-2 px-3 py-1 justify-between"
            key={index}
          >
            <img
              src={`${url1}/images/${order.image}`}
              className="w-[100px] h-[150px] object-cover self-center"
            />
            <div className="flex flex-col gap-1">
              <p>{order.name}</p>
              <p>size: {order.size}</p>
              <p>quantity :{order.quantity}</p>
              <p>{new Date().toDateString()}</p>
              <p>{order.paymentMethod}</p>
              <p>{order.payment ? "payment" : "pending"}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p>
                {order.address.firstname} {order.address.lastname}
              </p>
              <p>{order.address.email}</p>
              <p>
                {order.address.street},{order.address.city},
                {order.address.state},{order.address.zipcode},
                {order.address.country}
              </p>
              <p>{order.address.phone}</p>
            </div>
            <select
              className="border-black border-[2px] px-3 py-[6px] self-center text-[20px] font-[550] rounded-[5px] cursor-pointer"
              onChange={(e) =>
                updateStatus(e.target.value, order._id, order.itemId)
              }
            >
              <option value="order placed">order placed</option>
              <option value="packing">packing</option>
              <option value="shipped">shipped</option>
              <option value="out for delivery">out for delivery</option>
              <option value="deliverd">delivered</option>
            </select>
          </div>
        );
      })}
    </div>
  );
}

export default Order;
