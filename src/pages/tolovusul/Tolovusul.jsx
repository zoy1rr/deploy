import { useState } from 'react';
import styles from './tolovusul.module.css';

function Tolovusul() {
    const [method, setMethod] = useState('karta'); // karta | payme | click | uzum | naqd
    const [card, setCard] = useState({
        holder: '',
        number: '',
        expiry: '',
        cvc: '',
    });
    const [delivery, setDelivery] = useState({
        fullName: '',
        phone: '',
        address: '',
        note: '',
    });
    const [agree, setAgree] = useState(false);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState({ type: '', text: '' });

    const paymentMethods = [
        { id: 'karta', title: 'Karta bilan to‘lov (Uzcard/Humo/Visa)', desc: 'Xavfsiz va tezkor karta to‘lovi.' },
        { id: 'payme', title: 'Payme', desc: 'Payme ilovasi orqali to‘lov.' },
        { id: 'click', title: 'Click', desc: 'Click ilovasi orqali to‘lov.' },
        { id: 'uzum', title: 'Uzum Bank', desc: 'Uzum orqali to‘lov / bo‘lib-bo‘lib.' },
        { id: 'naqd', title: 'Naqd yoki Kuryerga', desc: 'Yetkazilganda naqd yoki kartadan to‘lash.' },
    ];

    const formatCardNumber = (v) =>
        v.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

    const formatExpiry = (v) =>
        v.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(?=\d)/, '$1/');

    const handlePay = (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });

        // Minimal tekshiruvlar
        if (!agree) {
            setMsg({ type: 'warning', text: 'Davom etishdan oldin shartlarga rozilik bering.' });
            return;
        }

        if (method === 'karta') {
            const clearNum = card.number.replace(/\s/g, '');
            if (!card.holder || clearNum.length !== 16 || card.expiry.length !== 5 || card.cvc.length < 3) {
                setMsg({ type: 'error', text: 'Karta maʼlumotlarini to‘liq va to‘g‘ri kiriting.' });
                return;
            }
        }

        if (method === 'naqd') {
            if (!delivery.fullName || !delivery.phone || !delivery.address) {
                setMsg({ type: 'error', text: 'Ism, telefon va manzilni to‘liq kiriting.' });
                return;
            }
        }

        // Demo jarayon (API o‘rniga)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            const orderSummary = {
                method,
                ...(method === 'karta' && { last4: card.number.slice(-4) }),
                ...(method === 'naqd' && { address: delivery.address }),
            };
            setMsg({
                type: 'success',
                text:
                    method === 'karta'
                        ? `To‘lov muvaffaqiyatli! Karta oxiri: ${orderSummary.last4}`
                        : method === 'naqd'
                            ? `Buyurtma qabul qilindi! Manzil: ${orderSummary.address}`
                            : `Ilovaga yo‘naltirilasiz: ${method.toUpperCase()} — ilovada to‘lovni tasdiqlang.`,
            });
        }, 900);
    };

    const renderMethodForm = () => {
        if (method === 'karta') {
            return (
                <div className={styles.section}>
                    <div className={styles.grid2}>
                        <div className={styles.field}>
                            <label>Egasi (karta ustidagi ism)</label>
                            <input
                                type="text"
                                placeholder="JASUR SH."
                                value={card.holder}
                                onChange={(e) => setCard({ ...card, holder: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Karta raqami</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="8600 1234 5678 9012"
                                value={card.number}
                                onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
                                maxLength={19}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Muddati (MM/YY)</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="05/27"
                                value={card.expiry}
                                onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                                maxLength={5}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>CVC</label>
                            <input
                                type="password"
                                inputMode="numeric"
                                placeholder="***"
                                value={card.cvc}
                                onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                                maxLength={4}
                            />
                        </div>
                    </div>

                    <div className={styles.cardPreview}>
                        <div className={styles.cardTop}>
                            <span className={styles.chip} />
                            <span className={styles.brand}>NB Pay</span>
                        </div>
                        <div className={styles.cardNumber}>
                            {card.number || '#### #### #### ####'}
                        </div>
                        <div className={styles.cardBottom}>
                            <div>
                                <div className={styles.labelSm}>HOLDER</div>
                                <div className={styles.valueSm}>{card.holder || 'JASUR SH'}</div>
                            </div>
                            <div>
                                <div className={styles.labelSm}>EXP</div>
                                <div className={styles.valueSm}>{card.expiry || 'MM/YY'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (method === 'naqd') {
            return (
                <div className={styles.section}>
                    <div className={styles.grid2}>
                        <div className={styles.field}>
                            <label>To‘liq ism-familiya</label>
                            <input
                                type="text"
                                placeholder="Jasur Shodmonov"
                                value={delivery.fullName}
                                onChange={(e) => setDelivery({ ...delivery, fullName: e.target.value })}
                            />
                        </div>
                        <div className={styles.field}>
                            <label>Telefon raqam</label>
                            <input
                                type="tel"
                                placeholder="+998 90 123 45 67"
                                value={delivery.phone}
                                onChange={(e) => setDelivery({ ...delivery, phone: e.target.value })}
                            />
                        </div>
                        <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                            <label>Manzil</label>
                            <input
                                type="text"
                                placeholder="Toshkent, Chilonzor, 12-kvartal, 34-uy"
                                value={delivery.address}
                                onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
                            />
                        </div>
                        <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                            <label>Eslatma (ixtiyoriy)</label>
                            <textarea
                                rows="3"
                                placeholder="Kuryer kelganda telefon qiling."
                                value={delivery.note}
                                onChange={(e) => setDelivery({ ...delivery, note: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className={styles.infoBox}>
                        Yetkazilganda naqd yoki kuryer terminali orqali kartadan to‘lash mumkin.
                    </div>
                </div>
            );
        }

        // Payme / Click / Uzum
        return (
            <div className={styles.section}>
                <div className={styles.infoBox}>
                    Siz <b>{method.toUpperCase()}</b> orqali to‘lovni tanladingiz. “To‘lovni amalga oshirish” tugmasini
                    bosgach, tegishli ilovaga yo‘naltirilasiz va to‘lovni tasdiqlaysiz.
                </div>
            </div>
        );
    };

    return (
        <div className={styles.wrap}>
            <h1 className={styles.title}>To‘lov usullari</h1>

            <div className={styles.layout}>
                <div className={styles.left}>
                    <div className={styles.methods}>
                        {paymentMethods.map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setMethod(m.id)}
                                className={`${styles.method} ${method === m.id ? styles.active : ''}`}
                                type="button"
                            >
                                <div className={styles.methodHeader}>
                                    <div className={styles.radioOuter}>
                                        <span className={`${styles.radioDot} ${method === m.id ? styles.dotActive : ''}`} />
                                    </div>
                                    <div>
                                        <div className={styles.methodTitle}>{m.title}</div>
                                        <div className={styles.methodDesc}>{m.desc}</div>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handlePay} className={styles.form}>
                        {renderMethodForm()}

                        <div className={styles.agreeRow}>
                            <label className={styles.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                />
                                <span> Men <u>oferta shartlari</u> va <u>maxfiylik siyosati</u>ga roziman.</span>
                            </label>
                        </div>

                        {msg.text && (
                            <div
                                className={`${styles.message} ${msg.type === 'success'
                                        ? styles.success
                                        : msg.type === 'error'
                                            ? styles.error
                                            : msg.type === 'warning'
                                                ? styles.warning
                                                : styles.info
                                    }`}
                            >
                                {msg.text}
                            </div>
                        )}

                        <button className={styles.payBtn} disabled={loading}>
                            {loading ? 'Yuklanmoqda…' : 'To‘lovni amalga oshirish'}
                        </button>
                    </form>
                </div>

                <aside className={styles.right}>
                    <div className={styles.summaryCard}>
                        <div className={styles.summaryTitle}>Buyurtma qisqacha</div>
                        <div className={styles.summaryRow}>
                            <span>Mahsulotlar</span>
                            <span>3 dona</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Oraliq summa</span>
                            <span>1 250 000 so‘m</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Yetkazib berish</span>
                            <span>0 so‘m</span>
                        </div>
                        <div className={styles.divider} />
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Jami</span>
                            <span>1 250 000 so‘m</span>
                        </div>
                        <div className={styles.microNote}>
                            Qo‘llab-quvvatlanadigan kartalar: Uzcard, Humo, Visa. Xavfsiz shifrlash qo‘llaniladi.
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Tolovusul;
