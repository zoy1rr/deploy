// Home.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Headerr from "../../components/headerr/Headerr";
import Mobile from "../../components/mobile/Mobile";
import Silider from "../../components/silider/Silider";
import Headerbottom from "../../components/bottomheader/Headerbottom";
import Card from "../card/Card";
import styles from "./home.module.css";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState(localStorage.getItem("searchQuery") || "");

    const navigate = useNavigate();

    const shuffleArray = useCallback((array) => {
        const a = [...array];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }, []);

    const getData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop");
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            setProducts(shuffleArray(data || []));
        } catch (err) {
            console.error(err);
            setError(err.message || "Noma'lum xato");
        } finally {
            setLoading(false);
        }
    }, [shuffleArray]);

    useEffect(() => {
        getData();
    }, [getData]);

    // 🔍 localStorage o‘zgarishini tinglash
    useEffect(() => {
        const handler = () => {
            setQuery(localStorage.getItem("searchQuery") || "");
        };
        window.addEventListener("storage", handler);
        return () => window.removeEventListener("storage", handler);
    }, []);

    const filteredProducts = useMemo(() => {
        if (!query) return products;
        return products.filter((p) =>
            (p.name || "").toLowerCase().includes(query.toLowerCase())
        );
    }, [products, query]);

    const topProducts = useMemo(() => filteredProducts.slice(0, 10), [filteredProducts]);
    const bottomProducts = useMemo(() => filteredProducts.slice(10, 25), [filteredProducts]);

    const getImageSrc = (img) => {
        if (!img) return "/placeholder.png";
        if (/^https?:\/\//i.test(img)) return img;
        if (img.startsWith("/")) return img;
        return `/${img}`;
    };
    

    return (
        <div className={styles.pageRoot}>
            <Headerr className={styles.headerr} />
            <Header />
            <hr />
            <Headerbottom />
            {!query && <Silider />}
            

            <div className={styles.container}>
                
            </div>

            <div className={styles.container}>
                <h1
                    className={styles.h1}
                    onClick={() => navigate("/all-products")}
                    style={{ cursor: "pointer" }}
                >
                    Hammasi <i className="fa-solid fa-angle-right"></i>
                </h1>
            </div>

            <div className={styles.container}>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <FadeLoader
                            loading={loading}
                            color="#36d7b7"
                            height={15}
                            width={5}
                            radius={2}
                            margin={2}
                        />
                    </div>
                ) : error ? (
                    <div className={styles.errorBox}>
                        <p>Xato: {error}</p>
                        <button className={styles.retryBtn} onClick={getData}>Qayta yuklash</button>
                    </div>
                ) : (
                    <>
                        <div className={styles.productsWrapper}>
                            {topProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    price={`${product.narx ?? "—"} so'm`}
                                    image={getImageSrc(product.img)}
                                />
                            ))}
                        </div>

                        <div className={styles.box}>
                            {bottomProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    id={product.id}
                                    title={product.name}
                                    price={`${product.narx ?? "—"} so'm`}
                                    image={getImageSrc(product.img)}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            <Mobile className={styles.a} />
            <Footer />
        </div>
    );
}
