import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./register.module.css";

const API_URL = "https://68a1b26f6f8c17b8f5da7d81.mockapi.io/json";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        Ism: "",
        Raqam: "",
        Gmail: "",
        Parol: "",
        tekshirParol: ""
    });
    const [loading, setLoading] = useState(false);

    // inputlarni boshqarish
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (form.Parol !== form.tekshirParol) {
            toast.error("❌ Parollar mos emas");
            setLoading(false);
            return;
        }

        try {
            // mavjud userlarni olish
            const res = await fetch(API_URL);
            const users = await res.json();

            // email yoki raqam allaqachon mavjudmi tekshirish
            const exists = users.find(
                (u) => u.Gmail === form.Gmail || u.Raqam === form.Raqam
            );
            if (exists) {
                toast.error("❌ Bu Gmail yoki telefon raqam allaqachon ro‘yxatdan o‘tgan");
                setLoading(false);
                return;
            }

            // yangi user qo‘shish
            await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            toast.success("✅ Muvaffaqiyatli ro‘yxatdan o‘tdingiz! Login qiling...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            console.error(err);
            toast.error("⚠️ Xatolik yuz berdi, qayta urinib ko‘ring");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
            />

            <div className={styles.formContainer}>
                <h2 className={styles.title}>Ro‘yxatdan o‘tish</h2>

                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            id="name"
                            name="Ism"
                            value={form.Ism}
                            onChange={handleChange}
                            required
                            placeholder="... "
                        />
                        <label htmlFor="name">Ism</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            id="phone"
                            name="Raqam"
                            value={form.Raqam}
                            onChange={handleChange}
                            required
                            placeholder="... "
                        />
                        <label htmlFor="phone">Telefon raqam</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            id="email"
                            name="Gmail"
                            value={form.Gmail}
                            onChange={handleChange}
                            required
                            placeholder="... "
                        />
                        <label htmlFor="email">Gmail</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="password"
                            name="Parol"
                            value={form.Parol}
                            onChange={handleChange}
                            required
                            placeholder="... "
                        />
                        <label htmlFor="password">Parol</label>
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="tekshirParol"
                            value={form.tekshirParol}
                            onChange={handleChange}
                            required
                            placeholder="... "
                        />
                        <label htmlFor="repeatPassword">Parolni takrorlang</label>
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "⏳ Yuklanmoqda..." : "🚀 Ro‘yxatdan o‘tish"}
                    </button>
                </form>

                <p className={styles.switchText}>
                    Akkountingiz bormi?{" "}
                    <Link to="/login" className={styles.switchLink}>
                        Login qiling
                        
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
