import { useState } from "react";
import { FaSearch, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Mobile from "../../components/mobile/Mobile";
import styles from "./Buyurtmalar.module.css";

function Buyurtmalar() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");

    // Test uchun buyurtmalar (keyinchalik API dan olish mumkin)
    const orders = [
        {
            id: 1,
            product: "iPhone 14 Pro",
            price: "13 000 000 so'm",
            status: "Yetkazilmoqda",
            date: "2025-08-18",
        },
        {
            id: 2,
            product: "Samsung Galaxy S24",
            price: "10 500 000 so'm",
            status: "Yetkazib berildi",
            date: "2025-08-15",
        },
        {
            id: 3,
            product: "Xiaomi Redmi Note 13",
            price: "3 200 000 so'm",
            status: "Bekor qilindi",
            date: "2025-08-10",
        },
    ];

    // Qidiruv bo‘yicha filter
    const filteredOrders = orders.filter((order) =>
        order.product.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className={styles.container}>
            {/* HEADER */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className={styles.title}>📦 Buyurtmalar</h1>
            </div>

            {/* SEARCH */}
            <div className={styles.searchBox}>
                <FaSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Buyurtma qidirish..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>

            {/* ORDERS */}
            <div className={styles.orders}>
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className={styles.card}>
                            <h3>{order.product}</h3>
                            <p>
                                <strong>Narxi:</strong> {order.price}
                            </p>
                            <p>
                                <strong>Sana:</strong> {order.date}
                            </p>
                            <span
                                className={`${styles.status} ${styles[order.status.replace(/\s/g, "")]
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>
                    ))
                ) : (
                    <p className={styles.empty}>❌ Buyurtma topilmadi</p>
                )}
            </div>


            <Mobile />
        </div>
    );
}

export default Buyurtmalar;
