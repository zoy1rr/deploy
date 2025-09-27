import styles from './biz.module.css'

function Biz() {
    return (
        <div className={styles.konteyner}>
            {/* Qahramon bo'lim (hero) */}
            <section className={styles.qahramon}>
                <div className={styles.qahramonKontent}>
                    <h1 className={styles.sarlavha}>Biz haqimizda</h1>
                    <p className={styles.taglavha}>
                        <strong>NextBuy</strong> — zamonaviy, xavfsiz va qulay onlayn do‘kon. Bizning maqsadimiz:
                        sifatli mahsulotni tez, ishonchli va adolatli narxda yetkazish.
                    </p>
                    <div className={styles.belgilar}>
                        <span>⚡ Tez yetkazib berish</span>
                        <span>🛡️ 100% kafolat</span>
                        <span>💳 Qulay to‘lov</span>
                        <span>📞 24/7 yordam</span>
                    </div>
                </div>
            </section>

            {/* Qisqacha raqamlar (statistika) */}
            <section className={styles.statlar}>
                <div className={styles.statItem}>
                    <h3>250k+</h3>
                    <p>Mamnun mijozlar</p>
                </div>
                <div className={styles.statItem}>
                    <h3>35k+</h3>
                    <p>Mahsulot assortimenti</p>
                </div>
                <div className={styles.statItem}>
                    <h3>120+</h3>
                    <p>Brend hamkorlar</p>
                </div>
                <div className={styles.statItem}>
                    <h3>24/7</h3>
                    <p>Qo‘llab-quvvatlash</p>
                </div>
            </section>

            {/* Missiya va qadriyatlar */}
            <section className={styles.kartalar}>
                <article className={styles.karta}>
                    <h2>Missiyamiz</h2>
                    <p>
                        Har bir foydalanuvchiga onlayn xaridni imkon qadar oson, tez va yoqimli qilish.
                        Biz uchun mijoz vaqti — eng katta qadriyat. Shuning uchun jarayonlarni
                        soddalashtiramiz, yetkazishni tezlashtiramiz, qaytarishni qulay qilamiz.
                    </p>
                </article>
                <article className={styles.karta}>
                    <h2>Qadriyatlarimiz</h2>
                    <ul className={styles.royxat}>
                        <li>💯 Sifat – brendga mos original mahsulot</li>
                        <li>🔒 Ishonch – xavfsiz to‘lov va ma’lumotlar himoyasi</li>
                        <li>🤝 Shaffoflik – yashirin to‘lovlarsiz narx</li>
                        <li>♻️ Barqarorlik – ekologik yechimlar</li>
                    </ul>
                </article>
                <article className={styles.karta}>
                    <h2>Tariximiz</h2>
                    <p>
                        NextBuy kichik jamoa sifatida yo‘lga chiqdi. Bugun esa minglab mijozlar ishonchini
                        qozongan, logistika va servis tizimi yo‘lga qo‘yilgan to‘liq ekotizimga aylandik.
                        Maqsadimiz – Markaziy Osiyodagi eng qulay e-commerce platformaga aylanish.
                    </p>
                </article>
            </section>

            {/* Mahsulotlar va toifalar */}
            <section className={styles.toifalar}>
                <h2>Bizda nimalar bor?</h2>
                <div className={styles.toifaGrid}>
                    <div className={styles.toifaKarta}>
                        <h3>📱 Smartfonlar & Gadjetlar</h3>
                        <p>Flagman va byudjet modellari, rasmiy kafolat bilan.</p>
                    </div>
                    <div className={styles.toifaKarta}>
                        <h3>🖥 Kompyuter texnikasi</h3>
                        <p>Noutbuk, monitor, printer, periferiyalar – ish va o‘yin uchun.</p>
                    </div>
                    <div className={styles.toifaKarta}>
                        <h3>🏠 Uy & Oshxona</h3>
                        <p>Mayda va katta maishiy texnika, ishonchli brendlar.</p>
                    </div>
                    <div className={styles.toifaKarta}>
                        <h3>🎧 Aksesuarlar</h3>
                        <p>Quloqchin, qopqoqlar, kabellar, zaryadlovchilar va boshqalar.</p>
                    </div>
                </div>
            </section>

            {/* Nega aynan biz? */}
            <section className={styles.afzalliklar}>
                <h2>Nega aynan NextBuy?</h2>
                <div className={styles.afzGrid}>
                    <div className={styles.afzItem}>
                        <h4>Tezkor logistika</h4>
                        <p>Shaharma-shahar kumush tezlikda yetkazib beramiz.</p>
                    </div>
                    <div className={styles.afzItem}>
                        <h4>Qulay to‘lov</h4>
                        <p>Karta, bo‘lib-bo‘lib to‘lov, naqd – barchasi bor.</p>
                    </div>
                    <div className={styles.afzItem}>
                        <h4>Real kafolat</h4>
                        <p>Rasmiy servis markazlari orqali ta’mirlash va almashtirish.</p>
                    </div>
                    <div className={styles.afzItem}>
                        <h4>Chegirmalar</h4>
                        <p>Haftalik aksiyalar, promo-kodlar va bonus tizimi.</p>
                    </div>
                </div>
            </section>

            {/* Jarayon: Buyurtmadan yetkazishgacha */}
            <section className={styles.qadamlar}>
                <h2>Buyurtma qanday ishlaydi?</h2>
                <div className={styles.qadamlarChiziq}>
                    <div className={styles.qadam}>
                        <span className={styles.raqam}>1</span>
                        <h5>Tanlang</h5>
                        <p>Mahsulotni qidiruv va filtrlardan foydalangan holda toping.</p>
                    </div>
                    <div className={styles.qadam}>
                        <span className={styles.raqam}>2</span>
                        <h5>Rasmiylashtiring</h5>
                        <p>To‘lov usulini belgilang, manzilingizni kiriting.</p>
                    </div>
                    <div className={styles.qadam}>
                        <span className={styles.raqam}>3</span>
                        <h5>Yetkazib berish</h5>
                        <p>Kuryer bilan qulay vaqtni kelishib, buyurtmani qabul qiling.</p>
                    </div>
                    <div className={styles.qadam}>
                        <span className={styles.raqam}>4</span>
                        <h5>Kafolat & Qo‘llab-quvvatlash</h5>
                        <p>Mahsulot bo‘yicha istalgan savolda biz yoningizdamiz.</p>
                    </div>
                </div>
            </section>

            {/* To'lov & Yetkazish, Kafolat, Qaytarish */}
            <section className={styles.tolovYetkazish}>
                <div className={styles.infoKarta}>
                    <h3>To‘lov usullari</h3>
                    <ul className={styles.royxat}>
                        <li>Karta orqali (UZCARD/HUMO/VISA/Mastercard)</li>
                        <li>Bo‘lib-bo‘lib to‘lov (hamkorlarimiz orqali)</li>
                        <li>Naqd to‘lov (ba’zi hududlarda)</li>
                    </ul>
                </div>
                <div className={styles.infoKarta}>
                    <h3>Yetkazib berish</h3>
                    <ul className={styles.royxat}>
                        <li>Shahar ichida tezkor (24 soatga qadar)</li>
                        <li>Respublika bo‘ylab 1–3 ish kuni</li>
                        <li>Buyurtma holatini onlayn kuzatish</li>
                    </ul>
                </div>
                <div className={styles.infoKarta}>
                    <h3>Kafolat & Qaytarish</h3>
                    <ul className={styles.royxat}>
                        <li>Rasmiy kafolat talonlari</li>
                        <li>7 kun ichida hech qanday savolsiz qaytarish*</li>
                        <li>Servis markazlari orqali tezkor yordam</li>
                    </ul>
                    <p className={styles.eslatma}>*Foydalanish qoidalariga muvofiq</p>
                </div>
            </section>

            {/* Ekologiya va barqarorlik */}
            <section className={styles.ekologiya}>
                <h2>Barqarorlik tashabbuslari</h2>
                <p>
                    Qadoqlashda qayta ishlanadigan materiallardan foydalanamiz, yetkazishda
                    marshrutlarni optimallashtirib, karbon izni kamaytiramiz. Eskirgan qurilmalarni
                    qayta topshirish dasturini yo‘lga qo‘ydik.
                </p>
            </section>

            {/* Jamoa bo'limi (mini) */}
            <section className={styles.jamoa}>
                <h2>Jamoamiz</h2>
                <p>
                    Biz – logistika, servis, qo‘llab-quvvatlash, IT va dizayn bo‘limlaridan iborat
                    fidoyi mutaxassislarmiz. Har bir bo‘lim mijoz tajribasini yaxshilashga xizmat qiladi.
                </p>
                <div className={styles.jamoaSet}>
                    <div className={styles.jamoaChip}>Logistika</div>
                    <div className={styles.jamoaChip}>Qo‘llab-quvvatlash</div>
                    <div className={styles.jamoaChip}>Servis</div>
                    <div className={styles.jamoaChip}>IT</div>
                    <div className={styles.jamoaChip}>Dizayn</div>
                    <div className={styles.jamoaChip}>Marketing</div>
                </div>
            </section>

            {/* Mijozlar izohlari */}
            <section className={styles.izohlar}>
                <h2>Mijozlar fikri</h2>
                <div className={styles.izohGrid}>
                    <blockquote className={styles.izoh}>
                        “Buyurtma juda tez keldi, hammasi original va sifatli. Raxmat, NextBuy!”
                        <cite> — Dilshod A.</cite>
                    </blockquote>
                    <blockquote className={styles.izoh}>
                        “Qo‘llab-quvvatlash chiroyli ishlaydi, savollarimga kechayu-kunduz javob oldim.”
                        <cite> — Muhlisa N.</cite>
                    </blockquote>
                    <blockquote className={styles.izoh}>
                        “Bo‘lib-bo‘lib to‘lov menga juda qulay bo‘ldi, tavsiya qilaman.”
                        <cite> — Sirojiddin K.</cite>
                    </blockquote>
                </div>
            </section>

            {/* FAQ */}
            <section className={styles.savolJavob}>
                <h2>Ko‘p so‘raladigan savollar</h2>
                <div className={styles.faqItem}>
                    <h4>Qanday to‘lov usullarini qabul qilasiz?</h4>
                    <p>UZCARD, HUMO, VISA/Mastercard, bo‘lib-bo‘lib to‘lov va ayrim hududlarda naqd.</p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Yetkazib berish qancha vaqt oladi?</h4>
                    <p>Shahar ichida odatda 24 soat, viloyatlarga 1–3 ish kuni.</p>
                </div>
                <div className={styles.faqItem}>
                    <h4>Mahsulotni qaytarish shartlari qanday?</h4>
                    <p>7 kun ichida, qadoqlanishi va to‘liq butligi saqlangan bo‘lsa, qaytarish mumkin.</p>
                </div>
            </section>

            {/* CTA */}
            <section className={styles.cta}>
                <h2>Savolingiz bormi?</h2>
                <p>Biz doimo bog‘lanishga tayyormiz. Murojaat qoldiring — darhol javob beramiz.</p>
                <a className={styles.ctaTugma} href="/kontakt">Biz bilan bog‘lanish</a>
            </section>
        </div>
    )
}

export default Biz
