function updateGroupBalance(group) {
  group.balance =
    group.initialInvestment +
    group.items.total +
    group.expenses.total +
    group.incomes.total;

  console.log(group);
}

function updateItemBalance(item) {
  item.expenses.expensesTotal = 0;
  item.incomes.incomesTotal = 0;

  item.expenses.data.forEach((expense) => {
    item.expenses.expensesTotal -= expense.cost; // this number is positive, though! weird behaviour.
  });

  item.incomes.data.forEach((income) => {
    item.incomes.incomesTotal += income.income;
  });

  item.itemBalance = item.incomes.incomesTotal - item.expenses.expensesTotal;
}

function updateItemsBalance(group) {
  group.items.total = 0;
  group.items.data.forEach((item) => {
    //console.log(item.itemBalance);
    group.items.total += item.itemBalance;
  });
}

function getDate() {
  // Get the current date
  const currentDate = new Date();

  // Extract day, month, and year
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
  const year = currentDate.getFullYear();

  // Format the date as "dd/mm/yyyy"
  // const formattedDate = `${day.toString().padStart(2, "0")}/${month
  //   .toString()
  //   .padStart(2, "0")}/${year}`;
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
}

function saveForm(form) {
  let stringForm = JSON.stringify(form);
  window.localStorage.setItem("form", stringForm);
}
// https://www.raymondcamden.com/2022/03/27/saving-form-data-in-client-side-storage
export { updateGroupBalance, updateItemBalance, updateItemsBalance, getDate };
