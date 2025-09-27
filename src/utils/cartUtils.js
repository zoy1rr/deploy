export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Yangi item qo‘shish uchun ID generatsiyasi
export const addToCart = (item) => {
  const cart = getCart();
  const newItem = { ...item, cartId: Date.now() }; // uniq ID
  cart.push(newItem);
  saveCart(cart);
  return newItem;
};
