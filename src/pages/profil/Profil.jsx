import { useState } from 'react';
import Mobile from '../../components/mobile/Mobile';
import styles from './profil.module.css';
import { Link } from 'react-router-dom';

function Profil() {
    const [avatar, setAvatar] = useState(
        "https://i.pinimg.com/originals/b7/5b/29/b75b29441bbd967deda4365441497221.png"
    );
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("uz");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <div className={`${styles.profil} ${darkMode ? styles.dark : ""}`}>
            <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>

                {/* Header */}
                <header className={styles.header}>
                    <Link to="/" className={styles.backBtn}>←</Link>
                    <h1 className={styles.title}>Mening Profilim</h1>
                </header>

                {/* Profile Card */}
                <div className={styles.profileCard}>
                    <div className={styles.avatarWrapper}>
                        <label htmlFor="avatarUpload" className={styles.avatarLabel}>
                            <img src={avatar} alt="Profil rasmi" className={styles.avatar} />
                            <span className={styles.uploadText}>📷</span>
                        </label>
                        <input
                            type="file"
                            id="avatarUpload"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                    </div>
                    <h2 className={styles.name}>User</h2>
                    <p className={styles.status}>Premium a'zo</p>
                </div>

                {/* Menu */}
                <div className={styles.menu}>
                    
                    

                    <div className={styles.menuItem}>
                        🌍 Til:
                        <select
                            value={language}
                            onChange={handleLanguageChange}
                            className={styles.select}
                        >
                            <option value="uz">O‘zbekcha</option>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <div className={styles.menuItem}>
                        🌓 Dark Mode
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={darkMode}
                                onChange={toggleDarkMode}
                            />
                            <span className={styles.slider}></span>
                        </label>
                    </div>

                    <button className={styles.menuItem}>📞 Support</button>
                    <button className={`${styles.menuItem} ${styles.logout}`}>🚪 Chiqish</button>
                </div>

                {/* Bottom Nav */}
                <Mobile />
            </div>

        </div>

    );
}

export default Profil;
