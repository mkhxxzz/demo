document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("buyModal");
    const closeModal = document.getElementById("closeModal");

    const modalImg = document.getElementById("modalImg");
    const modalName = document.getElementById("modalName");
    const modalPrice = document.getElementById("modalPrice");

    // если модалки нет — стоп
    if (!modal) return;

    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", () => {

            const card = btn.closest(".card");
            if (!card) return;

            modalImg.src = card.querySelector("img").src;
            modalName.textContent = card.querySelector("h3").textContent;
            modalPrice.textContent = card.querySelector(".new-price").textContent;

            modal.classList.add("show");
        });
    });

    closeModal?.addEventListener("click", () => {
        modal.classList.remove("show");
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
        }
    });

    document.getElementById("orderForm")?.addEventListener("submit", (e) => {
        e.preventDefault();

        modal.classList.remove("show");

        alert("Заказ оформлен (без оплаты)");
    });

});