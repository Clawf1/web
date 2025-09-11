(function () {
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("scheduleForm");
        const output = document.getElementById("scheduleOutput");

        loadSettings();

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            generateSchedule();
        });

        document.getElementById("saveSettings").addEventListener("click", function () {
            saveSettings();
        });
        
        document.getElementById('reset-settings').addEventListener('click', function () {
            localStorage.removeItem('scheduleData');

            const cells = document.querySelectorAll('.schedule-table td[contenteditable="true"]');
            cells.forEach(cell => cell.textContent = '');

            alert("Настройки сброшены");
        });


        function generateSchedule() {
            const days = parseInt(document.getElementById("days").value, 10);
            const lessons = parseInt(document.getElementById("lessons").value, 10);
            const language = document.getElementById("language").value;

            const weekDays = ["пн", "вт", "ср", "чт", "пт", "сб"];

            output.innerHTML = "";

            const table = document.createElement("table");
            table.classList.add("schedule-table");

            const headerRow = document.createElement("tr");
            headerRow.innerHTML = `<th></th>${Array.from({length: days}, (_, i) => `<th>${weekDays[i]}</th>`).join("")}`;
            table.appendChild(headerRow);

            for (let lesson = 1; lesson <= lessons; lesson++) {
                const row = document.createElement("tr");
                row.innerHTML = `<td>${lesson}</td>${Array.from({length: days}, () => "<td contenteditable='true'></td>").join("")}`;
                table.appendChild(row);
            }

            output.appendChild(table);

            restoreData();

            const cells = table.querySelectorAll("td[contenteditable='true']");
            cells.forEach(cell => {
                cell.addEventListener("input", saveData);

                cell.addEventListener("focus", () => cell.classList.add("active-cell"));
                cell.addEventListener("blur", () => cell.classList.remove("active-cell"));
            });
        }

        function saveData() {
            const tableData = [];
            const rows = document.querySelectorAll(".schedule-table tr");

            rows.forEach(row => {
                const rowData = [];
                row.querySelectorAll("td[contenteditable='true']").forEach(cell => {
                    rowData.push(cell.innerText);
                });
                tableData.push(rowData);
            });

            localStorage.setItem("scheduleData", JSON.stringify(tableData));
        }

        function restoreData() {
            const savedData = JSON.parse(localStorage.getItem("scheduleData"));
            if (savedData) {
                const rows = document.querySelectorAll(".schedule-table tr");

                rows.forEach((row, rowIndex) => {
                    row.querySelectorAll("td[contenteditable='true']").forEach((cell, cellIndex) => {
                        if (savedData[rowIndex] && savedData[rowIndex][cellIndex] !== undefined) {
                            cell.innerText = savedData[rowIndex][cellIndex];
                        }
                    });
                });
            }
        }
        
        function saveSettings() {
            const days = document.getElementById("days").value;
            const lessons = document.getElementById("lessons").value;
            const language = document.getElementById("language").value;

            const settings = {
                days,
                lessons,
                language
            };

            localStorage.setItem("scheduleSettings", JSON.stringify(settings));
            alert("Настройки сохранены!");
        }

        function loadSettings() {
            const savedSettings = localStorage.getItem("scheduleSettings");
            if (savedSettings) {
                const {days, lessons, language} = JSON.parse(savedSettings);
                document.getElementById("days").value = days;
                document.getElementById("lessons").value = lessons;
                document.getElementById("language").value = language;
            }
        }
    });
})();
