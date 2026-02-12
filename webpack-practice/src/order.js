import { productList } from "./catalog";

export const orderDictionary = {};

productList.forEach(product => {
  orderDictionary[product.name] = 0;
});

let orderData = [];
const savedOrder = localStorage.getItem("orderData");

if (savedOrder) {
  orderData = JSON.parse(savedOrder);
}

function saveOrder() {
  localStorage.setItem("orderData", JSON.stringify(orderData));
}



export function buildOrder(mainDiv) {
  mainDiv.classList.add("order-app");

  const orderContainer = document.createElement("div");
  orderContainer.classList.add("order-container");

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("order-total");

  const countElements = {};
  const itemTotalElements = {};
  const buttons = [];

  function calculateTotal() {
    let total = 0;
    productList.forEach(product => {
      total += orderDictionary[product.name] * product.price;
    });
    return total;
  }

  function updateGrandTotal() {
    totalDiv.textContent = `Total: ₱${calculateTotal()}`;
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

    const minusBtn = document.createElement("button");
    minusBtn.textContent = "−";
    minusBtn.classList.add("qty-btn");

    minusBtn.onclick = () => {
      if (orderDictionary[product.name] > 0) {
        orderDictionary[product.name]--;
        refreshRow(product);
      }
    };

    const addBtn = document.createElement("button");
    addBtn.textContent = "+";
    addBtn.classList.add("qty-btn");

    addBtn.onclick = () => {
      orderDictionary[product.name]++;
      refreshRow(product);
    };

    buttons.push(minusBtn, addBtn);

    function refreshRow(product) {
      qty.textContent = orderDictionary[product.name];
      itemTotal.textContent =
        `₱${orderDictionary[product.name] * product.price}`;
      updateGrandTotal();
    }

    row.append(name, price, minusBtn, qty, addBtn, itemTotal);
    orderContainer.append(row);

  });

  updateGrandTotal();

  // CONFIRM ORDER BUTTON
  const confirmBtn = document.createElement("button");
  confirmBtn.textContent = "Confirm Order";
  confirmBtn.classList.add("confirm-btn");

  confirmBtn.onclick = () => {
    const totalAmount = calculateTotal();

    if (totalAmount === 0) {
      alert("Cannot confirm an empty order.");
      return;
    }

    orderData.push({
      customer: {
        date: new Date().toLocaleString(),
        time: new Date().getTime()
      },
      items: { ...orderDictionary },
      total: totalAmount
    });

    saveOrder();

    alert("Order successfully confirmed!");

    Object.keys(orderDictionary).forEach(key => {
      orderDictionary[key] = 0;
    });

    productList.forEach(product => {
      countElements[product.name].textContent = 0;
      itemTotalElements[product.name].textContent = "₱0";
    });

    updateGrandTotal();
  };


  // ADJUSTED EXPORT
  const exportBtn = document.createElement("button");
  exportBtn.textContent = "Export Order";
  exportBtn.classList.add("action-btn");

  exportBtn.onclick = () => {
    if (orderData.length === 0) {
      alert("No orders to export.");
      return;
    }

    const blob = new Blob(
      [JSON.stringify(orderData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "all-orders.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // ADJUSTED IMPORT
  const importInput = document.createElement("input");
  importInput.type = "file";
  importInput.accept = ".json";
  importInput.style.display = "none";

  const importBtn = document.createElement("button");
  importBtn.textContent = "Import Order";
  importBtn.classList.add("action-btn");

  importBtn.onclick = () => importInput.click();

  importInput.onchange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      try {
        const importedOrders = JSON.parse(e.target.result);

        if (!Array.isArray(importedOrders)) {
          alert("Invalid file format.");
          return;
        }

        orderData = importedOrders;
        saveOrder();

        alert("Orders imported successfully!");

      } catch {
        alert("Invalid JSON file.");
      }

      importInput.value = "";
    };

    reader.readAsText(file);
  };


  mainDiv.append(
    orderContainer,
    totalDiv,
    confirmBtn,
    exportBtn,
    importBtn,
    importInput
  );
}
