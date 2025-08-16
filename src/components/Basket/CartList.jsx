import React from "react";
import CartItem from "./CartItem";
import { useAuth } from "../../context/AuthContext";

function CartList() {
  const { basket } = useAuth();
  return (
    <>
      {basket.length > 0 ? (
        basket.map((product, index) => (
          <CartItem key={index} product={product} />
        ))
      ) : (
        <h4 className="dark:text-white text-dark-primary text-center py-4 text-xl">
          سبد خرید خالی است :((
        </h4>
      )}
    </>
  );
}

export default CartList;
