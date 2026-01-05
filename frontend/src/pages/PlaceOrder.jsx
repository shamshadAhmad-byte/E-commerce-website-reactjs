import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../contextStore/ShopContext";
import axios from "axios";

function PlaceOrder() {
  const { getAmount, navigate, url, token, cartItems, products, setCartItems } =
    useContext(ShopContext);
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const [method, setMethod] = useState("COD");
  const onChangeHandle = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };
  const onSubmitHandle = async (event) => {
    event.preventDefault();
    try {
      const orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            itemInfo.size = item;
            itemInfo.quantity = cartItems[items][item];
            orderItems.push(itemInfo);
          }
        }
      }

      const filled =
        address.firstname.length > 0 &&
        address.lastname.length > 0 &&
        address.email.length > 0 &&
        address.street.length > 0 &&
        address.city.length > 0 &&
        address.state.length > 0 &&
        address.zipcode.length > 0 &&
        address.country.length > 0 &&
        address.phone.length > 0;
      if (filled) {
        if (method === "COD") {
          const orderData = {
            items: orderItems,
            address: address,
            amount: getAmount() + 50,
          };
          try {
            const response = await axios.post(
              `${url}/api/order/placeordercod`,
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItems({});
              navigate("/order");
            }
          } catch (error) {
            console.log(error);
          }
        } else if (method === "stripe") {
          try {
            const orderData = {
              items: orderItems,
              address: address,
              amount: getAmount() + 50,
              origin: document.location.origin,
            };
            const response = await axios.post(
              `${url}/api/order/placeorderstripe`,
              { orderData },
              { headers: { token } }
            );
            console.log(response);
            if (response.data.success) {
              window.location.replace(response.data.session_url);
            } else {
              alert("Payment failed");
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        alert("Please fill all the fields");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandle}
      className="flex flex-row justify-between mb-[10px]"
    >
      <div className="flex flex-col ml-10 gap-5 justify-center content-center mb-10">
        <div className="flex flex-row">
          <h1 className="text-[20px] font-[600] self-center">
            Delivery Information
          </h1>
          <div className="w-[50px] h-[2px] bg-black self-center ml-2 mt-[2px]"></div>
        </div>
        <div className="flex flex-row border-none outline-none gap-5">
          <input
            type="text"
            onChange={onChangeHandle}
            placeholder="First name"
            name="firstname"
            className="w-[200px] h-[40px] border-[2px] px-5 pb-[2px] outline-none rounded-[5px] placeholder-black placeholder-shown: self-center"
            required
          />
          <input
            type="text"
            onChange={onChangeHandle}
            name="lastname"
            placeholder="Last name"
            className="w-[200px] h-[40px] border-[2px] rounded-[5px] px-5 outline-none pb-[2px] placeholder-black placeholder-shown:self-center"
            required
          />
        </div>
        <div className="w-[420px] h-[40px] border-[2px] rounded-[5px]">
          <input
            type="email"
            onChange={onChangeHandle}
            name="email"
            placeholder="Email Address"
            className="w-full h-full self-center placeholder:text-black px-5 rounded-[5px] outline-none"
            required
          />
        </div>
        <div className="w-[420px] h-[40px] border-[2px] rounded-[5px]">
          <input
            type="text"
            onChange={onChangeHandle}
            name="street"
            placeholder="Street"
            className="w-full h-full self-center placeholder:text-black px-5 rounded-[5px] outline-none"
            required
          />
        </div>
        <div className="flex flex-row border-none outline-none gap-5">
          <input
            type="text"
            onChange={onChangeHandle}
            name="city"
            placeholder="City"
            className="w-[200px] h-[40px] border-[2px] px-5 pb-[2px] outline-none rounded-[5px] placeholder-black placeholder-shown: self-center"
            required
          />
          <input
            type="text"
            onChange={onChangeHandle}
            name="state"
            placeholder="State"
            className="w-[200px] h-[40px] border-[2px] px-5 pb-[2px] outline-none rounded-[5px] placeholder-black placeholder-shown: self-center"
            required
          />
        </div>
        <div className="flex flex-row border-none outline-none gap-5">
          <input
            type="text"
            onChange={onChangeHandle}
            name="zipcode"
            placeholder="Zip Code"
            className="w-[200px] h-[40px] border-[2px] px-5 pb-[2px] outline-none rounded-[5px] placeholder-black placeholder-shown: self-center"
            required
          />
          <input
            type="text"
            onChange={onChangeHandle}
            name="country"
            placeholder="Country"
            className="w-[200px] h-[40px] border-[2px] px-5 pb-[2px] outline-none rounded-[5px] placeholder-black placeholder-shown: self-center"
            required
          />
        </div>
        <div className="w-[420px] h-[40px] border-[2px] rounded-[5px]">
          <input
            type="text"
            onChange={onChangeHandle}
            name="phone"
            placeholder="Phone Number"
            className="w-full h-full self-center placeholder:text-black px-5 rounded-[5px] outline-none"
            required
          />
        </div>
      </div>
      <div className="flex flex-col mr-[120px] gap-8 mb-10">
        <div className="">
          <div className="flex flex-row">
            <h1 className="text-[20px] font-[600] self-center">CART TOTALS</h1>
            <div className="w-[50px] h-[2px] bg-black self-center ml-2 mt-[2px]"></div>
          </div>
          <div className="flex flex-row justify-between content-center gap-10 mt-[10px] mb-[5px]">
            <span>Subtotal</span>
            <span>₹{getAmount()}</span>
          </div>
          <hr className="bg-black h-[2px]" />
          <div className="flex flex-row justify-between content-center gap-10 mt-[10px] mb-[5px]">
            <span>shipping</span>
            <span>₹50</span>
          </div>
          <hr className="bg-black h-[2px]" />
          <div className="flex flex-row justify-between content-center gap-10 mt-[10px] mb-[5px]">
            <span>total</span>
            <span>₹{getAmount() !== 0 ? getAmount() + 50 : 0}</span>
          </div>
          <hr className="bg-black h-[2px]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row">
            <h1 className="text-[20px] font-[600] self-center">
              PAYMENT METHOD
            </h1>
            <div className="w-[50px] h-[2px] bg-black self-center ml-2 mt-[2px]"></div>
          </div>
          <div className="flex flex-row justify-between mt-5 mb-5">
            <div
              className={`w-[65px] h-[30px] border-[2px] rounded-[5px] border-black text-green-600 pl-[5px] ${
                method === "stripe" ? "bg-black" : "bg-white"
              } cursor-pointer`}
              onClick={() => setMethod("stripe")}
            >
              STRIPE
            </div>
            <div
              className={`border-[2px] border-black rounded-[5px] text-blue-400 px-[5px] py-[2px] ${
                method === "COD" ? "bg-black" : "bg-white"
              } cursor-pointer`}
              onClick={() => setMethod("COD")}
            >
              CASH ON DELIVERY
            </div>
          </div>
          <div className="float-right">
            <button
              className="bg-black text-white px-5 py-2 rounded-[5px] w-[149px] float-end cursor-pointer"
              type="submit"
            >
              PLACEORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
