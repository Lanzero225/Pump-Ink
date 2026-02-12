import "./styles.css";
import { buildHistory } from "./history.js";
import { buildOrder } from "./order.js";

function loadPage(builder) {
  const mainDiv = document.getElementById("content");
  if (!mainDiv) return;

  mainDiv.innerHTML = "";
  builder(mainDiv);
}

const loadHome = () => loadPage(buildOrder);
const loadHistory = () => loadPage(buildHistory);

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("homeBtn").onclick = loadHome;
  document.getElementById("historyBtn").onclick = loadHistory;

  loadHome();
});
