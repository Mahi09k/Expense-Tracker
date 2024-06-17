// Get form, expense list, and total amount elements 
const expenseForm = document.getElementById("expense-form"); 
const expenseList = document.getElementById("expense-list"); 
const totalAmountElement = document.getElementById("total-amount"); 

// Initialize expenses array from localStorage 
let expenses = JSON.parse(localStorage.getItem("expenses")) || []; 

// Function to render expenses in tabular form 
function renderExpenses() { 
	// Clear expense list 
	expenseList.innerHTML = ""; 

	// Initialize total amount 
	let totalAmount = 0; 

	// Loop through expenses array and create table rows 
	for (let i = 0; i < expenses.length; i++) { 
		const expense = expenses[i]; 
		const expenseRow = document.createElement("tr"); 
		expenseRow.innerHTML = ` 
			<td>${expense.user}</td>
			<td>${expense.name}</td> 
			<td>$${expense.amount}</td> 
			<td>
				<span class="edit-btn" data-id="${i}">Edit</span> | 
				<span class="delete-btn" data-id="${i}">Delete</span>
			</td> 
		`; 
		expenseList.appendChild(expenseRow); 

		// Update total amount 
		totalAmount += expense.amount; 
	} 

	// Update total amount display 
	totalAmountElement.textContent = totalAmount.toFixed(2); 

	// Save expenses to localStorage 
	localStorage.setItem("expenses", JSON.stringify(expenses)); 
} 

// Function to add expense 
function addExpense(event) { 
	event.preventDefault(); 

	// Get expense details from form 
	const userNameInput = document.getElementById("user-name");
	const expenseNameInput = document.getElementById("expense-name"); 
	const expenseAmountInput = document.getElementById("expense-amount"); 
	const userName = userNameInput.value;
	const expenseName = expenseNameInput.value; 
	const expenseAmount = parseFloat(expenseAmountInput.value); 

	// Clear form inputs 
	userNameInput.value = "";
	expenseNameInput.value = ""; 
	expenseAmountInput.value = ""; 

	// Validate inputs 
	if (userName === "" || expenseName === "" || isNaN(expenseAmount)) { 
		alert("Please enter valid expense details."); 
		return; 
	} 

	// Create new expense object 
	const expense = { 
		user: userName,
		name: expenseName, 
		amount: expenseAmount, 
	}; 

	// Add expense to expenses array 
	expenses.push(expense); 

	// Render expenses 
	renderExpenses(); 
} 

// Function to delete expense 
function deleteExpense(event) { 
	if (event.target.classList.contains("delete-btn")) { 
		// Get expense index from data-id attribute 
		const expenseIndex = parseInt(event.target.getAttribute("data-id")); 

		// Remove expense from expenses array 
		expenses.splice(expenseIndex, 1); 

		// Render expenses 
		renderExpenses(); 
	} 
} 

// Function to edit expense
function editExpense(event) {
	if (event.target.classList.contains("edit-btn")) {
		// Get expense index from data-id attribute
		const expenseIndex = parseInt(event.target.getAttribute("data-id"));

		// Get the expense to edit
		const expense = expenses[expenseIndex];

		// Fill the form with expense details
		document.getElementById("user-name").value = expense.user;
		document.getElementById("expense-name").value = expense.name;
		document.getElementById("expense-amount").value = expense.amount;

		// Remove the expense from the array
		expenses.splice(expenseIndex, 1);

		// Render expenses
		renderExpenses();
	}
}

// Add event listeners 
expenseForm.addEventListener("submit", addExpense); 
expenseList.addEventListener("click", deleteExpense); 
expenseList.addEventListener("click", editExpense);

// Render initial expenses on page load 
renderExpenses();
