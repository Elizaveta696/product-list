let cart = [];

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
    priceFull.innerText = '$' + price;
    priceItem.append(priceFull);

    let buttonInitial = document.createElement('p');
    const icon = document.createElement('img');
    icon.src = './assets/images/icon-add-to-cart.svg';
    icon.alt = 'Add to cart icon';
    const text = document.createTextNode('Add to cart');
    buttonInitial.appendChild(icon);
    buttonInitial.appendChild(text);

    listItemContainer.append(categoryItem);
    listItemContainer.append(imageItem);
    listItemContainer.append(nameItem);
    listItemContainer.append(priceItem);
    listItemContainer.append(buttonInitial);

    buttonInitial.onclick = () => {
        addToCart({name, price, imageSrc});
    }
    return listItemContainer;
}



function renderCart() {
    const cartBox = document.getElementById('my-order');
    cartBox.innerHTML = '';
    cart.forEach((product, index) => {
        console.log(product.name + ' ' + product.price + ' ' + product.imageSrc);
        const cartItemContainer = document.createElement('div');
        cartItemContainer.className = "cart-item-container";

        let cartNameItem = document.createElement('div');
        cartNameItem.className = "cart-name-item";
        let nameItem = document.createElement('p');
        nameItem.innerText = product.name;
        cartNameItem.append(nameItem);

        let priceBox = document.createElement('div');
        priceBox.className = "cart-price-box";

        let amountOfProduct = document.createElement('p');
        let count = 2;
        amountOfProduct = count + 'x';

        let priceItem = document.createElement('p');
        priceItem.innerText = '@ $' + product.price;
        let totalSumItem = document.createElement('p');
        totalSumItem.innerText = '$' + count*product.price;

        let cancelationButton = document.createElement('button');
        cancelationButton.className = 'cancel-button';
        let cancelIcon = document.createElement('img');
        cancelIcon.src = './assets/images/icon-remove-item.svg';
        cancelIcon.alt = 'Cancel Icon';
        cancelationButton.append(cancelIcon);

        priceBox.append(amountOfProduct);
        priceBox.append(priceItem);
        priceBox.append(totalSumItem);
        priceBox.append(cancelationButton);

        cartItemContainer.append(cartNameItem);
        cartItemContainer.append(priceBox);
        
        cancelationButton.addEventListener('click', () => removeFromCart(index));

        cartBox.append(cartItemContainer);
    });
}

function addToCart(product){
    cart.push(product);
    renderCart();
}

function removeFromCart(index) {
    console.log('removing product of index:' + index);
    cart.splice(index,1);
    renderCart();
}