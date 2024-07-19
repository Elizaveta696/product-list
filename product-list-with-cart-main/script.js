async function fetchProducts(){
    try{
        const responce = await fetch('./data.json');
        if(!responce.ok){
            throw new Error(responce.status);
        }
        const data = await responce.json();
        console.log(data);
        listOfProducts = document.getElementById('list-of-products');
        data.map((item) => {
            const listitem = createProductItem(item.category, item.image.desktop, item.name, item.price);
            listOfProducts.append(listitem);
        })
    }catch(error){
        console.log(error);
    }
}
fetchProducts();

function createProductItem(category, imageSrc, name, price){
    console.log(category + " " + imageSrc + " " + name + " " + price);
    const listItemContainer = document.createElement('div');
    listItemContainer.className = "list-item-container";

    let categoryItem = document.createElement('div');
    categoryItem.className = "category-item";
    let categoryName = document.createElement('p');
    categoryName.innerText = category;
    categoryItem.append(categoryName);

    let imageItem = document.createElement('div');
    imageItem.className = "image-item";
    const image = document.createElement('img');
    image.src = imageSrc;
    imageItem.append(image);

    let nameItem = document.createElement('div');
    nameItem.className = "name-item";
    let nameFull = document.createElement('p');
    nameFull.innerText = name;
    nameItem.append(nameFull);

    let priceItem = document.createElement('div');
    priceItem.className = "price-item";
    let priceFull = document.createElement('p');
    priceFull.innerText = price;
    priceItem.append(priceFull);

    let buttonInitial = document.createElement('p');
    const icon = document.createElement('img');
    icon.src = './assets/images/icon-add-to-cart.svg';
    const text = document.createTextNode('Add to cart');
    buttonInitial.appendChild(icon);
    buttonInitial.appendChild(text);

    listItemContainer.append(categoryItem);
    listItemContainer.append(imageItem);
    listItemContainer.append(nameItem);
    listItemContainer.append(priceItem);
    listItemContainer.append(buttonInitial);

    buttonInitial.onclick = () => {
        addToCart(name, price, imageSrc);
    }
    return listItemContainer;
}



function addToCart(name, prize, imageSrc) {
    console.log(name + ' ' + prize + ' ' + imageSrc);
}
