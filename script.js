function display(id) {
    document.getElementById("homePage").style.display = "none";
    document.getElementById(id).style.display = "block";
}

function back(id) {
    document.getElementById(id).style.display = "none";
    document.getElementById("homePage").style.display = "block";
}

// Load expenses from localStorage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function save() {

    let name = document.getElementById("EName").value.trim();
    let amount = document.getElementById("amount").value;
    let Category = document.getElementById("Category").value;
    let date = document.getElementById("date").value;

    // Validation
    if (name === "" || amount === "" || date === "") {
        alert("Please fill all fields");
        return;
    }

    let expense = {
        name: name,
        amount: amount,
        Category: Category,
        date: date
    };

    expenses.push(expense);

    // Save to localStorage
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    alert("Expense Saved Successfully!");

    // Clear inputs
    document.getElementById("EName").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("date").value = "";

    back("Add");
}

function showExpenses() {

    let tableBody = document.getElementById("tableBody");

    tableBody.innerHTML = "";

    let grandTotal = 0;

    // No expenses
    if (expenses.length === 0) {

        tableBody.innerHTML =
            "<tr><td colspan='5' class='text-center'>No Expenses Added Yet</td></tr>";

        document.getElementById("grandTotal").textContent = "₹0";

        return;
    }

    // Display expenses
    for (let i = 0; i < expenses.length; i++) {

        grandTotal += Number(expenses[i].amount);

        tableBody.innerHTML += `
        <tr>
            <td>${expenses[i].name}</td>
            <td>₹${expenses[i].amount}</td>
            <td>${expenses[i].Category}</td>
            <td>${expenses[i].date}</td>
            <td>
                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${i})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    }

    document.getElementById("grandTotal").textContent =
        "₹" + grandTotal;
}

function deleteExpense(index) {

    let confirmDelete = confirm(
        "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
        return;
    }

    expenses.splice(index, 1);

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

    showExpenses();
}