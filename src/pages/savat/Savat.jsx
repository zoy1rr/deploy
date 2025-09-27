import React, { useEffect, useState } from "react";
import styles from "./savat.module.css";
import { FaTrashAlt, FaHome, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

// LocalStorage bilan ishlash uchun util funksiyalar
export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
export const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

function Savat() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Dastlabki cartni olish
    setCart(getCart());

    // 🔹 Admin tomonidan bekor qilingan buyurtmalarni real-time yangilash
    const handleStorage = (e) => {
      if (e.key === "cart_updated") {
        setCart(getCart());
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    saveCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/" className={styles.homeLink}>
          <FaHome className={styles.icon} /> Bosh sahifa
        </Link>
        <div className={styles.cartTitle}>
          <FaShoppingCart /> Savat
        </div>
      </header>

      <div className={styles.cart}>
        {cart.length === 0 ? (
          <p className={styles.empty}>🛒 Savat bo‘sh</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <img src={item.img} alt={item.name} className={styles.cartImg} />
              <div className={styles.cartDetails}>
                <h4>{item.name}</h4>
                <p>Rang: {item.color}</p>
                <p>Razmer: {item.size}</p>
                <p className={styles.price}>{item.price} so‘m</p>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => removeItem(index)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className={styles.totalBox}>
          <p>
            Jami: <span>{total.toLocaleString()} so‘m</span>
          </p>
          <div className={styles.actions}>
            <button
              className={styles.clearBtn}
              onClick={() => {
                setCart([]);
                saveCart([]);
              }}
            >
              Savatni tozalash
            </button>
            <Link to="/zakaz" className={styles.checkoutBtn}>
              To‘lovga o‘tish
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Savat;
