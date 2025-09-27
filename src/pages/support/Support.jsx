import { useState, useEffect, useRef } from "react";
import styles from "./Support.module.css";
import Header from "../../components/header/Header";
Header

function Support() {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  // LocalStorage'dan chatni yuklash
  useEffect(() => {
    const storedChat = JSON.parse(localStorage.getItem("supportChat")) || [];
    setChat(storedChat);
  }, []);

  // Scroll oxiriga
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    const newMsg = { text: message, sender: "user", time: new Date().toLocaleTimeString() };
    const updatedChat = [...chat, newMsg];
    setChat(updatedChat);
    localStorage.setItem("supportChat", JSON.stringify(updatedChat));
    setMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.support}>
      <h2 className={styles.header}>Support Chat</h2>
      
      <div className={styles.chatWindow}>
        {chat.length === 0 && <p className={styles.noMessages}>Hech qanday xabar yo'q</p>}
        {chat.map((c, idx) => (
          <div 
            key={idx} 
            className={`${styles.message} ${c.sender === "user" ? styles.user : styles.admin}`}
          >
            <p className={styles.messageText}>{c.text}</p>
            <span className={styles.messageTime}>{c.time}</span>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className={styles.inputBox}>
        <input 
          type="text" 
          placeholder="Xabar yozing..." 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>Yuborish</button>
      </div>
    </div>
    </div>
    </div>
  );
}

export default Support;
