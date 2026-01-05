import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ShopContext } from "../contextStore/ShopContext";
import axios from "axios";

function Verify() {
  const { url, token, setCartItems, navigate } = useContext(ShopContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const verify = async () => {
    if (!token) {
      return null;
    }
    const response = await axios.post(
      `${url}/api/order/verifyorder`,
      { success, orderId },
      { headers: { token } }
    );
    if (response.data.sucess) {
      setCartItems({});
      navigate("/order");
    } else {
      navigate("/cart");
    }
  };
  useEffect(() => {
    verify();
  }, [token]);
  return <div>very</div>;
}

export default Verify;
