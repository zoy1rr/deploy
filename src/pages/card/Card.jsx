import { useState, useEffect, useRef } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./card.module.css";

function Card({ id, title, price, image }) {
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const clickTimeout = useRef(null);

    useEffect(() => {
        const likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];
        setLiked(likedProducts.some((item) => item.id === id));
    }, [id]);

    const toggleLike = () => {
        setLiked(!liked);
        let likedProducts = JSON.parse(localStorage.getItem("likedProducts")) || [];

        if (!liked) {
            likedProducts.push({ id, title, price, image });
        } else {
            likedProducts = likedProducts.filter((item) => item.id !== id);
        }

        localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
    };

    const handleClick = () => {
        // 250ms ichida yana click bo'lsa double click deb hisoblaymiz
        if (clickTimeout.current) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
            toggleLike(); // double click bo'lsa like qilamiz
        } else {
            clickTimeout.current = setTimeout(() => {
                navigate(`/products/${id}`); // oddiy click
                clickTimeout.current = null;
            }, 250); // 250ms ichida ikkinchi click bo'lmasa oddiy click
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card} onClick={handleClick}>
                <div className={styles.imageBox}>
                    <div className={styles.mahsulot}>
                        <img src={image} alt={title} />
                    </div>
                    <button
                        className={styles.likeBtn}
                        onClick={(e) => { e.stopPropagation(); toggleLike(); }}
                        style={{ color: liked ? "red" : "gray", transition: "0.3s ease" }}
                    >
                        <FaHeart />
                    </button>
                </div>
                <div className={styles.content}>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.price}>{price}</p>
                    <button className={styles.cartBtn}>
                        <FaShoppingCart /> Savatga qo‘shish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;
