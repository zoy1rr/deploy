import React, { useEffect, useState } from "react";
import { FadeLoader } from "react-spinners";
import Card from "../card/Card";
import styles from "./allproducts.module.css";
import Header from "../../components/header/Header";
Header

function AllProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getData() {
        setLoading(true);
        try {
            const res = await fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop");
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>

            <Header></Header>
            <div className={styles.container}>
                <h1>Barcha mahsulotlar</h1>
                {loading ? (
                    <div className={styles.loaderContainer}>
                        <FadeLoader loading={loading} color="#36d7b7" />
                    </div>
                ) : (
                    <div className={styles.box}>
                        {products.map((product) => (
                            <Card
                                key={product.id}
                                id={product.id}
                                title={product.name}
                                price={`${product.narx} so'm`}
                                image={product.img}
                            />
                        ))}
                    </div>
                )}
            </div></div>
    );
}

export default AllProducts;
