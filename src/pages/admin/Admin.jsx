import { useState, useEffect, useRef } from "react";
import styles from "./admin.module.css";

// LocalStorage bilan ishlash
export const getCart = () => JSON.parse(localStorage.getItem("cart")) || [];
export const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));
export const getOrders = () => JSON.parse(localStorage.getItem("orders")) || [];
export const saveOrders = (orders) => localStorage.setItem("orders", JSON.stringify(orders));
export const getSupportChat = () => JSON.parse(localStorage.getItem("supportChat")) || [];
export const saveSupportChat = (chat) => localStorage.setItem("supportChat", JSON.stringify(chat));

function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [supportChat, setSupportChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supportMessage, setSupportMessage] = useState("");
  const chatEndRef = useRef(null);

  // Mahsulot qo‘shish/edit
  const [newProduct, setNewProduct] = useState({
    name: "", kategoriya: "", narx: "", img: "",
    kichikrasm1: "", kichikrasm2: "", kichikrasm3: ""
  });
  const [editProduct, setEditProduct] = useState(null);

  // Data fetch
  useEffect(() => {
    Promise.all([
      fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/json").then(res => res.json()),
      fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop").then(res => res.json()),
    ]).then(([usersData, productsData]) => {
      setUsers(usersData);
      setProducts(productsData);
      setOrders(getCart());
      setSupportChat(getSupportChat());
      setLoading(false);
    });
  }, []);

  // Scroll chat oxiriga
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [supportChat]);

  // User delete
  const deleteUser = async (id) => {
    await fetch(`https://68a1b26f6f8c17b8f5da7d81.mockapi.io/json/${id}`, { method: "DELETE" });
    setUsers(users.filter(u => u.id !== id));
  };

  // Mahsulot qo‘shish
  const addProduct = async () => {
    if (
      !newProduct.name || !newProduct.kategoriya || !newProduct.narx ||
      !newProduct.img || !newProduct.kichikrasm1 || !newProduct.kichikrasm2 || !newProduct.kichikrasm3
    ) return alert("Iltimos, barcha maydonlarni to‘ldiring!");
    const res = await fetch("https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    setProducts([...products, data]);
    setNewProduct({ name: "", kategoriya: "", narx: "", img: "", kichikrasm1: "", kichikrasm2: "", kichikrasm3: "" });
  };

  // Mahsulot delete/edit
  const deleteProduct = async (id) => {
    await fetch(`https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop/${id}`, { method: "DELETE" });
    setProducts(products.filter(p => p.id !== id));
  };
  const startEditProduct = (product) => setEditProduct(product);
  const saveEditProduct = async () => {
    if (!editProduct) return;
    const res = await fetch(`https://68a1b26f6f8c17b8f5da7d81.mockapi.io/shop/${editProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editProduct),
    });
    const data = await res.json();
    setProducts(products.map(p => p.id === data.id ? data : p));
    setEditProduct(null);
  };

  // Order status
  const updateOrderStatus = (index, status) => {
    const updatedOrders = orders.map((o, i) => i === index ? { ...o, status } : o);
    if (status === "Bekor qilindi") {
      const cart = getCart();
      const order = updatedOrders[index];
      const filteredCart = cart.filter(
        c => !(c.name === order.name && c.color === order.color && c.size === order.size && c.price === order.price)
      );
      saveCart(filteredCart);
      localStorage.setItem("cart_updated", Date.now());
    }
    setOrders(updatedOrders);
    saveOrders(updatedOrders);
  };

  // Support chat funksiyalari
  const sendSupportMessage = () => {
    if (!supportMessage.trim()) return;
    const newMsg = {
      id: Date.now(),
      text: supportMessage,
      user: "admin",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    const updatedChat = [...supportChat, newMsg];
    setSupportChat(updatedChat);
    saveSupportChat(updatedChat);
    setSupportMessage("");
  };
  const handleKeyPress = (e) => { if (e.key === "Enter") sendSupportMessage(); }
  const clearSupportChat = () => { localStorage.removeItem("supportChat"); setSupportChat([]); }

  return (
    <div className={styles.admin2}>
      <div className={styles.container}>
        <div className={styles.admin}>
          <aside className={styles.sidebar}>
            <h2>Admin Panel</h2>
            <ul>
              <li className={activeTab === "users" ? styles.active : ""} onClick={() => setActiveTab("users")}>👥 Foydalanuvchilar</li>
              <li className={activeTab === "products" ? styles.active : ""} onClick={() => setActiveTab("products")}>🛍 Mahsulotlar</li>
              <li className={activeTab === "orders" ? styles.active : ""} onClick={() => setActiveTab("orders")}>📦 Buyurtmalar</li>
              <li className={activeTab === "support" ? styles.active : ""} onClick={() => setActiveTab("support")}>💬 Support</li>
            </ul>
          </aside>

          <main className={styles.content}>
            {loading ? <p>Yuklanmoqda...</p> : (
              <>
                {activeTab === "users" && (
                  <div>
                    <h3>Foydalanuvchilar</h3>
                    <table>
                      <thead>
                        <tr><th>ID</th><th>Ism</th><th>Raqam</th><th>Gmail</th><th>Amallar</th></tr>
                      </thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.Ism}</td>
                            <td>{u.Raqam}</td>
                            <td>{u.Gmail}</td>
                            <td>
                              <button onClick={() => deleteUser(u.id)} className={styles.deleteBtn}>O‘chirish</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "products" && (
                  <div>
                    <h3>Mahsulotlar</h3>
                    <div className={styles.addBox}>
                      <input type="text" placeholder="Mahsulot nomi" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} />
                      <input type="text" placeholder="Kategoriya" value={newProduct.kategoriya} onChange={e => setNewProduct({ ...newProduct, kategoriya: e.target.value })} />
                      <input type="number" placeholder="Narx" value={newProduct.narx} onChange={e => setNewProduct({ ...newProduct, narx: e.target.value })} />
                      <input type="text" placeholder="Asosiy rasm URL" value={newProduct.img} onChange={e => setNewProduct({ ...newProduct, img: e.target.value })} />
                      <input type="text" placeholder="Kichik rasm 1 URL" value={newProduct.kichikrasm1} onChange={e => setNewProduct({ ...newProduct, kichikrasm1: e.target.value })} />
                      <input type="text" placeholder="Kichik rasm 2 URL" value={newProduct.kichikrasm2} onChange={e => setNewProduct({ ...newProduct, kichikrasm2: e.target.value })} />
                      <input type="text" placeholder="Kichik rasm 3 URL" value={newProduct.kichikrasm3} onChange={e => setNewProduct({ ...newProduct, kichikrasm3: e.target.value })} />
                      <button onClick={addProduct}>➕ Qo‘shish</button>
                    </div>

                    {editProduct && (
                      <div className={styles.editBox}>
                        <h4>Tahrirlash</h4>
                        <input type="text" value={editProduct.name} onChange={e => setEditProduct({ ...editProduct, name: e.target.value })} />
                        <input type="text" value={editProduct.kategoriya} onChange={e => setEditProduct({ ...editProduct, kategoriya: e.target.value })} />
                        <input type="number" value={editProduct.narx} onChange={e => setEditProduct({ ...editProduct, narx: e.target.value })} />
                        <input type="text" value={editProduct.img} onChange={e => setEditProduct({ ...editProduct, img: e.target.value })} />
                        <button onClick={saveEditProduct}>💾 Saqlash</button>
                        <button onClick={() => setEditProduct(null)}>❌ Bekor</button>
                      </div>
                    )}

                    <table>
                      <thead><tr><th>ID</th><th>Rasmi</th><th>Nomi</th><th>Kategoriya</th><th>Narx</th><th>Amallar</th></tr></thead>
                      <tbody>
                        {products.map(p => (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td><img src={p.img} alt={p.name} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} /></td>
                            <td>{p.name}</td>
                            <td>{p.kategoriya}</td>
                            <td>{p.narx} so‘m</td>
                            <td>
                              <button onClick={() => startEditProduct(p)}>✏️</button>
                              <button onClick={() => deleteProduct(p.id)} className={styles.deleteBtn}>🗑</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {activeTab === "orders" && (
                  <div>
                    <h3>Buyurtmalar</h3>
                    {orders.length === 0 ? <p>Buyurtmalar mavjud emas</p> : (
                      <table>
                        <thead><tr><th>ID</th><th>Nomi</th><th>Rang</th><th>O‘lcham</th><th>Narx</th><th>Status</th><th>Amallar</th></tr></thead>
                        <tbody>
                          {orders.map((o, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td><td>{o.name}</td><td>{o.color}</td><td>{o.size}</td><td>{o.price} so‘m</td>
                              <td>{o.status || "Yangi"}</td>
                              <td>
                                <button onClick={() => updateOrderStatus(index, "Tasdiqlandi")}>✅ Tasdiqlash</button>
                                <button onClick={() => updateOrderStatus(index, "Bekor qilindi")}>❌ Bekor qilish</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                )}

                {activeTab === "support" && (
                  <div className={styles.supportContainer}>
                    {/* Chat bo'limi sarlavhasi */}
                    <h3 className={styles.supportHeader}>Foydalanuvchilar bilan Chat</h3>

                    {/* Chat oynasi */}
                    <div className={styles.chatBox}>
                      {supportChat.length === 0 ? (
                        <p className={styles.noMessages}>Hech qanday yozishma yo'q</p>
                      ) : (
                        supportChat.map((msg) => (
                          <div
                            key={msg.id}
                            className={`${styles.message} ${msg.user === "admin" ? styles.adminMessage : styles.userMessage
                              }`}
                          >
                            <span className={styles.messageText}>{msg.text}</span>
                            <span className={styles.messageTime}>{msg.time}</span>
                          </div>
                        ))
                      )}
                      <div ref={chatEndRef} className={styles.chatEndRef} />
                    </div>

                    {/* Xabar yuborish va tozalash bo'limi */}
                    <div className={styles.inputContainer}>
                      <input
                        type="text"
                        className={styles.supportInput}
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Xabar yozing..."
                      />
                      <button
                        onClick={sendSupportMessage}
                        className={styles.sendButton}
                      >
                        Jo‘natish
                      </button>
                      <button
                        onClick={clearSupportChat}
                        className={`${styles.clearButton} ${styles.clearBtn}`}
                      >
                        Tozalash
                      </button>
                    </div>
                  </div>
                )}

              </>
            )}
          </main>
        </div></div>
    </div>
  );
}

export default Admin;
