// import dynamicFields from "./modules/handleDynamicFields.js";
import { fields, data, saveFields } from "./modules/handleDynamicFields.js";
import { generateUniqueId } from "./modules/generateUniqueId.js";
import {
  getDate,
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

let ieFormContainer = document.querySelector("#ie-form-container"),
  saveIeButton = document.querySelector("#save-ie");

// const groups = [];
let groups = [];

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
    createdAt: getDate(),
  };

  let groupContainer = document.createElement("div");
  addClassList(groupContainer, "group-container");

  let deleteGroupButton = document.createElement("button");
  deleteGroupButton.textContent = "Delete group";
  deleteGroupButton.addEventListener("click", function () {
    groups = groups.filter((g) => g.groupId !== group.groupId);
    groupsContainer.removeChild(groupContainer);
    console.log(groups);
  });
  groupContainer.appendChild(deleteGroupButton);

  // add item after group has been created
  let addItem_ = document.createElement("button");
  addItem_.textContent = "Add item";
  addItem_.addEventListener("click", function () {
    let additionalItems = saveFields();

    // additionalItems.forEach((item) => {
    //   /* dom stuff */
    //   let itemContainer = document.createElement("div");

    //   let itemName = document.createElement("h2");
    //   itemName.textContent = item.name;

    //   let itemExpensesContainer = document.createElement("div");
    //   let itemExpensesDisplay = document.createElement("div");
    //   itemExpensesContainer.appendChild(itemExpensesDisplay);
    //   let itemExpensesTitle = document.createElement("h3");
    //   itemExpensesTitle.textContent = "Item expenses";
    //   itemExpensesContainer.appendChild(itemExpensesTitle);

    //   let itemIncomesContainer = document.createElement("div");
    //   let itemIncomesDisplay = document.createElement("div");
    //   itemIncomesContainer.appendChild(itemIncomesDisplay);
    //   let itemIncomesTitle = document.createElement("h3");
    //   itemIncomesTitle.textContent = "Item incomes";
    //   itemIncomesContainer.appendChild(itemIncomesTitle);

    //   /* buttons */
    //   // incomes
    //   let addItemIncomeButton = document.createElement("button");
    //   addItemIncomeButton.textContent = "Add item income";
    //   addItemIncomeButton.addEventListener("click", function () {
    //     amountField.placeholder = "Income";
    //     let itemIncome = {
    //       category: descriptionField.value,
    //       income: Number(amountField.value),
    //       itemIncomeId: generateUniqueId(),
    //       createdAt: getDate(),
    //     };
    //     item.incomes.data.push(itemIncome);
    //     updateData({ groupBalanceDisplay, item, group });
    //     let incomeContainer = document.createElement("div");
    //     let incomeAmount = document.createElement("h3");
    //     incomeAmount.textContent = itemIncome.income;
    //     incomeContainer.appendChild(incomeAmount);
    //     itemIncomesDisplay.appendChild(incomeContainer);
    //     let deleteIncomeButton = document.createElement("button");
    //     deleteIncomeButton.textContent = "Delete";
    //     deleteIncomeButton.addEventListener("click", function () {
    //       item.incomes.data = item.incomes.data.filter(
    //         (income) => income.itemIncomeId !== itemIncome.itemIncomeId
    //       );
    //       itemIncomesDisplay.removeChild(incomeContainer);
    //       updateData({ groupBalanceDisplay, item, group });
    //       groupBalanceDisplay.textContent = `${group.balance}`;
    //     });
    //     incomeContainer.appendChild(deleteIncomeButton);
    //     let editIncomeButton = document.createElement("button");
    //     editIncomeButton.textContent = "Edit";
    //     editIncomeButton.addEventListener("click", function () {
    //       itemIncome.income = Number(amountField.value);
    //       updateData({ groupBalanceDisplay, item, group });
    //       incomeAmount.textContent = itemIncome.income;
    //       groupBalanceDisplay.textContent = `${group.balance}`;
    //     });
    //     incomeContainer.appendChild(editIncomeButton);

    //     // ieFormContainer.style.display == "none"
    //     //   ? (ieFormContainer.style.display = "block")
    //     //   : (ieFormContainer.style.display = "none");
    //   });

    //   // expenses
    //   let addItemExpenseButton = document.createElement("button");
    //   addItemExpenseButton.textContent = "Add item expense";
    //   addItemExpenseButton.addEventListener("click", function () {
    //     amountField.placeholder = "Cost";
    //     let itemExpense = {
    //       category: descriptionField.value,
    //       cost: Number(amountField.value) * -1,
    //       itemExpenseId: generateUniqueId(),
    //       createdAt: getDate(),
    //     };
    //     item.expenses.data.push(itemExpense);
    //     updateData({ groupBalanceDisplay, item, group });

    //     let expenseContainer = document.createElement("div");
    //     let expenseAmount = document.createElement("h3");
    //     expenseAmount.textContent = itemExpense.cost;
    //     expenseContainer.appendChild(expenseAmount);
    //     itemExpensesDisplay.appendChild(expenseContainer);

    //     let deleteExpenseButton = document.createElement("button");
    //     deleteExpenseButton.textContent = "Delete";
    //     addClassList(deleteExpenseButton, "button");
    //     deleteExpenseButton.addEventListener("click", function () {
    //       item.expenses.data = item.expenses.data.filter(
    //         (expense) => expense.itemExpenseId !== itemExpense.itemExpenseId
    //       );

    //       itemExpensesDisplay.removeChild(expenseContainer);
    //       updateData({ groupBalanceDisplay, item, group });
    //       groupBalanceDisplay.textContent = `${group.balance}`;
    //     });
    //     expenseContainer.appendChild(deleteExpenseButton);

    //     // repeating too much code. figure out how to use the function below to avoid doing this for expenses and incomes
    //     let editExpenseButton = document.createElement("button");
    //     editExpenseButton.textContent = "Edit";
    //     editExpenseButton.addEventListener("click", function () {
    //       itemExpense.cost = Number(amountField.value);
    //       updateData({ groupBalanceDisplay, item, group });
    //       expenseAmount.textContent = itemExpense.cost;
    //       groupBalanceDisplay.textContent = `${group.balance}`;
    //     });
    //     expenseContainer.appendChild(editExpenseButton);
    //   });

    //   /* add everything to item container */
    //   itemContainer.appendChild(itemName);
    //   itemContainer.appendChild(itemExpensesContainer);
    //   itemContainer.appendChild(itemIncomesContainer);
    //   /* buttons */
    //   itemContainer.appendChild(addItemExpenseButton);
    //   itemContainer.appendChild(addItemIncomeButton);
    //   /* add everything to group */
    //   groupContainer.appendChild(itemContainer);
    // });

    test_(additionalItems, groupContainer);
    group.items.data.push(...additionalItems);
    console.log(group.items);
  });
  groupContainer.appendChild(addItem_);

  let groupNameDisplay = document.createElement("h3");
  groupNameDisplay.textContent = `${group.name}`;
  groupContainer.appendChild(groupNameDisplay);

  let groupBalanceDisplay = document.createElement("h3");
  groupBalanceDisplay.textContent = `${group.balance}`;
  groupContainer.appendChild(groupBalanceDisplay);

  // changes to the test_ function should happen here!
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
        createdAt: getDate(),
      };
      item.incomes.data.push(itemIncome);
      updateData({ groupBalanceDisplay, item, group });
      let incomeContainer = document.createElement("div");
      let incomeAmount = document.createElement("h3");
      incomeAmount.textContent = itemIncome.income;
      incomeContainer.appendChild(incomeAmount);
      itemIncomesDisplay.appendChild(incomeContainer);
      let deleteIncomeButton = document.createElement("button");
      deleteIncomeButton.textContent = "Delete";
      deleteIncomeButton.addEventListener("click", function () {
        item.incomes.data = item.incomes.data.filter(
          (income) => income.itemIncomeId !== itemIncome.itemIncomeId
        );
        itemIncomesDisplay.removeChild(incomeContainer);
        updateData({ groupBalanceDisplay, item, group });
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      incomeContainer.appendChild(deleteIncomeButton);
      let editIncomeButton = document.createElement("button");
      editIncomeButton.textContent = "Edit";
      editIncomeButton.addEventListener("click", function () {
        itemIncome.income = Number(amountField.value);
        updateData({ groupBalanceDisplay, item, group });
        incomeAmount.textContent = itemIncome.income;
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      incomeContainer.appendChild(editIncomeButton);

      // ieFormContainer.style.display == "none"
      //   ? (ieFormContainer.style.display = "block")
      //   : (ieFormContainer.style.display = "none");
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
        createdAt: getDate(),
      };
      item.expenses.data.push(itemExpense);
      updateData({ groupBalanceDisplay, item, group });

      let expenseContainer = document.createElement("div");
      let expenseAmount = document.createElement("h3");
      expenseAmount.textContent = itemExpense.cost;
      expenseContainer.appendChild(expenseAmount);
      itemExpensesDisplay.appendChild(expenseContainer);

      let deleteExpenseButton = document.createElement("button");
      deleteExpenseButton.textContent = "Delete";
      addClassList(deleteExpenseButton, "button");
      deleteExpenseButton.addEventListener("click", function () {
        item.expenses.data = item.expenses.data.filter(
          (expense) => expense.itemExpenseId !== itemExpense.itemExpenseId
        );

        itemExpensesDisplay.removeChild(expenseContainer);
        updateData({ groupBalanceDisplay, item, group });
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      expenseContainer.appendChild(deleteExpenseButton);

      // repeating too much code. figure out how to use the function below to avoid doing this for expenses and incomes
      let editExpenseButton = document.createElement("button");
      editExpenseButton.textContent = "Edit";
      editExpenseButton.addEventListener("click", function () {
        itemExpense.cost = Number(amountField.value);
        updateData({ groupBalanceDisplay, item, group });
        expenseAmount.textContent = itemExpense.cost;
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      expenseContainer.appendChild(editExpenseButton);
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

  // test_(group.items.data, groupsContainer); // not yet!

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

// function createEditButton() {
//   let editIncomeButton = document.createElement("button");
//   editIncomeButton.textContent = "Edit";
//   editIncomeButton.addEventListener("click", function () {
//     property = Number(amountField.value); // property = itemIncome.income or itemExpense.cost
//     updateData({ groupBalanceDisplay, item, group });
//     incomeAmount.textContent = itemIncome.income;
//     groupBalanceDisplay.textContent = `${group.balance}`;
//   });
//   incomeContainer.appendChild(editIncomeButton);
// }

function addClassList(element, className) {
  element.classList.add(className);
}

function test_(list, container) {
  // group.items.data.forEach
  list.forEach((item) => {
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
        createdAt: getDate(),
      };
      item.incomes.data.push(itemIncome);
      updateData({ groupBalanceDisplay, item, group });
      let incomeContainer = document.createElement("div");
      let incomeAmount = document.createElement("h3");
      incomeAmount.textContent = itemIncome.income;
      incomeContainer.appendChild(incomeAmount);
      itemIncomesDisplay.appendChild(incomeContainer);
      let deleteIncomeButton = document.createElement("button");
      deleteIncomeButton.textContent = "Delete";
      deleteIncomeButton.addEventListener("click", function () {
        item.incomes.data = item.incomes.data.filter(
          (income) => income.itemIncomeId !== itemIncome.itemIncomeId
        );
        itemIncomesDisplay.removeChild(incomeContainer);
        updateData({ groupBalanceDisplay, item, group });
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      incomeContainer.appendChild(deleteIncomeButton);
      let editIncomeButton = document.createElement("button");
      editIncomeButton.textContent = "Edit";
      editIncomeButton.addEventListener("click", function () {
        itemIncome.income = Number(amountField.value);
        updateData({ groupBalanceDisplay, item, group });
        incomeAmount.textContent = itemIncome.income;
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      incomeContainer.appendChild(editIncomeButton);

      // ieFormContainer.style.display == "none"
      //   ? (ieFormContainer.style.display = "block")
      //   : (ieFormContainer.style.display = "none");
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
        createdAt: getDate(),
      };
      item.expenses.data.push(itemExpense);
      updateData({ groupBalanceDisplay, item, group });

      let expenseContainer = document.createElement("div");
      let expenseAmount = document.createElement("h3");
      expenseAmount.textContent = itemExpense.cost;
      expenseContainer.appendChild(expenseAmount);
      itemExpensesDisplay.appendChild(expenseContainer);

      let deleteExpenseButton = document.createElement("button");
      deleteExpenseButton.textContent = "Delete";
      addClassList(deleteExpenseButton, "button");
      deleteExpenseButton.addEventListener("click", function () {
        item.expenses.data = item.expenses.data.filter(
          (expense) => expense.itemExpenseId !== itemExpense.itemExpenseId
        );

        itemExpensesDisplay.removeChild(expenseContainer);
        updateData({ groupBalanceDisplay, item, group });
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      expenseContainer.appendChild(deleteExpenseButton);

      // repeating too much code. figure out how to use the function below to avoid doing this for expenses and incomes
      let editExpenseButton = document.createElement("button");
      editExpenseButton.textContent = "Edit";
      editExpenseButton.addEventListener("click", function () {
        itemExpense.cost = Number(amountField.value);
        updateData({ groupBalanceDisplay, item, group });
        expenseAmount.textContent = itemExpense.cost;
        groupBalanceDisplay.textContent = `${group.balance}`;
      });
      expenseContainer.appendChild(editExpenseButton);
    });

    /* add everything to item container */
    itemContainer.appendChild(itemName);
    itemContainer.appendChild(itemExpensesContainer);
    itemContainer.appendChild(itemIncomesContainer);
    /* buttons */
    itemContainer.appendChild(addItemExpenseButton);
    itemContainer.appendChild(addItemIncomeButton);
    /* add everything to group */
    container.appendChild(itemContainer);
  });
  console.log("FKC");
}
