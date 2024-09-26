let iconCart = document.querySelector('.icon-cart');
let body = document.querySelector('body');
let close = document.querySelector('.close');
let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');

let listProduct = [];
let carts = [];

iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

close.addEventListener('click', () => {
    body.classList.toggle('showCart');
});

const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if (listProduct.length > 0) {
        listProduct.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">R${product.price}</div>
                <button class="cart">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let targetElement = event.target;

    while (targetElement && !targetElement.classList.contains('cart')) {
        targetElement = targetElement.parentElement;
    }

    if (targetElement) {
        let product_id = targetElement.parentElement.dataset.id;
        addToCart(product_id);
    }
});

const addToCart= (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <=0 ){
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        })
    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }

    addCartToHTML();
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;  // Initialize totalPrice variable
    if (carts.length > 0) {
        carts.forEach(cart => {
            totalQuantity += cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            let positionProduct = listProduct.findIndex((value) => value.id == cart.product_id);
            let info = listProduct[positionProduct];

            // Calculate total price for this item
            let itemTotalPrice = info.price * cart.quantity;
            totalPrice += itemTotalPrice; // Add to totalPrice

            newCart.innerHTML = `
                <div class="image">
                    <img src="${info.image}" alt="">
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">
                    R${itemTotalPrice}
                </div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${cart.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
            listCartHTML.appendChild(newCart); 
        });
    }
    iconCartSpan.innerText = totalQuantity;

    // Update the total price display
    document.getElementById('total-price').innerText = totalPrice.toFixed(2); // Update total price
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus' || positionClick.classList.contains('plus'))){
        
    }
})

const initApp = () => {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            listProduct = data;
            console.log(listProduct); 
            addDataToHTML();
        })
    }

initApp(); 
