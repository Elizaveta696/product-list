let cart = [];

async function fetchProducts(){
    try{
        const response = await fetch('./data.json');
        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data);
        const listOfProducts = document.getElementById('list-of-products');
        data.forEach((item) => {
            const listItem = createProductItem(item.category, item.image.desktop, item.name, item.price);
            listOfProducts.append(listItem);
        });
    }catch(error){
        console.log(error);
    }
}
fetchProducts();

function changeButton(product){
    let button = document.getElementById(`change-button-${product.name}`);
    button.innerHTML = '';

    let removeItem = document.createElement('div');
    removeItem.className = 'remove-icon';
    const removeIcon = document.createElement('img');
    removeIcon.src = 'assets/images/icon-decrement-quantity.svg';
    removeIcon.alt ='remove';
    removeItem.append(removeIcon);

    removeItem.onclick = (e) => {
        e.stopPropagation();
        if(product.quantity > 1){
            product.quantity--;
            updateCart(product);
            changeButton(product);
        } else{
            removeFromCart(product);
        }
    }

    let quantityItem = document.createElement('div');
    quantityItem.className = 'quantity-item';
    let quantityValue = document.createElement('p');
    quantityValue.innerText = product.quantity;
    quantityItem.append(quantityValue);

    quantityItem.onclick = (e) => {
        e.stopPropagation();
    }

    let addItem = document.createElement('div');
    addItem.className = 'add-icon';
    const addIcon = document.createElement('img');
    addIcon.src = './assets/images/icon-increment-quantity.svg';
    addIcon.alt = 'add';
    addItem.append(addIcon);

    addItem.onclick = (e) => {
        e.stopPropagation();
        product.quantity++;
        updateCart(product);
        changeButton(product);
    }

    button.append(removeItem);
    button.append(quantityItem);
    button.append(addItem);
}

function createProductItem(category, imageSrc, name, price){
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
    buttonInitial.id = `change-button-${name}`;
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
        addToCart({ name, price, imageSrc });
    }
    return listItemContainer;
}

function renderCart() {
    const cartBox = document.getElementById('my-order');
    cartBox.innerHTML = '';
    cart.forEach((product) => {
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
        amountOfProduct.innerText = product.quantity + 'x';

        let priceItem = document.createElement('p');
        priceItem.innerText = '@ $' + product.price;
        let totalSumItem = document.createElement('p');
        totalSumItem.innerText = '$' + (product.quantity * product.price);

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

        cancelationButton.addEventListener('click', () => removeFromCart(product));

        cartBox.append(cartItemContainer);
    });
}

function addToCart(product){
    const cartItem = cart.find(item => item.name === product.name);
    if(cartItem){
        cartItem.quantity += 1;
    } else{
        product.quantity = 1;
        cart.push(product);
    }
    console.log("Cart:", cart);
    renderCart();
    changeButton(product);
}

function updateCart(product) {
    const cartItem = cart.find(item => item.name === product.name);
    if (cartItem) {
        cartItem.quantity = product.quantity;
    }
    console.log("Cart:", cart);
    renderCart();
}

function makeButtonInitial(product){
    let buttonInitial = document.getElementById(`change-button-${product.name}`);
    buttonInitial.innerHTML = '';

    const icon = document.createElement('img');
    icon.src = './assets/images/icon-add-to-cart.svg';
    icon.alt = 'Add to cart icon';
    const text = document.createTextNode('Add to cart');
    buttonInitial.appendChild(icon);
    buttonInitial.appendChild(text);

    buttonInitial.onclick = () => {
        addToCart(product);
    }
}

function removeFromCart(product) {
    console.log('removing product:', product.name, product.quantity);
    const cartItem = cart.find(item => item.name === product.name);
    if(cartItem.quantity > 1){
        cartItem.quantity -= 1;
        updateCart(cartItem);
        changeButton(cartItem);
    } else{
        cart.splice(cart.indexOf(cartItem), 1);
        makeButtonInitial(product);
    }
    renderCart();
}
