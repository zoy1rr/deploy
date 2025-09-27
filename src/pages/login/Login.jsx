import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./login.module.css";
import Mobile from "../../components/mobile/Mobile";

function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [users, setUsers] = useState([]);
  const [loginData, setLoginData] = useState({
    gmail: "",
    parol: "",
  });

  const navigate = useNavigate();

  // MockAPI dan foydalanuvchilarni olish
  useEffect(() => {
    fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/json")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => {
        toast.error("Foydalanuvchilarni olib kelib bo'lmadi");
      });
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = loginData.gmail.trim();
    const pass = loginData.parol;

    if (!email || !pass) {
      toast.error("Iltimos, hamma maydonlarni to'ldiring");
      return;
    }

    // mockapi dagi Gmail va Parol bilan tekshirish
    const foundUser = users.find(
      (u) => u.Gmail?.toLowerCase() === email.toLowerCase() && u.Parol === pass
    );

    if (foundUser) {
      toast.success("Muvaffaqiyatli kirdingiz ✅");
      localStorage.setItem("user", JSON.stringify(foundUser)); // foydalanuvchini saqlash
      setTimeout(() => navigate("/"), 1200); // kichik kutishdan keyin bosh sahifaga o'tish
    } else {
      toast.error("Email yoki parol noto‘g‘ri ❌");
    }
  };

  return (
    <div className={styles.konteyner}>
      <div className={styles.karta}>
        <h1 className={styles.sarlavha}>Kirish</h1>
        <p className={styles.tagline}>
          Hisobingizga kiring va xaridni davom ettiring
        </p>

        <form className={styles.forma} onSubmit={handleSubmit}>
          {/* Gmail */}
          <div className={styles.maydon}>
            <label className={styles.yorliq} htmlFor="gmail">
              Email (Gmail)
            </label>
            <input
              id="gmail"
              name="gmail"
              type="email"
              placeholder="example@mail.com"
              className={styles.kiritish}
              value={loginData.gmail}
              onChange={handleChange}
              autoComplete="username"
              required
            />
          </div>

          {/* Parol */}
          <div className={styles.maydon}>
            <label className={styles.yorliq} htmlFor="parol">
              Parol
            </label>
            <div className={styles.parolQuti}>
              <input
                id="parol"
                name="parol"
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className={styles.kiritish}
                value={loginData.parol}
                onChange={handleChange}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className={styles.parolToggle}
                onClick={() => setShowPwd((v) => !v)}
                aria-label={showPwd ? "Parolni yashirish" : "Parolni ko‘rsatish"}
              >
                {showPwd ? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}
              </button>
            </div>
          </div>

          {/* Pastki qator */}
          <div className={styles.pastkiQator}>
            <label className={styles.eslabQol}>
              <input type="checkbox" className={styles.aaa}/> Eslab qol
            </label>
            <a href="#" className={styles.unutdingmi}>
              Parolni unutdingizmi?
            </a>
          </div>

          <button className={styles.tugma} type="submit">
            Kirish
          </button>
        </form>

        {/* Ajratkich */}
        <div className={styles.ajratkich}>
          <span></span>
          <p>yoki</p>
          <span></span>
        </div>

        {/* Ijtimoiy kirish */}
        <div className={styles.sociallar}>
          <button className={styles.social}>
            <span className={styles.socialIkon}>G</span> Google bilan
          </button>
          <button className={styles.social}>
            <span className={styles.socialIkon}></span> Apple bilan
          </button>
        </div>

        <p className={styles.pastMatn}>
          Hisobingiz yo‘qmi?{" "}
          <a href="/register" className={styles.royxatdan}>
            Ro‘yxatdan o‘ting
          </a>
        </p>
      </div>

      <Mobile />

      {/* Toastlar uchun */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default Login;
