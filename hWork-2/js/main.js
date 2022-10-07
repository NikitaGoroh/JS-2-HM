const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });

    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }


    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML("beforeend", productObj.render());
        }
    }
    getSum() {
        let s = 0;
        let res = this.goods.reduce((s, item) => s + item.price, 0);
        alert(res);
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list = new ProductList();

list.render();
list.getSum();

class Basket {
    constructor(container = '.cart-block') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._clickBasket()
        this._getBasketItem()
            .then(data => { //data - объект js
                this.goods = data.contents;
                //                 console.log(data);
                this.render()
            })
    };


    _getBasketItem() {

        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new BasketItem();

            block.insertAdjacentHTML("beforeend", productObj.render(product));
        }
    }
    _clickBasket() {
        document.querySelector(".btn-cart").addEventListener('click', () =>
            document.querySelector(this.container).classList.toggle('invisible'))
    }

    addGood() {

    }
    removeGood() {

    }
    changeGood() {

    }


}

class BasketItem {

    render(product, img = 'https://via.placeholder.com/50x50') {
        return `<div class="cart-item" data-id="${product.id_product}">
        <div class="product-bio">
        <img src="${img}" alt="Some image">
        <div class="product-desk">
        <p class="product-title">${product.product_name}<p>
        <p class="product-quantity">Quantity: ${product.quantity}<p>
        <p class="product-single-price">${product.price} each<p>
        </div>
        </div>
        <div class="right-block>
        <p class="product-price">${product.quantity * product.price}$</p>
        <button class="del-btn" data-id=${product.id_product}">x</button>
        </div>
        </div>`
    }
}
new Basket();