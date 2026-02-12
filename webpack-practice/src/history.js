export function buildHistory(mainDiv) {
  mainDiv.classList.add("history-app");

  const title = document.createElement("h2");
  title.textContent = "Order History";

  const orders = JSON.parse(localStorage.getItem("orderData")) || [];

  const container = document.createElement("div");
  container.classList.add("history-container");

  if (orders.length === 0) {
    const empty = document.createElement("p");
    empty.textContent = "No orders found.";
    container.append(empty);
  } else {
    // Newest first
    orders.slice().reverse().forEach((order, index) => {
      const card = document.createElement("div");
      card.classList.add("history-card");

      const header = document.createElement("div");
      header.classList.add("history-header");
      header.textContent = `Order #${orders.length - index} — ${order.customer.date}`;

      const itemList = document.createElement("ul");

      Object.entries(order.items).forEach(([name, qty]) => {
        if (qty > 0) {
          const li = document.createElement("li");
          li.textContent = `${name} × ${qty}`;
          itemList.append(li);
        }
      });

      const total = document.createElement("div");
      total.classList.add("history-total");
      total.textContent = `Total: ₱${order.total}`;

      card.append(header, itemList, total);
      container.append(card);
    });
  }

  mainDiv.append(title, container);
}
