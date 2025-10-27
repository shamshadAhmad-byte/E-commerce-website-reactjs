import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const currency = "₹";
  const [showPara, setShowPara] = useState(false);
  const [search, setSearch] = useState();
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [selectClothe, setSelectClothe] = useState('');
  const [token, setToken] = useState();
  const url = "http://localhost:3000";
  const navigate = useNavigate();
  const addCartData = async (itemId, size) => {
    if (!size) {
      toast.error("select size");
      return;
    }
    const cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      if (cartData[itemId][size] > 0) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItems(cartData);
    if (token) {
      try {
        const response = await axios.post(
          `${url}/web/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        if (!response.data.success) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const getCart = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const item in cartItems[itemId]) {
        totalCount += cartItems[itemId][item];
      }
    }
    return totalCount;
  };
  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (quantity == 0 && token) {
      try {
        const response = await axios.post(
          `${url}/web/cart/remove`,
          { itemId, size },
          { headers: { token } }
        );
        if (!response.data.success) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(
          `${url}/web/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
        if (!response.data.success) {
          alert(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getAmount = () => {
    let total = 0;
    try {
      for (const itemId in cartItems) {
        const productData = products.find((product) => product._id === itemId);
        for (const item in cartItems[itemId]) {
          if (cartItems[itemId][item] > 0) {
            total += productData.price * cartItems[itemId][item];
          }
        }
      }
      return total;
    } catch (error) {}
  };
  const getProductData = async () => {
    try {
      const response = await axios.get(`${url}/web/clothe/list`, {});
      if (response.data.success) {
        setProducts(response.data.clothe);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCartData = async (token1) => {
    try {
      const response = await axios.post(
        `${url}/web/cart/get`,
        {},
        { headers: { token: token1 } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProductData();
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      getCartData(localStorage.getItem("token"));
    }
  }, []);
  const contextValue = {
    products,
    currency,
    showPara,
    setShowPara,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addCartData,
    cartItems,
    setCartItems,
    getCart,
    updateQuantity,
    getAmount,
    url,
    navigate,
    token,
    setToken,
    selectClothe,
    setSelectClothe,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
export default ShopContextProvider;
