import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../card/Card";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./like.module.css";
import Mobile from "../../components/mobile/Mobile";



function Like() {
    const navigate = useNavigate();
    const [likedProducts, setLikedProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const liked = JSON.parse(localStorage.getItem("likedProducts")) || [];
        setLikedProducts(liked);
        setFilteredProducts(liked);
    }, []);

    useEffect(() => {
        const filtered = likedProducts.filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [search, likedProducts]);

    return (
        <div>
            <header className={styles.header}>

                <button className={styles.backButton} onClick={() => navigate(-1)}>
                    <FaArrowLeft />
                </button>
                <h1 className={styles.title}>Like qilingan mahsulotlar</h1>
                <input
                    type="text"
                    className={styles.searchInput}
                    placeholder="Mahsulotlarni qidirish..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </header>
            <div className={styles.container}>
                {/* Premium Header */}

                {/* Mahsulotlar */}
                {filteredProducts.length === 0 ? (
                    <p className={styles.emptyMessage}>
                        Siz hali hech narsani like qilmagansiz yoki qidiruv natijasi yo‘q.
                    </p>
                ) : (
                    <div className={styles.box}>
                        {filteredProducts.map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                )}
            </div>
            <Mobile className={styles.mobile}></Mobile>
        </div>
    );
}

export default Like;
