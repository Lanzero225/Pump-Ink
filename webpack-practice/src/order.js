import { productList } from "./catalog";

export const orderDictionary = {};

// initialize dictionary
productList.forEach(product => {
  orderDictionary[product.name] = 0;
});

// load saved order
const savedOrder = localStorage.getItem("orderDictionary");
if (savedOrder) {
  Object.assign(orderDictionary, JSON.parse(savedOrder));
}

function saveOrder() {
  localStorage.setItem(
    "orderDictionary",
    JSON.stringify(orderDictionary)
  );
}

export function buildOrder(mainDiv) {
  mainDiv.classList.add("order-app");

  const orderContainer = document.createElement("div");
  orderContainer.classList.add("order-container");

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("order-total");

  const countElements = {};
  const itemTotalElements = {};

  function updateGrandTotal() {
    let total = 0;
    productList.forEach(product => {
      total += orderDictionary[product.name] * product.price;
    });
    totalDiv.textContent = `Total: ₱${total}`;
  }

productList.forEach(product => {
  const row = document.createElement("div");
  row.classList.add("order-row");

  const name = document.createElement("span");
  name.classList.add("product-name");
  name.textContent = product.name;

  const price = document.createElement("span");
  price.textContent = `₱${product.price}`;

  const qty = document.createElement("span");
  qty.textContent = orderDictionary[product.name];
  countElements[product.name] = qty;

  const itemTotal = document.createElement("span");
  itemTotal.textContent =
    `₱${orderDictionary[product.name] * product.price}`;
  itemTotalElements[product.name] = itemTotal;

  // ➖ minus button
  const minusBtn = document.createElement("button");
  minusBtn.textContent = "−";
  minusBtn.classList.add("qty-btn");

  minusBtn.onclick = () => {
    if (orderDictionary[product.name] > 0) {
      orderDictionary[product.name]--;
      qty.textContent = orderDictionary[product.name];
      itemTotal.textContent =
        `₱${orderDictionary[product.name] * product.price}`;
      updateGrandTotal();
      saveOrder();
    }
  };

  // ➕ plus button
  const addBtn = document.createElement("button");
  addBtn.textContent = "+";
  addBtn.classList.add("qty-btn");

  addBtn.onclick = () => {
    orderDictionary[product.name]++;
    qty.textContent = orderDictionary[product.name];
    itemTotal.textContent =
      `₱${orderDictionary[product.name] * product.price}`;
    updateGrandTotal();
    saveOrder();
  };

  row.append(name, price, minusBtn, qty, addBtn, itemTotal);
  orderContainer.append(row);
});


  updateGrandTotal();

  // Export
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Order";
  exportBtn.classList.add("action-btn");
  exportBtn.onclick = exportOrder;

  // Import
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.classList.add("action-btn");
  importInput.style.display = "none";
    importInput.onchange = importOrder;
  const importBtn = document.createElement("button");
  importBtn.textContent = "Import Order";
  importBtn.classList.add("action-btn");

  importBtn.onclick = () => importInput.click();

  function exportOrder() {
    const dataStr = JSON.stringify(orderDictionary, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "order.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  function importOrder(event) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedData = JSON.parse(e.target.result);
        Object.assign(orderDictionary, importedData);

        productList.forEach(product => {
          countElements[product.name].textContent =
            orderDictionary[product.name] || 0;
          itemTotalElements[product.name].textContent =
            `₱${(orderDictionary[product.name] || 0) * product.price}`;
        });

        updateGrandTotal();
        saveOrder();
        fileInput.value = "";

      } catch (err) {
        alert("Invalid JSON file!");
        fileInput.value = "";
      }
    };
    reader.readAsText(file);
  }

  mainDiv.append(orderContainer, totalDiv, exportBtn, importBtn);
}
