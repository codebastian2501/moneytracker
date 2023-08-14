// import dynamicFields from "./modules/handleDynamicFields.js";
import { fields, data, saveFields } from "./modules/handleDynamicFields.js";
import { generateUniqueId } from "./modules/generateUniqueId.js";
import {
  updateGroupBalance,
  updateItemBalance,
  updateItemsBalance,
} from "./modules/utilities.js";

const groupsContainer = document.querySelector(".groups-container");

const groupNameField = document.querySelector(".group-name"),
  groupInitialInvestmentField = document.querySelector(
    ".group-initialInvestment"
  );

const descriptionField = document.querySelector(".description-field"),
  amountField = document.querySelector(".amount-field"),
  saveTest = document.querySelector(".save-test");

let saveGroupButton = document.querySelector(".save-group-button");

let saveFieldsButton = document.querySelector(".save-fields-button");
// saveFieldsButton.addEventListener("click", saveFields);

const groups = [];

saveTest.addEventListener("click", () => {
  console.log(groups);
});

saveGroupButton.addEventListener("click", () => {
  let group = {
    name: groupNameField.value,
    initialInvestment: Number(groupInitialInvestmentField.value) * -1,
    expenses: { total: 0, data: [] },
    incomes: { total: 0, data: [] },
    items: { total: 0, data: saveFields() },
    balance: Number(groupInitialInvestmentField.value) * -1, // (find a way around this because i'm repeating too much code)
    groupId: generateUniqueId(),
  };

  let groupContainer = document.createElement("div");

  let groupBalanceDisplay = document.createElement("h3");
  groupBalanceDisplay.textContent = `${group.balance}`;
  groupContainer.appendChild(groupBalanceDisplay);

  group.items.data.forEach((item) => {
    /* dom stuff */
    let itemContainer = document.createElement("div");

    let itemName = document.createElement("h2");
    itemName.textContent = item.name;

    let itemExpensesContainer = document.createElement("div");
    let itemExpensesDisplay = document.createElement("div");
    itemExpensesContainer.appendChild(itemExpensesDisplay);
    let itemExpensesTitle = document.createElement("h3");
    itemExpensesTitle.textContent = "Item expenses";
    itemExpensesContainer.appendChild(itemExpensesTitle);

    let itemIncomesContainer = document.createElement("div");
    let itemIncomesDisplay = document.createElement("div");
    itemIncomesContainer.appendChild(itemIncomesDisplay);
    let itemIncomesTitle = document.createElement("h3");
    itemIncomesTitle.textContent = "Item incomes";
    itemIncomesContainer.appendChild(itemIncomesTitle);

    /* wouldn't it be better to add them to the incomes and expenses containers, respectively?
    /* buttons */
    // incomes
    let addItemIncomeButton = document.createElement("button");
    addItemIncomeButton.textContent = "Add item income";
    addItemIncomeButton.addEventListener("click", function () {
      amountField.placeholder = "Income";
      let itemIncome = {
        category: descriptionField.value,
        income: Number(amountField.value),
        itemIncomeId: generateUniqueId(),
      };

      item.incomes.data.push(itemIncome);
      updateData({ groupBalanceDisplay, item, group });

      itemIncomesDisplay.innerHTML = ""; // run once
      item.incomes.data.forEach((income) => {
        // the problem is here!!!! of course the itemIncome's id is going to be the last item created! // this should be outside of...what?
        // itemIncomesDisplay.innerHTML = ""; // run [incomes.length + 1] times. not what I want, of course.
        let incomeContainer = document.createElement("div");
        let incomeAmount = document.createElement("h3");
        incomeAmount.textContent = income.income;
        incomeContainer.appendChild(incomeAmount);

        itemIncomesDisplay.appendChild(incomeContainer);

        // Add a button to delete the income
        // this seems to be working just fine.
        let deleteIncomeButton = document.createElement("button");
        deleteIncomeButton.textContent = "Delete";
        deleteIncomeButton.addEventListener("click", function () {
          itemIncomesDisplay.innerHTML = "";
          item.incomes.data = item.incomes.data.filter(
            (income) => income.itemIncomeId !== itemIncome.itemIncomeId
          );
          itemIncomesDisplay.removeChild(incomeContainer);
          updateData({ groupBalanceDisplay, item, group });
          groupBalanceDisplay.textContent = `${group.balance}`;
        });
        incomeContainer.appendChild(deleteIncomeButton);

        let testx = document.createElement("button");
        testx.textContent = "testx";
        testx.addEventListener("click", function () {
          console.log(income.itemIncomeId, itemIncome.itemIncomeId);
        });
        incomeContainer.appendChild(testx);
      });
    });
    // expenses
    let addItemExpenseButton = document.createElement("button");
    addItemExpenseButton.textContent = "Add item expense";
    addItemExpenseButton.addEventListener("click", function () {
      amountField.placeholder = "Cost";
      let itemExpense = {
        category: descriptionField.value,
        cost: Number(amountField.value) * -1,
        itemExpenseId: generateUniqueId(),
      };
      item.expenses.data.push(itemExpense);
      updateData({ groupBalanceDisplay, item, group });

      itemExpensesDisplay.innerHTML = "";
      item.expenses.data.forEach((expense) => {
        let expenseContainer = document.createElement("div");
        let expenseAmount = document.createElement("h3");
        expenseAmount.textContent = expense.cost;
        expenseContainer.appendChild(expenseAmount);
        itemExpensesDisplay.appendChild(expenseContainer);

        let deleteExpenseButton = document.createElement("button");
        deleteExpenseButton.textContent = "Delete";
        deleteExpenseButton.addEventListener("click", function () {
          // itemExpensesDisplay.innerHTML = "";
          console.log(expense.itemExpenseId, itemExpense.itemExpenseId);
          item.expenses.data = item.expenses.data.filter(
            (expense) => expense.itemExpenseId !== itemExpense.itemExpenseId
          );
          // itemExpensesContainer.removeChild(expenseContainer);
          itemExpensesDisplay.removeChild(expenseContainer);
          updateData({ groupBalanceDisplay, item, group });
          groupBalanceDisplay.textContent = `${group.balance}`;
        });
        expenseContainer.appendChild(deleteExpenseButton);
      });
    });

    /* add everything to item container */
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemExpensesContainer);
    itemContainer.appendChild(itemIncomesContainer);
    /* buttons */
    itemContainer.appendChild(addItemExpenseButton);
    itemContainer.appendChild(addItemIncomeButton);
    /* add everything to group */
    groupContainer.appendChild(itemContainer);
  });

  groupsContainer.appendChild(groupContainer);

  groups.push(group);
});

/* temporal */

function createButton({ textContent, parent }) {
  let button = document.querySelector("button");
  button.textContent = textContent;
  parent.appendChild(button);
}

function updateData({ groupBalanceDisplay, item, group }) {
  updateItemBalance(item);
  updateItemsBalance(group);
  updateGroupBalance(group);
  groupBalanceDisplay.textContent = `${group.balance}`;
}
