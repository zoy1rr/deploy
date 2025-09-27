import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { FadeLoader } from "react-spinners";
import styles from "./products.module.css";
import { addToCart } from "../../utils/cartUtils";
import Mobile from "../../components/mobile/Mobile";
import { BiLeftArrow } from "react-icons/bi";
BiLeftArrow

function Products() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [mainImg, setMainImg] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [loading, setLoading] = useState(true);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const colors = [
        { name: "Qora", code: "#ccccccff" },
        { name: "Oq", code: "#ccccccff" },
        { name: "Qizil", code: "#ccccccff" },
        { name: "Moviy", code: "#ccccccff" },
    ];

    const sizes = ["S", "M", "L", "XL", "XXL", "3XL", "4XL"];

    // API orqali mahsulotni olish
    useEffect(() => {
        setLoading(true);
        fetch(`https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setMainImg(data.img);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div>
                <Header />
                <div className={styles.loaderContainer}>
                    <FadeLoader loading={loading} color="#36d7b7" height={15} width={5} radius={2} margin={2} />
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Header />
                <div className={styles.loading}>Mahsulot topilmadi...</div>
            </div>
        );
    }

    const thumbnails = [product.img, product.kichikrasm1, product.kichikrasm2, product.kichikrasm3];

    // Savatga qo‘shish
    const handleBuyClick = () => setShowConfirmModal(true);

    const handleConfirmYes = () => {
        const itemToAdd = {
            id: product.id,
            name: product.name,
            price: product.narx,
            color: selectedColor,
            size: selectedSize,
            img: mainImg,
        };

        addToCart(itemToAdd);
        setShowConfirmModal(false);
        setShowSuccessModal(true);
    };

    const handleSuccessClose = () => setShowSuccessModal(false);

    return (
        <div>
            <Header />
            <button className={styles.qaytish} onClick={() => navigate(-1)}><i class="fa-solid fa-angle-left"></i></button>

            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.images}>
                        <div className={styles.mainImgWrapper}>
                            <img src={mainImg} alt={product.name} className={styles.mainImg} />
                        </div>
                        <div className={styles.gallery}>
                            {thumbnails.map((thumb, index) => (
                                thumb && (
                                    <img
                                        key={index}
                                        src={thumb}
                                        alt={`thumb-${index}`}
                                        onClick={() => setMainImg(thumb)}
                                        className={mainImg === thumb ? styles.activeThumb : ""}
                                    />
                                )
                            ))}
                        </div>
                    </div>

                    <div className={styles.details}>
                        <h1 className={styles.name}>
                            {product.name} {selectedColor && `- ${selectedColor}`}
                        </h1>
                        <p className={styles.category}>Kategoriya: {product.kategoriya}</p>
                        <p className={styles.price}>Narx: {product.narx} so'm</p>

                        <div className={styles.option}>
                            <label>Rang:</label>
                            <div className={styles.optionsList}>
                                {colors.map((c) => (
                                    <button
                                        key={c.name}
                                        onClick={() => setSelectedColor(c.name)}
                                        className={`${styles.optionBtn} ${selectedColor === c.name ? styles.selectedColor : ""}`}
                                        style={{
                                            backgroundColor: c.code,
                                            color: c.code === "#000000" ? "#fff" : "#000",
                                        }}
                                    >
                                        {c.name}
                                    </button>
                                ))}
                            </div>
                            {selectedColor && <p className={styles.selectedLabel}>Tanlangan rang: {selectedColor}</p>}
                        </div>

                        <div className={styles.option}>
                            <label>Razmer:</label>
                            <div className={styles.optionsList}>
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`${styles.optionBtn} ${selectedSize === size ? styles.selectedSize : ""}`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {selectedSize && <p className={styles.selectedLabel}>Tanlangan razmer: {selectedSize}</p>}
                        </div>

                        <button className={styles.buyBtn} disabled={!selectedColor || !selectedSize} onClick={handleBuyClick}>
                            Sotib olish
                        </button>

                        <div className={styles.description}>
                            <h3>Mahsulot haqida:</h3>
                            <p className={styles.p}>
                                Bu {product.kategoriya} sifatli materialdan ishlab chiqarilgan. Tanlagan rang va razmeringizga qarab sotib olishingiz mumkin.
                            </p>
                            <p className={styles.p}>Material: 100% paxta</p>
                            <p className={styles.p}>Mahsulot kodi: #{product.id}</p>
                        </div>
                    </div>
                </div>
            </div>

            {showConfirmModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <h2>{product.name} {selectedColor && `- ${selectedColor}`}</h2>
                        <p>Rostan ham {product.name} {selectedColor && `- ${selectedColor}`} sotib olasizmi?</p>
                        <div className={styles.modalButtons}>
                            <button className={styles.yesBtn} onClick={handleConfirmYes}>Ha</button>
                            <button className={styles.noBtn} onClick={() => setShowConfirmModal(false)}>Yo'q</button>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modal}>
                        <h2>✅ {product.name} {selectedColor && `- ${selectedColor}`} savatga qo'shildi!</h2>
                        <button className={styles.closeBtn} onClick={handleSuccessClose}>Yopish</button>
                    </div>
                </div>
            )}
            <Mobile />
        </div>
    );
}

export default Products;
