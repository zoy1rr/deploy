import { useState } from "react";
import Mobile from "../../components/mobile/Mobile";
import styles from "./qidirish.module.css";
import { FaSearch } from "react-icons/fa";

function Qidirish() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [query, setQuery] = useState("");

    const filters = [
        { id: "all", label: "Barchasi" },
        { id: "phone", label: "Telefonlar" },
        { id: "accessory", label: "Aksessuarlar" }
    ];

    return (
        <div className={styles.qidirish_container}>
            {/* Qidiruv qismi */}
            <div className={styles.search_box}>
                <FaSearch className={styles.search_icon} />
                <input
                    type="text"
                    placeholder="Mahsulot qidirish..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* Filter tugmalar */}
            <div className={styles.filter_buttons}>
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        className={`${styles.filter_btn} ${activeFilter === filter.id ? styles.active : ""}`}
                        onClick={() => setActiveFilter(filter.id)}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>
di
            {/* Mobil navigatsiya */}
            <Mobile />
        </div>
    );
}

export default Qidirish;
