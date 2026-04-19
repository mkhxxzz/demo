document.addEventListener("DOMContentLoaded", () => {

    // ======================
    // ДАННЫЕ
    // ======================

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const cartCount = document.getElementById("cartCount");
    const favCount = document.getElementById("favCount");

    updateCounts();

    // ======================
    // ОБНОВЛЕНИЕ СЧЁТЧИКОВ
    // ======================

    function updateCounts() {
        if (cartCount) cartCount.textContent = cart.length;
        if (favCount) favCount.textContent = favorites.length;
    }

    // ======================
    // КОРЗИНА + МОДАЛКА
    // ======================

    const modal = document.getElementById("buyModal");
    const closeModal = document.getElementById("closeModal");

    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalPrice = document.getElementById("modalPrice");

    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const card = btn.closest(".card");

            modalImg.src = card.querySelector("img").src;
            modalName.textContent = card.querySelector("h3").textContent;
            modalPrice.textContent = card.querySelector(".new-price").textContent;

            modal.classList.add("show");
        });
    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.remove("show");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    // ======================
    // ИЗБРАННОЕ (ГЛАВНОЕ ИСПРАВЛЕНИЕ)
    // ======================

    document.querySelectorAll(".fav-btn").forEach(btn => {
        const card = btn.closest(".card");
        const name = card.querySelector("h3").textContent;

        // 🔥 СРАЗУ ПРИ ЗАГРУЗКЕ СТАВИМ ЦВЕТ
        if (favorites.some(f => f.name === name)) {
            btn.classList.add("active");
        }

        btn.addEventListener("click", () => {

            const item = {
                name: card.querySelector("h3").textContent,
                price: card.querySelector(".new-price").textContent,
                img: card.querySelector("img").src
            };

            const index = favorites.findIndex(f => f.name === item.name);

            if (index === -1) {
                favorites.push(item);
                btn.classList.add("active");
            } else {
                favorites.splice(index, 1);
                btn.classList.remove("active");
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
            updateCounts();
        });
    });

});