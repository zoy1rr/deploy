import styles from './adminlogin.module.css'

function Adminlogin() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Admin Login</h1>
                <p className={styles.subtitle}>Enter your credentials to access the dashboard</p>

                <form className={styles.form} autoComplete="off">
                    <div className={styles.inputGroup}>
                        <input type="email" placeholder="Email" required className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Password" required className={styles.input} />
                    </div>

                    <div className={styles.options}>
                        <label className={styles.checkbox}>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#" className={styles.forgot}>Forgot password?</a>
                    </div>

                    <button type="submit" className={styles.button}>Sign In</button>
                </form>

                <div className={styles.footer}>
                    <p>Need help? <a href="#" className={styles.link}>Contact support</a></p>
                </div>
            </div>

            <div className={styles.blobs}>
                <div className={styles.blobOne}></div>
                <div className={styles.blobTwo}></div>
            </div>
        </div>
    )
}

export default Adminlogin
