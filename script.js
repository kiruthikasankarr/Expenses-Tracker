const transactions = [];

function addTransaction() {
  const desc = document.getElementById("desc").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const date = document.getElementById("date").value;

  if (!desc || !amount || !type || !date) {
    alert("Please fill all fields!");
    return;
  }

  const transaction = { desc, amount, type, date };
  transactions.push(transaction);
  renderTable();
  updateSummary();

  document.getElementById("desc").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "";
  document.getElementById("date").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
  renderTable();
  updateSummary();
}

function renderTable(filtered = transactions) {
  const tbody = document.querySelector("#transactionTable tbody");
  tbody.innerHTML = "";

  filtered.forEach((t, index) => {
    const row = `<tr>
      <td>${t.date}</td>
      <td>${t.desc}</td>
      <td style="color: ${t.type === 'income' ? 'green' : 'red'};">${t.type}</td>
      <td>₹${t.amount.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="deleteTransaction(${index})">Delete</button></td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

function filterTransactions() {
  const filterType = document.getElementById("filterType").value;

  if (filterType === "all") {
    renderTable();
  } else {
    const filtered = transactions.filter(t => t.type === filterType);
    renderTable(filtered);
  }
}

function updateSummary() {
  let income = 0, expense = 0;
  transactions.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });
  document.getElementById("income").textContent = income.toFixed(2);
  document.getElementById("expense").textContent = expense.toFixed(2);
  document.getElementById("balance").textContent = (income - expense).toFixed(2);
}
