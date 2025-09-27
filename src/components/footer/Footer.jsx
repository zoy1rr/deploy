import styles from './footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                {/* Logo va ta’rif */}
                <div className={styles.section}>
                    <h2 className={styles.logo}>NextBuy</h2>
                    <p className={styles.text}>
                        NextBuy — zamonaviy texnologiyalar va sifatli xizmatlar manzili.
                    </p>
                </div>


                <div className={styles.section}>
                    <h3 className={styles.heading}>Havolalar</h3>
                    <ul className={styles.list}>
                        <li><a href="/">Bosh sahifa</a></li>
                        <li><a href="/biz">Biz haqimizda</a></li>
                        <li><a href="/contact">Aloqa</a></li>
                        <li><a href="/shop">Do‘kon</a></li>
                    </ul>
                </div>

                {/* Kontaktlar */}
                <div className={styles.section}>
                    <h3 className={styles.heading}>Bog‘lanish</h3>
                    <p>📞 +998 95 636 12 48</p>
                    <p>✉️ zoyir9500@gmail.com</p>
                    <div className={styles.socials}>
                        <a href="https://t.me/Z_ruziqulovv" className={styles.social}>🌐</a>
                        <a href="#" className={styles.social}>🐦</a>
                        <a href="#" className={styles.social}>📸</a>
                    </div>
                </div>

            </div>

            <div className={styles.bottom}>
                <p>© {new Date().getFullYear()} NextBuy. Barcha huquqlar himoyalangan.</p>
            </div>
        </footer>
    );
}

export default Footer;