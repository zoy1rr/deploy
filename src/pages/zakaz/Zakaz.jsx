import React, { useState, useEffect } from "react";
import styles from "./zakaz.module.css";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";

function Zakaz() {
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    region: "",
    city: "",
    street: "",
    house: "",
    delivery: "courier",
    payment: "naqd",
    promo: "",
  });
  const [discount, setDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Telegram bot config
  const BOT_TOKEN = "8423146998:AAHU5hONprRAeePqDkOcrbVeBar6LMNE8To"; // 🔴 tokeningizni shu yerga qo‘ying
  const CHAT_ID = "7062038221";     // 🔴 chatId ni qo‘ying

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  const total = cart.reduce((acc, item) => acc + Number(item.price), 0);
  const finalTotal = total - discount;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyPromo = () => {
    if (formData.promo.toLowerCase() === "bonus10") {
      setDiscount(total * 0.1);
    } else {
      setDiscount(0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.region || !formData.city)
      return;

    // 📩 Telegram xabar matni
    let message = `🆕 Yangi buyurtma!\n\n`;
    message += `👤 Ism: ${formData.name}\n📞 Telefon: ${formData.phone}\n📧 Email: ${formData.email || "-"}\n`;
    message += `📍 Manzil: ${formData.region}, ${formData.city}, ${formData.street || ""} ${formData.house || ""}\n`;
    message += `🚚 Yetkazib berish: ${formData.delivery}\n💳 To‘lov: ${formData.payment}\n`;
    if (formData.promo) message += `🎁 Promo-kod: ${formData.promo}\n`;
    message += `\n🛒 Mahsulotlar:\n`;

    cart.forEach((item, i) => {
      message += `${i + 1}) ${item.name} - ${item.price} so‘m\n`;
    });

    message += `\n💰 Jami: ${total} so‘m\n`;
    if (discount > 0) message += `💵 Chegirma: -${discount} so‘m\n`;
    message += `✅ Umumiy summa: ${finalTotal} so‘m\n`;

    // 📤 Telegramga yuborish
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    // 🧹 Savatni tozalash
    localStorage.removeItem("cart");
    setCart([]);
    setSubmitted(true);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link to="/savat" className={styles.backBtn}>
          <FaArrowLeft /> Orqaga
        </Link>
        <h2>Buyurtma berish</h2>
      </header>

      {!submitted ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* Shaxsiy ma’lumotlar */}
          <h3 className={styles.sectionTitle}>👤 Shaxsiy ma’lumotlar</h3>
          <div className={styles.inputGroup}>
            <FaUser className={styles.icon} />
            <input
              type="text"
              name="name"
              placeholder="Ismingiz"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaPhone className={styles.icon} />
            <input
              type="tel"
              name="phone"
              placeholder="Telefon raqamingiz"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <FaEnvelope className={styles.icon} />
            <input
              type="email"
              name="email"
              placeholder="Email (ixtiyoriy)"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          {/* Manzil */}
          <h3 className={styles.sectionTitle}>📍 Yetkazib berish manzili</h3>
          <div className={styles.inputGroup}>
            <FaMapMarkerAlt className={styles.icon} />
            <input
              type="text"
              name="region"
              placeholder="Viloyat"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="city"
              placeholder="Shahar / Tuman"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="street"
              placeholder="Ko‘cha"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="text"
              name="house"
              placeholder="Uy / Kvartira"
              value={formData.house}
              onChange={handleChange}
            />
          </div>

          {/* Yetkazib berish usuli */}
          <h3 className={styles.sectionTitle}>🚚 Yetkazib berish usuli</h3>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="delivery"
                value="Kuryer orqali"
                checked={formData.delivery === "Kuryer orqali"}
                onChange={handleChange}
              />
              <FaTruck /> Kuryer orqali
            </label>
            <label>
              <input
                type="radio"
                name="delivery"
                value="O'zi olib ketish"
                checked={formData.delivery === "O'zi olib ketish"}
                onChange={handleChange}
              />
              O‘zi olib ketish
            </label>
          </div>

          {/* To‘lov usuli */}
          <h3 className={styles.sectionTitle}>💳 To‘lov usuli</h3>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="payment"
                value="naqd"
                checked={formData.payment === "naqd"}
                onChange={handleChange}
              />
              Naqd to‘lov
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="karta"
                checked={formData.payment === "karta"}
                onChange={handleChange}
              />
              <FaCreditCard /> Karta orqali
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="click"
                checked={formData.payment === "click"}
                onChange={handleChange}
              />
              Click / Payme
            </label>
          </div>

          {/* Promo kod */}
          <h3 className={styles.sectionTitle}>🎁 Promo-kod</h3>
          <div className={styles.promoGroup}>
            <input
              type="text"
              name="promo"
              placeholder="Masalan: BONUS10"
              value={formData.promo}
              onChange={handleChange}
            />
            <button type="button" onClick={applyPromo}>
              Qo‘llash
            </button>
          </div>

          {/* Buyurtma umumiy */}
          <h3 className={styles.sectionTitle}>🛒 Buyurtma</h3>
          <div className={styles.cartPreview}>
            {cart.length === 0 ? (
              <p>Savat bo‘sh</p>
            ) : (
              cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img src={item.img} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <span>{item.price} so‘m</span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className={styles.total}>
            <p>
              Jami: <b>{total} so‘m</b>
            </p>
            {discount > 0 && (
              <p className={styles.discount}>Chegirma: -{discount} so‘m</p>
            )}
            <p className={styles.final}>
              Umumiy: <b>{finalTotal} so‘m</b>
            </p>
          </div>

          {/* Yuborish */}
          <button type="submit" className={styles.submitBtn}>
            ✅ Buyurtmani tasdiqlash
          </button>
        </form>
      ) : (
        <div className={styles.success}>
          <h3>✅ Buyurtmangiz qabul qilindi!</h3>
          <p>Operator tez orada siz bilan bog‘lanadi.</p>
          <Link to="/" className={styles.homeBtn}>
            🏠 Bosh sahifaga qaytish
          </Link>
        </div>
      )}
    </div>
  );
}

export default Zakaz;
