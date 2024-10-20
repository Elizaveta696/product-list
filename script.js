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
            const listItem = createProductItem(item.category, item.image.desktop, item.name, item.price, item.image.thumbnail);
            listOfProducts.append(listItem);
        });
    }catch(error){
        console.log(error);
    }
}

fetchProducts();

function changeButton(product){

    let button = document.getElementById(`change-button-${product.name}`);
    button.classList = "change-button";
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
    
    document.getElementById(`my-image-${product.name}`).style.border = "2px solid hsl(14, 86%, 42%)";

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

function createProductItem(category, imageSrc, name, price, imageForConfirmation){
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
    image.id = `my-image-${name}`;
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

    let buttonInitialBox = document.createElement('div');
    buttonInitialBox.classList = "initial-button";
    buttonInitialBox.id = `change-button-${name}`;

    const icon = document.createElement('img');
    icon.src = './assets/images/icon-add-to-cart.svg';
    icon.alt = 'Add to cart icon';
    let textButtonContainer = document.createElement('div');
    let buttonInitial = document.createElement('p');
    buttonInitial.innerText = "Add to cart";
    textButtonContainer.append(buttonInitial);
    buttonInitialBox.appendChild(icon);
    buttonInitialBox.append(textButtonContainer);

    listItemContainer.append(imageItem);
    listItemContainer.append(buttonInitialBox);
    listItemContainer.append(categoryItem);
    listItemContainer.append(nameItem);
    listItemContainer.append(priceItem);

    buttonInitialBox.onclick = () => {
        addToCart({ name, price, imageSrc, imageForConfirmation });
    }
    return listItemContainer;
}

function renderCart() {
    const cartBox = document.getElementById('my-order');
    cartBox.innerHTML = '';
    let sum = 0;
    let yourCart = document.createElement('h2');
    yourCart.className ='your-cart';
    yourCart.innerText = `Your Cart(${cart.reduce((sum, item) => sum + item.quantity, 0)})`;
    cartBox.append(yourCart);
    cart.forEach((product) => {
        const cartItemContainer = document.createElement('div');
        cartItemContainer.className = "cart-item-container";

        let cartNameItem = document.createElement('div');
        cartNameItem.className = "cart-name-item";
        let nameItem = document.createElement('p');
        nameItem.className = "name-item";
        nameItem.innerText = product.name;
        cartNameItem.append(nameItem);

        let priceBox = document.createElement('div');
        priceBox.className = "cart-price-box";

        let amountOfProduct = document.createElement('p');
        amountOfProduct.className="amount-of-product";
        amountOfProduct.innerText = product.quantity + 'x';


        let priceItem = document.createElement('p');
        priceItem.innerText = '@$' + product.price.toFixed(2);
        priceItem.className ="confirm-price-item";

        let totalSumItem = document.createElement('p');
        totalSumItem.innerText = '$' + (product.quantity * product.price).toFixed(2);
        totalSumItem.className  ="confirm-total-sum-item";

        let cancelationButton = document.createElement('div');
        cancelationButton.className = 'cancel-button';
        let cancelIcon = document.createElement('img');
        cancelIcon.src = './assets/images/icon-remove-item.svg';
        cancelIcon.alt = 'Cancel Icon';
        cancelationButton.append(cancelIcon);
        sum += product.price*product.quantity;

        priceBox.append(amountOfProduct);
        priceBox.append(priceItem);
        priceBox.append(totalSumItem);
        
        cartNameItem.append(priceBox);

        cartItemContainer.append(cartNameItem);
        cartItemContainer.append(cancelationButton);

        cancelationButton.addEventListener('click', () => removeFromCart(product));

        cartBox.append(cartItemContainer);
    });
    if(cart.length > 0){
        let orderTotal = document.createElement('div');
        orderTotal.className = 'order-total';

        
        let priceTitleItem = document.createElement('div');
        priceTitleItem.className = 'price-title-item';
        let priceTitle = document.createElement('p');
        priceTitle.innerText = 'Order Total';

        let totalPriceItem = document.createElement('div');
        totalPriceItem.className = 'total-price-item';
        let totalPrice = document.createElement('p');
        totalPrice.innerText = '$' + sum.toFixed(2);

        totalPriceItem.append(totalPrice);
        priceTitleItem.append(priceTitle);
        orderTotal.append(priceTitleItem);
        orderTotal.append(totalPriceItem);
        cartBox.append(orderTotal);

        let aboutDelivery = document.createElement('div');
        aboutDelivery.className = 'about-delivery';

        let deliveryIcon = document.createElement('img');
        deliveryIcon.src = './assets/images/icon-carbon-neutral.svg';
        deliveryIcon.alt = 'Carbon Neutral icon';
        let deliveryText = document.createElement('p');
        deliveryText.innerHTML = 'This is a <span class="bold-text">carbon-neutral</span> delivery';

        aboutDelivery.append(deliveryIcon);
        aboutDelivery.append(deliveryText);

        let confirmOrder = document.createElement('div');
        let confirmButton = document.createElement('button');
        confirmButton.className = 'confirm-order';
        confirmButton.innerText = 'Confirm Order';
        confirmOrder.append(confirmButton);

        cartBox.append(aboutDelivery);
        cartBox.append(confirmOrder);

        confirmButton.addEventListener('click', () => showConfirmationAlert());
    } else{
        let emptyImage = document.createElement('img');
        emptyImage.src = './assets/images/illustration-empty-cart.svg';
        let emptyText = document.createElement('p');
        emptyText.innerText = 'Your added items will appear here';

        cartBox.append(emptyImage);
        cartBox.append(emptyText);
    }
}
renderCart();

function showConfirmationAlert() {
    let confirmationAlert = document.getElementById('confirmation-alert');
    confirmationAlert.className = 'confirmation-alert';
    let wholeSum = 0;

    cart.forEach((product) => {
        const confirmItemContainer = document.createElement('div');
        confirmItemContainer.className = "confirm-item-container";
        confirmItemContainer.innerHTML = '';

        let confirmedImageItem = document.createElement('div');
        confirmedImageItem.className = 'confirm-image-item';
        let imageItself = document.createElement('img');
        imageItself.src = product.imageForConfirmation;
        imageItself.alt = 'Product Image'; 
        confirmedImageItem.append(imageItself);

        confirmItemContainer.append(confirmedImageItem);

        let confirmedNameItem = document.createElement('div');
        confirmedNameItem.className = "confirm-name-item";
        let nameItem = document.createElement('p');
        nameItem.innerText = product.name;
        confirmedNameItem.append(nameItem);

        

        let priceContainer = document.createElement('div');
        priceContainer.className = 'confirm-price-container';

        let amountOfProduct = document.createElement('p');
        amountOfProduct.innerText = product.quantity + 'x';
        amountOfProduct.className="amount-of-product";
        priceContainer.append(amountOfProduct);

        let priceItem = document.createElement('p');
        priceItem.innerText = '@$' + product.price.toFixed(2);
        priceItem.className ="confirm-price-item";
        priceContainer.append(priceItem);

        confirmedNameItem.append(priceContainer)
        confirmItemContainer.append(confirmedNameItem);

        let priceBox = document.createElement('div');
        priceBox.className = "confirm-price-box";
        let totalSumItem = document.createElement('p');
        totalSumItem.innerText = '$' + (product.quantity * product.price).toFixed(2);
        totalSumItem.className  ="confirm-total-sum-item"
        priceBox.append(totalSumItem);

        confirmItemContainer.append(priceBox);
        
        wholeSum += product.price*product.quantity;

        confirmationAlert.append(confirmItemContainer);
    });

    let wholeSumContainer = document.createElement('div');
    wholeSumContainer.className = 'whole-sum-container';
    let sumTitle = document.createElement('p');
    sumTitle.innerText = "Order Total";
    sumTitle.className = 'sum-title';
    let wholeSumItem = document.createElement('h2');
    wholeSumItem.className = 'whole-sum-item';
    wholeSumItem.innerText = '$' + wholeSum.toFixed(2);
    
    wholeSumContainer.append(sumTitle);
    wholeSumContainer.append(wholeSumItem);

    confirmationAlert.append(wholeSumContainer);

    let startNewOrderButton = document.createElement('div');
    startNewOrderButton.className = 'start-new-order-button';
    startNewOrderButton.innerText = 'Start New Order';
    startNewOrderButton.addEventListener('click', () => location.reload());

    confirmationAlert.append(startNewOrderButton);

    confirmationAlert.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
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
    document.getElementById(`my-image-${product.name}`).style.borderColor = "white";
    buttonInitial.className = "initial-button";
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
    console.log('removing product:', product.name, product.quantity, product.imageSrc, product.imageForConfirmation);
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