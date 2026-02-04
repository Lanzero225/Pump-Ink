import "./styles.css";
import { buildCatalog  } from "./catalog.js";
import { buildOrder, saveOrder, orderDictionary } from "./order.js";

   

document.addEventListener('DOMContentLoaded', () => {

});

document.getElementById("home-button").onclick = loadHome;
document.getElementById("catalog-button").onclick = loadCatalog;
document.getElementById("order-button").onclick = loadOrder;

function clearContent(){
    const mainDiv = document.getElementById("content");
    mainDiv.innerHTML="";
}

function loadHome(){
    clearContent();
    
}


function loadCatalog(){
    clearContent();
    const mainDiv = document.getElementById("content");
    buildCatalog(mainDiv);
}



function loadOrder(){
    clearContent();
    const mainDiv = document.getElementById("content");
    buildOrder(mainDiv);
 
}