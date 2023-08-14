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

export { updateGroupBalance, updateItemBalance, updateItemsBalance };
