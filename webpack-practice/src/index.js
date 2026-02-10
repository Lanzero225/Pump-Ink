import "./styles.css";
import { buildCatalog  } from "./catalog.js";
import { buildOrder, saveOrder, orderDictionary } from "./order.js";

   

document.addEventListener('DOMContentLoaded', () => {
    loadHome();
});


function loadHome(){
    const mainDiv = document.getElementById("content");
    buildOrder(mainDiv);    
}

