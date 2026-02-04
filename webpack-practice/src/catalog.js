
//Setting the movie

class Product{
    constructor(name, size, price, category){
        this.name = name;
        this.size = size;
        this.price = price;
        this.category = category;
        this.inventory = 0;
        this.sold = 0;
    }
}



export function buildCatalog(mainDiv){
    const menuContainer = document.createElement('div');
    menuContainer.classList.add("menu-div");

} 