/*язык */
const fullTranslations = {
  ru: {
    "btn-catalog": "КАТАЛОГ",
    "btn-news": "НОВОСТИ",
    "btn-shop": "МАГАЗИН",
    "btn-cart": "КОРЗИНА",
    "catalog-title": "КАТАЛОГ",
    "comments-title": "КОММЕНТАРИИ",
    "link-new": "НОВИНКИ",
    "link-sale": "СКИДКИ",
    "link-home": "ТОВАРЫ ДЛЯ ДОМА",
    "link-stationery": "КАНЦТОВАРЫ",
    "link-books": "КНИГИ",
    "link-team": "НАША КОМАНДА",
    "link-news": "НОВОСТИ",
    "link-merch": "МЕРЧ",
    "link-cosmetics": "КОСМЕТИКА",
    "link-clothes": "ОДЕЖДА",
    "comment-placeholder-name": "Ваше имя",
    "comment-placeholder-text": "Напишите комментарий...",
    "comment-btn": "ОТПРАВИТЬ",
    "empty-comments": "Пока нет комментариев. Будьте первым! ✨",
    "main-title": "Добро пожаловать!",
    "main-text":
      "Добро пожаловать на наш сайт, где игрушка может заказать себе товар и мы его доставим!",
    "btn-main": "Перейти",
    "lang-ru": "RUS",
    "lang-chi": "CHI",
    "lang-en": "ENG",
  },
  chi: {
    "btn-catalog": "目录",
    "btn-news": "新闻",
    "btn-shop": "商店",
    "btn-cart": "大车",
    "catalog-title": "目录",
    "comments-title": "注释",
    "link-new": "新品",
    "link-sale": "折扣",
    "link-home": "家居用品",
    "link-stationery": "文具",
    "link-books": "书籍",
    "link-team": "我们的团队",
    "link-news": "新闻",
    "link-merch": "商品",
    "link-cosmetics": "化妆品",
    "link-clothes": "衣服",
    "comment-placeholder-name": "您的名字",
    "comment-placeholder-text": "写评论...",
    "comment-btn": "发送",
    "empty-comments": "还没有评论。成为第一个！",
    "main-title": "欢迎！",
    "main-text":
      "欢迎来到我们的网站，在这里玩具可以为自己订购商品，我们会送货上门！",
    "btn-main": "去",
    "lang-ru": "RUS",
    "lang-chi": "CHI",
    "lang-en": "ENG",
  },
  en: {
    "btn-catalog": "CATALOG",
    "btn-news": "NEWS",
    "btn-shop": "SHOP",
    "btn-cart": "CART",
    "catalog-title": "CATALOG",
    "comments-title": "COMMENTS",
    "link-new": "NEW",
    "link-sale": "SALE",
    "link-home": "HOME GOODS",
    "link-stationery": "STATIONERY",
    "link-books": "BOOKS",
    "link-team": "OUR TEAM",
    "link-news": "NEWS",
    "link-merch": "MERCH",
    "link-cosmetics": "COSMETICS",
    "link-clothes": "CLOTHES",
    "comment-placeholder-name": "Your name",
    "comment-placeholder-text": "Write a comment...",
    "comment-btn": "SEND",
    "empty-comments": "No comments yet. Be the first! ",
    "main-title": "Welcome!",
    "main-text":
      "Welcome to our website, where a toy can order goods for itself and we will deliver them!",
    "btn-main": "Go",
    "lang-ru": "RUS",
    "lang-chi": "CHI",
    "lang-en": "ENG",
  },
};

function setFullLanguage(lang) {
  const words = fullTranslations[lang];
  if (!words) return;

  const catalogBtn = document.querySelector('.btn-main[href="inhoues3.html"]');
  const newsBtn = document.querySelector('.btn-main[href="new4.html"]');
  if (catalogBtn) catalogBtn.textContent = words["btn-catalog"];
  if (newsBtn) newsBtn.textContent = words["btn-news"];

  const catalogTitle = document.querySelector(".links-title");
  const commentsTitle = document.querySelector(".comments-title");
  if (catalogTitle) catalogTitle.textContent = words["catalog-title"];
  if (commentsTitle) commentsTitle.textContent = words["comments-title"];

  const linkBtns = document.querySelectorAll(".link-btn");
  const linkKeys = [
    "link-new",
    "link-sale",
    "link-home",
    "link-stationery",
    "link-books",
    "link-team",
    "link-news",
    "link-merch",
    "link-cosmetics",
    "link-clothes",
  ];
  linkBtns.forEach((btn, index) => {
    if (index < linkKeys.length) {
      btn.textContent = words[linkKeys[index]];
    }
  });

  const nameInput = document.getElementById("commentName");
  const textInput = document.getElementById("commentText");
  const commentBtn = document.getElementById("addCommentBtn");
  if (nameInput) nameInput.placeholder = words["comment-placeholder-name"];
  if (textInput) textInput.placeholder = words["comment-placeholder-text"];
  if (commentBtn) commentBtn.textContent = words["comment-btn"];

  const mainTitle = document.getElementById("mainTitle");
  const mainText = document.getElementById("mainText");
  const mainBtn = document.querySelector(".btn-secondary");
  if (mainTitle) mainTitle.textContent = words["main-title"];
  if (mainText) mainText.textContent = words["main-text"];
  if (mainBtn) mainBtn.textContent = words["btn-main"];

  const langButtons = document.querySelectorAll(".btn-lang[data-lang]");
  langButtons.forEach((btn) => {
    const langKey = btn.dataset.lang;
    const langTextKey = `lang-${langKey}`;
    if (words[langTextKey]) {
      btn.textContent = words[langTextKey];
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    }
  });

  const emptyMsg = document.querySelector(".empty-comments");
  if (emptyMsg && words["empty-comments"]) {
    emptyMsg.textContent = words["empty-comments"];
  }

  localStorage.setItem("preferredLanguage", lang);
  console.log(`🌐 Язык изменён на: ${lang.toUpperCase()}`);
}

const langBtns = document.querySelectorAll(".btn-lang[data-lang]");
langBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const lang = this.dataset.lang;
    setFullLanguage(lang);
    showNotification(`Язык: ${lang.toUpperCase()}`);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("preferredLanguage") || "ru";
  setFullLanguage(savedLang);
  renderComments(); // обновляем комментарии
});

function showNotification(message) {
  const oldNotif = document.querySelector(".notification");
  if (oldNotif) oldNotif.remove();

  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #18568f;
        color: #f5f3e6;
        padding: 12px 30px;
        border-radius: 40px;
        font-family: "Pribambas", sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px #18568f;
        z-index: 9999;
        border: 2px solid #eba0a5;
        animation: slideUp 0.3s ease;
    `;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}
/*стилек */
const styleExists = document.querySelector("#lang-style");
if (!styleExists) {
  const style = document.createElement("style");
  style.id = "lang-style";
  style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        .btn-lang.active {
            background: #eba0a5 !important;
            color: white !important;
            border-color: #eba0a5 !important;
        }
    `;
  document.head.appendChild(style);
}

const STORAGE_KEY = "comments_data";

function loadComments() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
}

function saveComments(comments) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
}

function renderComments() {
  const comments = loadComments();
  const commentsList = document.getElementById("commentsList");

  if (comments.length === 0) {
    commentsList.innerHTML = `
            <div class="empty-comments">
                ${fullTranslations[localStorage.getItem("preferredLanguage") || "ru"]["empty-comments"]}
            </div>
        `;
    return;
  }

  const sorted = [...comments].reverse();
  commentsList.innerHTML = sorted
    .map(
      (comment) => `
        <div class="comment-item">
            <span class="comment-author">${escapeHTML(comment.name)}</span>
            <p class="comment-text">${escapeHTML(comment.text)}</p>
            <span class="comment-date">${comment.date}</span>
        </div>
    `,
    )
    .join("");
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function addComment() {
  const commentName = document.getElementById("commentName");
  const commentText = document.getElementById("commentText");
  const name = commentName.value.trim();
  const text = commentText.value.trim();

  if (!name) {
    showNotification("Пожалуйста, введите ваше имя");
    commentName.focus();
    return;
  }

  if (!text) {
    showNotification("Пожалуйста, введите комментарий");
    commentText.focus();
    return;
  }

  const newComment = {
    name: name,
    text: text,
    date: new Date().toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
  };

  const comments = loadComments();
  comments.push(newComment);
  saveComments(comments);
  commentName.value = "";
  commentText.value = "";
  renderComments();
  showNotification("Комментарий добавлен!");
}

document.addEventListener("DOMContentLoaded", function () {
  const addCommentBtn = document.getElementById("addCommentBtn");
  const commentName = document.getElementById("commentName");
  const commentText = document.getElementById("commentText");

  if (addCommentBtn) {
    addCommentBtn.addEventListener("click", addComment);
  }

  if (commentName) {
    commentName.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        commentText.focus();
      }
    });
  }

  if (commentText) {
    commentText.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        addComment();
      }
    });
  }

  renderComments();
});
let fontSizeLevel = 0;
const maxLevel = 3;
const fontSizeToggle = document.getElementById("fontSizeToggle");
const mainTitle = document.getElementById("mainTitle");
const mainText = document.getElementById("mainText");

const fontSizes = [
  { title: "36px", text: "1.2rem" },
  { title: "44px", text: "1.6rem" },
  { title: "52px", text: "2.0rem" },
  { title: "60px", text: "2.4rem" },
];

if (fontSizeToggle) {
  fontSizeToggle.addEventListener("click", function () {
    fontSizeLevel = (fontSizeLevel + 1) % (maxLevel + 1);
    const sizes = fontSizes[fontSizeLevel];

    if (mainTitle) mainTitle.style.fontSize = sizes.title;
    if (mainText) mainText.style.fontSize = sizes.text;

    const levelText =
      fontSizeLevel === 0 ? "A+" : "A" + "+".repeat(fontSizeLevel);
    this.innerHTML = `<span></span> ${levelText}`;

    console.log(`🔍 Размер шрифта: уровень ${fontSizeLevel}`);
    showNotification(`Размер шрифта: ${levelText}`);
  });
}
/*товары */
document.querySelectorAll(".btn-select").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const name = card.querySelector(".product-name").textContent;
    const price = card.querySelector(".product-price").textContent;
    const id = this.dataset.id;

    // Переключаем состояние
    this.classList.toggle("selected");

    if (this.classList.contains("selected")) {
      // Выбрано → показываем галочку
      console.log(` Выбран товар: ${name} (${price})`);
      showNotification(`Выбран товар: ${name}`);

      // Можно добавить в список выбранных
      addToSelected(id, name, price);
    } else {
      // Отмена выбора
      console.log(` Отменён выбор: ${name}`);
      showNotification(`Отменён выбор: ${name}`);

      // Можно убрать из списка выбранных
      removeFromSelected(id);
    }
  });
});

let selectedItems = [];

function addToSelected(id, name, price) {
  // Проверяем, нет ли уже такого товара
  const exists = selectedItems.find((item) => item.id === id);
  if (!exists) {
    selectedItems.push({ id, name, price });
    updateSelectedCount();
  }
}

function removeFromSelected(id) {
  selectedItems = selectedItems.filter((item) => item.id !== id);
  updateSelectedCount();
}

function updateSelectedCount() {
  const countEl = document.querySelector(".selected-count");
  if (countEl) {
    countEl.textContent = selectedItems.length;
    countEl.style.display = selectedItems.length > 0 ? "block" : "none";
  }
  console.log(`📦 Выбрано товаров: ${selectedItems.length}`);
}

function showSelectedItems() {
  if (selectedItems.length === 0) {
    showNotification("Нет выбранных товаров");
    return;
  }

  let message = "ВЫБРАННЫЕ ТОВАРЫ:\n";
  selectedItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name} — ${item.price}\n`;
  });
  alert(message);
}

document.addEventListener("DOMContentLoaded", function () {
  const topBar = document.querySelector(".top-bar .container .btn-row");
  if (topBar) {
    const btn = document.createElement("button");
    btn.className = "btn-main";
    btn.textContent = "ВЫБРАННОЕ";
    btn.style.position = "relative";
    btn.addEventListener("click", showSelectedItems);
    topBar.appendChild(btn);

    const count = document.createElement("span");
    count.className = "selected-count";
    count.style.cssText = `
            position: absolute;
            top: -8px;
            right: -8px;
            background: #eba0a5;
            color: #18568f;
            border-radius: 50%;
            width: 22px;
            height: 22px;
            font-size: 12px;
            font-weight: 700;
            display: none;
            align-items: center;
            justify-content: center;
            font-family: "Pribambas", sans-serif;
        `;
    btn.appendChild(count);
  }
});

function showNotification(message) {
  const oldNotif = document.querySelector(".notification");
  if (oldNotif) oldNotif.remove();

  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #18568f;
        color: #f5f3e6;
        padding: 12px 30px;
        border-radius: 40px;
        font-family: "Pribambas", sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        border: 2px solid #eba0a5;
        animation: slideUp 0.3s ease;
    `;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}
/*коризна часть 2 */

let cartItems = [];

function addToCart(id, name, price) {
  const existing = cartItems.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cartItems.push({
      id: id,
      name: name,
      price: price,
      quantity: 1,
    });
  }

  updateCartDisplay();
  showNotification(`Товар добавлен в корзину: ${name}`);
}

function removeFromCart(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCartDisplay();
  showNotification("Товар удалён из корзины");
}

function updateCartDisplay() {
  const cartList = document.getElementById("cartItems");
  const cartCount = document.querySelector(".cart-count-header");
  const totalPrice = document.getElementById("cartTotalPrice");

  if (!cartList) return;

  if (cartItems.length === 0) {
    cartList.innerHTML = `<p class="cart-empty">Корзина пуста</p>`;
    if (cartCount) cartCount.textContent = "0";
    if (totalPrice) totalPrice.textContent = "0 ₽";
    return;
  }

  let html = "";
  let total = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
            <div class="cart-item" data-id="${item.id}">
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">${itemTotal} ₽</span>
                <button class="cart-item-remove" data-id="${item.id}">✕</button>
            </div>
        `;
  });

  cartList.innerHTML = html;

  if (cartCount) cartCount.textContent = cartItems.length;

  if (totalPrice) totalPrice.textContent = total + " ₽";

  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;
      removeFromCart(id);
    });
  });
}

function checkout() {
  if (cartItems.length === 0) {
    showNotification("Корзина пуста! Добавьте товары.");
    return;
  }

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  let message = "НОВЫЙ ЗАКАЗ:\n\n";
  cartItems.forEach((item) => {
    message += `${item.name} × ${item.quantity} = ${item.price * item.quantity} ₽\n`;
  });
  message += `\nИтого: ${total} ₽`;

  alert(message);

  cartItems = [];
  updateCartDisplay();
  showNotification("Заказ оформлен! Спасибо!");
}

document.querySelectorAll(".btn-select").forEach((btn) => {
  btn.addEventListener("click", function () {
    const card = this.closest(".product-card");
    const name = card.querySelector(".product-name").textContent;
    const priceText = card.querySelector(".product-price").textContent;
    const price = parseInt(priceText.replace(/\s/g, "").replace("₽", ""));
    const id = this.dataset.id;

    this.classList.toggle("selected");

    if (this.classList.contains("selected")) {
      addToCart(id, name, price);
    } else {
      removeFromCart(id);
    }
  });
});

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", checkout);
}

document.addEventListener("DOMContentLoaded", function () {
  updateCartDisplay();
  console.log("🛒 Корзина готова!");
});

function showNotification(message) {
  const oldNotif = document.querySelector(".notification");
  if (oldNotif) oldNotif.remove();

  const notif = document.createElement("div");
  notif.className = "notification";
  notif.textContent = message;
  notif.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        background: #18568f;
        color: #f5f3e6;
        padding: 12px 30px;
        border-radius: 40px;
        font-family: "Pribambas", sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        border: 2px solid #eba0a5;
        animation: slideUp 0.3s ease;
    `;

  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}
