import { generateUniqueId } from "./generateUniqueId.js";

let createFieldButton = document.querySelector(".create-field-button"),
  saveFieldsButton = document.querySelector(".save-fields-button");
let container = document.querySelector(".container");

let fields = [];
let data = {};

let groups = { data: [] };

createFieldButton.addEventListener("click", () => {
  let uniqueId = generateUniqueId();
  data[`${uniqueId}`] = "";

  let fieldContainer = document.createElement("div");
  let field = document.createElement("input");
  field.placeholder = "Item name";

  field.addEventListener("change", () => {
    data[uniqueId] = field.value;
  });

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove field";

  deleteButton.addEventListener("click", () => {
    container.removeChild(fieldContainer); // nice!
    delete data[`${uniqueId}`];
  });

  fieldContainer.appendChild(field);
  fieldContainer.appendChild(deleteButton);
  container.appendChild(fieldContainer);
});

// function saveFields() {
//   let group = { items: [] };
//   for (let item in data) {
//     group.items.push({ itemName: data[item] });
//   }
//   groups.data.push(group);

//   /* reset data object */
//   data = {};

//   /* reset container to remove previously created fields */
//   container.innerHTML = "";

//   /* I know this is a terrible way to code this functionality, but I need that MVP as soon as possible! */
//   return group; // gonna change this. hold on
// }

// function saveFields() {
//   // let group = { items: [] };
//   let items = [];
//   // for (let item in data) {
//   //   group.items.push({ itemName: data[item] });
//   // }

//   for (let item in data) {
//     items.push({ itemName: data[item] });
//   }

//   // groups.data.push(group);

//   // /* reset data object */
//   // data = {};

//   // /* reset container to remove previously created fields */
//   // container.innerHTML = "";

//   // /* I know this is a terrible way to code this functionality, but I need that MVP as soon as possible! */
//   // return group; // gonna change this. hold on

//   data = {};
//   container.innerHTML = "";
//   return items;
// }

function saveFields() {
  // let group = { items: [] };
  let items = [];
  // for (let item in data) {
  //   group.items.push({ itemName: data[item] });
  // }

  for (let item in data) {
    // items.push({ itemName: data[item] });

    let itemData = {
      name: data[item],
      expenses: {
        expensesTotal: 0,
        data: [
          // { category: "Reparación tarjeta", cost: -1 },
          // { category: "Compra de control", cost: -2 },
        ],
      },
      incomes: {
        incomesTotal: 0,
        data: [
          // { category: "Venta", income: 10 }
        ],
      },
      // or maybe this can go!
      itemBalance: 0, // this is the balance for each item! however, as of now, it's only accounting for the expenses made!
      itemId: generateUniqueId(),
    };

    console.log(itemData.itemId);

    items.push(itemData);
  }

  // groups.data.push(group);

  // /* reset data object */
  // data = {};

  // /* reset container to remove previously created fields */
  // container.innerHTML = "";

  // /* I know this is a terrible way to code this functionality, but I need that MVP as soon as possible! */
  // return group; // gonna change this. hold on

  data = {};
  container.innerHTML = "";
  return items;
}

// let itemData = {
//   name: item.itemName,
//   expenses: {
//     expensesTotal: 0,
//     data: [
//       { category: "Reparación tarjeta", cost: -1 },
//       { category: "Compra de control", cost: -2 },
//     ],
//   },
//   incomes: {
//     incomesTotal: 0,
//     data: [{ category: "Venta", income: 10 }],
//   },
//   // or maybe this can go!
//   itemBalance: 0, // this is the balance for each item! however, as of now, it's only accounting for the expenses made!
//   itemId: generateUniqueId(),
// };

// export default {};
export { fields, data, saveFields };
