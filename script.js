<script>
    // Members' names list
    const members = ["Habibur", "Shamsul", "Raju", "Tanvir", "Sayem", "Shipon"];
    let dailyMeals = {};
    let monthlyMeals = {};
    let selectedDate = new Date().toISOString().split('T')[0]; // Today's date

    // Load tables when the page loads
    function loadTable() {
        const mealTable = document.getElementById("mealTable");
        const monthlyMealTable = document.getElementById("monthlyMealTable");

        // Load saved meal data from localStorage if available
        const savedDailyMeals = localStorage.getItem("dailyMeals");
        const savedMonthlyMeals = localStorage.getItem("monthlyMeals");

        if (savedDailyMeals && savedMonthlyMeals) {
            dailyMeals = JSON.parse(savedDailyMeals);
            monthlyMeals = JSON.parse(savedMonthlyMeals);
        } else {
            // Initialize daily and monthly meals if no data is found
            members.forEach(member => {
                dailyMeals[member] = { Breakfast: 0, Lunch: 0, Dinner: 0 };
                monthlyMeals[member] = 0;
            });
        }

        members.forEach(member => {
            // Daily Meal Table
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${member}</td>
                <td><input type="checkbox" class="meal-checkbox" data-name="${member}" data-time="Breakfast" ${dailyMeals[member].Breakfast > 0 ? "checked" : ""}></td>
                <td><input type="checkbox" class="meal-checkbox" data-name="${member}" data-time="Lunch" ${dailyMeals[member].Lunch > 0 ? "checked" : ""}></td>
                <td><input type="checkbox" class="meal-checkbox" data-name="${member}" data-time="Dinner" ${dailyMeals[member].Dinner > 0 ? "checked" : ""}></td>
            `;
            mealTable.appendChild(row);

            // Monthly Meal Table
            const monthlyRow = document.createElement("tr");
            monthlyRow.innerHTML = `
                <td>${member}</td>
                <td id="${member}-monthly-count">${monthlyMeals[member]}</td>
            `;
            monthlyMealTable.appendChild(monthlyRow);
        });

        // Set initial date
        document.getElementById("datePicker").value = selectedDate;
    }

    // Event listener for date change
    document.getElementById("datePicker").addEventListener("change", function () {
        selectedDate = this.value;
        alert(`Date changed to: ${selectedDate}`);
    });

    // Update meal counts
    function updateMealCount() {
        const checkboxes = document.querySelectorAll(".meal-checkbox");
        checkboxes.forEach(checkbox => {
            const member = checkbox.dataset.name;
            const time = checkbox.dataset.time;

            if (checkbox.checked) {
                // Count breakfast as 0.5 and other meals as 1
                dailyMeals[member][time] = (time === "Breakfast") ? 0.5 : 1;
            } else {
                dailyMeals[member][time] = 0;
            }
        });

        // Update monthly meals
        Object.keys(dailyMeals).forEach(member => {
            const totalMeals = Object.values(dailyMeals[member]).reduce((a, b) => a + b, 0);
            monthlyMeals[member] += totalMeals;
            document.getElementById(`${member}-monthly-count`).innerText = monthlyMeals[member];
        });

        // Save data to localStorage
        localStorage.setItem("dailyMeals", JSON.stringify(dailyMeals));
        localStorage.setItem("monthlyMeals", JSON.stringify(monthlyMeals));

        // Reset daily meal counts
        Object.keys(dailyMeals).forEach(member => {
            dailyMeals[member] = { Breakfast: 0, Lunch: 0, Dinner: 0 };
        });

        // Uncheck all checkboxes
        checkboxes.forEach(checkbox => checkbox.checked = false);

        alert(`Meals updated successfully for: ${selectedDate}`);
    }

    // Load the table when the page is first opened
    loadTable();
</script>