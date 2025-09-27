import { Link, useLocation } from 'react-router-dom';
import styles from './mobile.module.css';

function Mobile() {
    const location = useLocation(); // joriy path

    return (
        <div className={styles.bg}>
            <div className={styles.menu}>

                <div className={`${styles.menu_card} ${location.pathname === '/' ? styles.active : ''}`}>
                    <Link to="/">
                        <i className="fa-regular fa-house"></i>
                        <p>Bosh sahifa</p>
                    </Link>
                </div>

                <div className={`${styles.menu_card} ${location.pathname === '/savat' ? styles.active : ''}`}>
                    <Link to="/savat">
                        <i className="fa-solid fa-bag-shopping"></i>
                        <p>Savat</p>
                    </Link>
                </div>

                <div className={`${styles.menu_card} ${location.pathname === '/profil' ? styles.active : ''}`}>
                    <Link to="/profil">
                        <i className="fa-regular fa-user"></i>
                        <p>Profil</p>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Mobile;
