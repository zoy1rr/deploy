import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
Link

function Header() {
  const [query, setQuery] = useState("");

  // Input yozilganda darhol saqlaymiz
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    localStorage.setItem("searchQuery", value); // Home.jsx o‘qiydi
    window.dispatchEvent(new Event("storage")); // Home.jsx qayta yuklanmasdan eshitadi
  };

  return (
    <header className={styles.sarlavha}>
      <div className={styles.container}>
        <div className={styles.belgi}>
          <a href=""><img src="./nextbuy.png" alt="Logo" /></a>
        </div>

        <div className={styles.ong}>
          <div className={styles.qidiruv}>
            <FaSearch className={styles.icon} />
            <input
              type="text"
              placeholder="Qidirish..."
              value={query}
              onChange={handleChange}
            />
          </div>

          <a href="/like" className={styles.like}>
            <i className="fa-regular fa-heart" id={styles.like}></i>
          </a>
          <a href="/savat" className={styles.like} id={styles.savat}>
            <i className="fa-solid fa-cart-shopping"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
