const langBtns = document.querySelectorAll(".btn-lang[data-lang]");
const mainTitle = document.getElementById("mainTitle");
const mainText = document.getElementById("mainText");

const translations = {
  ru: {
    title: "Добро пожаловать!",
    text: "Добро пожаловать на наш сайт, где игрушка может заказать себе товар и мы его доставим!",
  },
  chi: {
    title: "欢迎！",
    text: "欢迎来到我们的网站，在这里玩具可以为自己订购商品，我们会送货上门！",
  },
  en: {
    title: "Welcome!",
    text: "Welcome to our website, where a toy can order goods for itself and we will deliver them!",
  },
};

function setLanguage(lang) {
  // Меняем текст
  if (translations[lang]) {
    mainTitle.textContent = translations[lang].title;
    mainText.textContent = translations[lang].text;
  }

  langBtns.forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.lang === lang) {
      btn.classList.add("active");
    }
  });

  localStorage.setItem("preferredLanguage", lang);

  console.log(`🌐 Язык изменён на: ${lang.toUpperCase()}`);
}

langBtns.forEach((btn) => {
  btn.addEventListener("click", function () {
    const lang = this.dataset.lang;
    setLanguage(lang);
    showNotification(`Язык: ${lang.toUpperCase()}`);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const savedLang = localStorage.getItem("preferredLanguage") || "ru";
  setLanguage(savedLang);
});

let fontSizeLevel = 0;
const maxLevel = 3;
const fontSizeToggle = document.getElementById("fontSizeToggle");
const contentSection = document.querySelector(".content-section");

const fontSizes = [
  { title: "36px", text: "1.2rem" },
  { title: "44px", text: "1.6rem" },
  { title: "52px", text: "2.0rem" },
  { title: "60px", text: "2.4rem" },
];

fontSizeToggle.addEventListener("click", function () {
  fontSizeLevel = (fontSizeLevel + 1) % (maxLevel + 1);

  const sizes = fontSizes[fontSizeLevel];
  if (mainTitle) {
    mainTitle.style.fontSize = sizes.title;
  }

  if (mainText) {
    mainText.style.fontSize = sizes.text;
  }

  const levelText =
    fontSizeLevel === 0 ? "A+" : "A" + "+".repeat(fontSizeLevel);
  this.innerHTML = `<span></span> ${levelText}`;

  console.log(`🔍 Размер шрифта: уровень ${fontSizeLevel} (${sizes.title})`);
  showNotification(`Размер шрифта: ${levelText}`);
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
        font-family: Arial, sans-serif;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        border: 2px solid #eba0a5;
        animation: slideUp 0.3s ease;
    `;

  document.body.appendChild(notif);

  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(20px); }
            to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
    `;
  document.head.appendChild(style);

  setTimeout(() => {
    notif.style.opacity = "0";
    notif.style.transition = "opacity 0.3s ease";
    setTimeout(() => notif.remove(), 300);
  }, 2000);
}

console.log("WOW");
const commentName = document.getElementById("commentName");
const commentText = document.getElementById("commentText");
const addCommentBtn = document.getElementById("addCommentBtn");
const commentsList = document.getElementById("commentsList");
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

  if (comments.length === 0) {
    commentsList.innerHTML = `
            <div class="empty-comments">
                Пока нет комментариев. Будьте первым! ✨
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
  showNotification(" Комментарий добавлен!");
}

addCommentBtn.addEventListener("click", addComment);
commentName.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    commentText.focus();
  }
});

commentText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    addComment();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  renderComments();
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
        box-shadow: 0 4px 20px  #18568f;
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
