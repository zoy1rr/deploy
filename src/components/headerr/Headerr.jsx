import styles from './headerr.module.css';

function Headerr() {
    return (
        <div className={styles.topbar}>
            <div className={styles.container}>


                <div className={styles.chap_qism}>
                    <span>📞 Qo‘llab-quvvatlash: </span>
                    <a href="/support" className={styles.support}><i class="fa-solid fa-headset"></i></a>
                </div>



                <div className={styles.ong_qism}>
                    <select className={styles.til_tanlash}>
                        <option>O'zbekcha</option>
                        <option>Русский</option>
                        <option>English</option>
                    </select>
                    <a href="/login" className={styles.kirish}>Kirish</a>
                    <div className={styles.profil}>
                        <a href="/profil"><i class="fa-solid fa-user"></i> profil</a>
                    </div>


                    <div>
                        <button className={styles.moon_sun}><i class="fa-regular fa-moon"></i><i class="fa-solid fa-sun"></i></button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Headerr;
