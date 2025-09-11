(function () {
    const start = Date.now();

    window.addEventListener("load", function() {
        const loadTime = Date.now() - start;

        const statsContainer = document.getElementById("loadStats");
        if (statsContainer) {
            statsContainer.textContent = `Время загрузки страницы: ${loadTime} мс`;
        }
    });
})();