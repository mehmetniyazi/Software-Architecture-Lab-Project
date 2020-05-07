//variables


const cartBtn=document.querySelector('.basket-btn');
const iconBtn=document.querySelector('.bar-icondo');
const closeCartBtn=document.querySelector('.close-cart');
const clearCartBtn=document.querySelector('.clear-cart');
const cartDOM=document.querySelector('.cart');
const cartOverlay=document.querySelector('.cart-overlay');
const cartItems=document.querySelector('.basket-items');
const cartTotal=document.querySelector('.cart-total');
const cartContent=document.querySelector('.cart-content');
const productsDOM=document.querySelector('.products-center');
const kukiDOM=document.querySelector('.kuki-center');

  


let cart =[];
let buttonsDOM=[];  


class UI{
    displayProduct(products){
        let result='';
        products.forEach(product => {
            result+=`
            <article class="product">
                <div class="class img-container">
                    <img src=${product.image} alt="product"
                    class="product-img">                    
                </div>                
                <h3>${product.title}</h3>
                <hr style="border: 2px solid #2980b9 ;width:50%;border-radius:2px;">
                <h4>$${product.price}</h4>
                <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                </button>
            </article>
            `;       
        });
        productsDOM.innerHTML=result;


    }
    displayCookies(products){
        let re=``;
        products.forEach(product => {
            re+=`
            <article class="product">
                <div class="class img-container">
                    <img src=${product.image} alt="product"
                    class="product-img">                    
                </div>                
                <h3>${product.title}</h3>
                <hr style="border: 2px solid #2980b9 ;width:50%;border-radius:2px;">
                <h4>$${product.price}</h4>
                <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                </button>
            </article>
            `;  
        });
        console.log(re)
        kukiDOM.innerHTML=re;


    }
    displayProduct(products){
        let result='';
        products.forEach(product => {
            result+=`
            <article class="product">
                <div class="class img-container">
                    <img src=${product.image} alt="product"
                    class="product-img">                    
                </div>                
                <h3>${product.title}</h3>
                <hr style="border: 2px solid #2980b9 ;width:50%;border-radius:2px;">
                <h4>$${product.price}</h4>
                <button class="bag-btn" data-id=${product.id}>
                        <i class="fas fa-shopping-cart"></i>
                        add to bag
                </button>
            </article>
            `;       
        });
        productsDOM.innerHTML=result;


    }
    getBagButtons(){ 
        const buttons=[...document.querySelectorAll(".bag-btn")];
        buttonsDOM=buttons;
        buttons.forEach(button =>{
            let id = button.dataset.id;
            let inCart=cart.find(item => item.id ===id);
            if(inCart){
                button.innerText="In Cart";
                button.disabled = true;
            }
            button.addEventListener('click',(event)=>{
                event.target.innerText="In Cart";
                event.target.disabled=true;

                let cartItem={...Storage.getProduct(id),amount:1};
                cart=[...cart,cartItem];
                Storage.saveCart(cart);
                this.setCartValues(cart);   
                this.addCartItem(cartItem);                            
            });
        });
    }
    setCartValues(cart){
        let tempTotal=0;
        let itemsTotal=0;
        cart.map(item=>{
            tempTotal+=item.price*item.amount;
            itemsTotal+=item.amount;
        })
        cartTotal.innerText=parseFloat(tempTotal.toFixed(2));
        cartItems.innerText = itemsTotal;       
    }
    addCartItem(item){
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`
        <img src=${item.image} alt="product"/>
        <div>
            <h4>${item.title}</h4>
            <h5>$${item.price}</h5>
            <span class="remove-item" data-id=${item.id}>remove</span>
        </div>
        <div>
            <i class="fas fa-chevron-up" data-id=${item.id}></i>
            <p class="item-amount">${item.amount}</p>
            <i class="fas fa-chevron-down" data-id=${item.id}></i>
        </div>
        <hr style="border: 2px solid rgb(188, 226, 224) ;width:580%;border-radius:2px;">
        
        `;
        cartContent.appendChild(div);

    }
    showCart(){
        cartOverlay.classList.add('transparentBcg');
        cartDOM.classList.add('showCart');
    }
    iconClick(){
        location.replace("../templates/indexe.html");
    }
    iconClicked(){
        location.replace("../contacted.html");
    }
    setupApp(){
        cart=Storage.getCart();
        this.setCartValues(cart);
        this.populateCart(cart); 
        cartBtn.addEventListener('click',this.showCart);
        iconBtn.addEventListener('click',this.iconClicked);
        closeCartBtn.addEventListener('click',this.hideCart);
    }
    populateCart(cart){
        cart.forEach(item=>this.addCartItem(item));

    }
    hideCart(){
        cartOverlay.classList.remove('transparentBcg');
        cartDOM.classList.remove('showCart');
    }
    cartLogic(){
        clearCartBtn.addEventListener('click',()=>{
            console.log("lets do this");
            
            this.clearCart();
        });
        
        cartContent.addEventListener('click',event=>{
            
            if(event.target.classList.contains("remove-item")){
                let removeItem=event.target;
                let id=removeItem.dataset.id;
                cartContent.removeChild(removeItem.parentElement.parentElement);
                this.removeItem(id);         
            }else if(event.target.classList.contains("fa-chevron-up")){
                let addAmount=event.target;
                let id=addAmount.dataset.id;
                let tempItem=cart.find(item =>item.id===id);
                tempItem.amount=tempItem.amount +1;
                Storage.saveCart(cart);
                this.setCartValues(cart);
                addAmount.nextElementSibling.innerText = tempItem.amount;
            }else if (event.target.classList.contains("fa-chevron-down")) {
                let lowerAmount=event.target;
                let id=lowerAmount.dataset.id;
                let tempItem =cart.find(item=> item.id===id);
                
                if(tempItem.amount>1){
                    tempItem.amount=tempItem.amount -1;
                    Storage.saveCart(cart);
                    this.setCartValues(cart);
                    lowerAmount.previousElementSibling.innerText=tempItem.amount; 
                }               
            }
            
        });

    }

    clearCart(){
        let cartItems= cart.map(item => item.id);
        cartItems.forEach(id=> this.removeItem(id));
        console.log(cartContent.children);
        while(cartContent.children.length>0){
            cartContent.removeChild(cartContent.children[0]);    
        }
        
        console.log(cartContent.children);
        this.hideCart();
    }
    removeItem(id){
        cart = cart.filter(item=> item.id!==id);
        this.setCartValues(cart);
        Storage.saveCart(cart);
        let button = this.getSingleButton(id);
        button.disabled=false;
        button.innerHTML=`<i class="fas fa-shopping-cart">add to bag</i>`;
    }
    getSingleButton(id){
        return buttonsDOM.find(button=> button.dataset.id===id);
    }

}

class Products{
    async getProducts(){
        let data={
            "items": [
            {
                "sys": { "id": "1" },
                "fields": {
                "title": "ESPRESSO ROAST",
                "price": 10.99,
                "image": { "fields": { "file": { "url":"../static/images/product-1.jpeg" } } }
                }
            },
            {
                "sys": { "id": "2" },
                "fields": {
                "title": "STARBUCKS® BLONDE ESPRESSO ROAST",
                "price": 12.99,
                "image": { "fields": { "file": { "url": "../static/images/product-2.jpeg" } } }
                }
            },
            {
                "sys": { "id": "3" },
                "fields": {
                "title": "BREAKFAST BLEND",
                "price": 12.99,
                "image": { "fields": { "file": { "url": "../static/images/product-3.jpeg" } } }
                }
            },
            {
                "sys": { "id": "4" },
                "fields": {
                "title": "STARBUCKS® ESSENTIAL VITAMINS",
                "price": 14.99,
                "image": { "fields": { "file": { "url": "../static/images/product-4.jpeg" } } }
                }
            },
            {
                "sys": { "id": "5" },
                "fields": {
                "title": "COSTA RICA BLEND",
                "price": 10.99,
                "image": { "fields": { "file": { "url": "../static/images/product-5.jpeg" } } }
                }
            },
            {
                "sys": { "id": "6" },
                "fields": {
                "title": "KENYA AFRICAN BLEND",
                "price": 12.99,
                "image": { "fields": { "file": { "url": "../static/images/product-6.jpeg" } } }
                }
            },
            {
                "sys": { "id": "7" },
                "fields": {
                "title": "DECAF CAFFÈ VERONA",
                "price": 15.99,
                "image": { "fields": { "file": { "url": "../static/images/product-7.jpeg" } } }
                }
            },
            {
                "sys": { "id": "8" },
                "fields": {
                "title": "DECAF HOUSE BLEND",
                "price": 13.99,
                "image": { "fields": { "file": { "url": "../static/images/product-8.jpeg" } } }
                }
            },
            {
                "sys": { "id": "9" },
                "fields": {
                "title": "ORGANIC FRENCH ROAST",
                "price": 9.99,
                "image": { "fields": { "file": { "url": "../static/images/product-9.jpeg" } } }
                }
            },
            {
                "sys": { "id": "10" },
                "fields": {
                "title": "ITALIAN ROAST",
                "price": 9.99,
                "image": { "fields": { "file": { "url": "../static/images/product-10.jpeg" } } }
                }
            },
            {
                "sys": { "id": "11" },
                "fields": {
                "title": "MORNING JOE",
                "price": 7.99,
                "image": { "fields": { "file": { "url": "../static/images/product-11.jpeg" } } }
                }
            },
            {
                "sys": { "id": "12" },
                "fields": {
                "title": "ORGANIC YUKON BLEND",
                "price": 8.99,
                "image": { "fields": { "file": { "url": "../static/images/product-12.jpeg" } } }
                }
            },
            {
                "sys": { "id": "13" },
                "fields": {
                "title": "Decaf House Blend",
                "price": 13.99,
                "image": { "fields": { "file": { "url": "../static/images/product-13.jpeg" } } }
                }
            },
            {
                "sys": { "id": "14" },
                "fields": {
                "title": "Dessert Blend",
                "price": 13.99,
                "image": { "fields": { "file": { "url": "../static/images/product-14.jpeg" } } }
                }
            },
            {
                "sys": { "id": "15" },
                "fields": {
                "title": "Savory Mornings Blend",
                "price": 13.99,
                "image": { "fields": { "file": { "url": "../static/images/product-15.jpeg" } } }
                }
            },
            {
                "sys": { "id": "16" },
                "fields": {
                "title": "LEMON COOKIES WITH WHITE CHOCOLATE AND MINT",
                "price": 6.99,
                "image": { "fields": { "file": { "url":"../static/images/cookies-1.jpeg" } } }
                }
            },
            {
                "sys": { "id": "17" },
                "fields": {
                "title": "MILANO COOKIES WITH ORANGE CHOCOLATE",
                "price": 11.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-2.jpeg" } } }
                }
            },
            {
                "sys": { "id": "18" },
                "fields": {
                "title": "PEPPERMINT PATTIES ",
                "price": 5.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-3.jpeg" } } }
                }
            },
            {
                "sys": { "id": "19" },
                "fields": {
                "title": "ORANGE SESAME CIRCLE COOKIES",
                "price": 8.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-4.jpeg" } } }
                }
            },
            {
                "sys": { "id": "20" },
                "fields": {
                "title": "LIME PECAN SANDIES",
                "price": 7.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-5.jpeg" } } }
                }
            },
            {
                "sys": { "id": "21" },
                "fields": {
                "title": "VANILLA ICE WINE TEA COOKIES",
                "price": 12.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-6.jpeg" } } }
                }
            },
            {
                "sys": { "id": "22" },
                "fields": {
                "title": "GINGER GINGER GINGERSNAPS",
                "price": 8.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-7.jpeg" } } }
                }
            },
            {
                "sys": { "id": "23" },
                "fields": {
                "title": "SALTY SESAME AND DARK CHOCOLATE",
                "price": 9.99,
                "image": { "fields": { "file": { "url": "../static/images/cookies-8.jpeg" } } }
                }
            }
            ]
        };
        let products=data.items;
        products=products.map(item=>{
            const {title,price,}=item.fields;
            const {id}=item.sys;
            const image=item.fields.image.fields.file.url;
            return {title,price,id,image}
        })
        return products;
        }
        async getCookies(){
            let datas={
                "items": [
                
                
                ]
            };
            let cookc=datas.items;
            cookc=cookc.map(item=>{
                const {title,price,}=item.fields;
                const {id}=item.sys;
                const image=item.fields.image.fields.file.url;
                return {title,price,id,image}
            })
            return cookc;
            }
    
          
}
class Storage{
    static saveProduct(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
    static getProduct(id){
        let products = JSON.parse(localStorage.getItem('products'));
        return products.find(product => product.id===id);
    }
    static getCookies(id){
        let cookies = JSON.parse(localStorage.getItem('cookies'));
        return cookies.find(cook => cook.id===id);
    }
    static saveCart(cart){
        localStorage.setItem('cart',JSON.stringify(cart));
    }
    static getCart(){
        return localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[];
    }
}

document.addEventListener("DOMContentLoaded",()=>{

    const ui=new UI();
    const products=new Products();
    ui.setupApp();
    //get all product
    products.getProducts().then(products =>{ui.displayProduct(products)
    Storage.saveProduct(products);
    }
    ).then(()=>{
        ui.getBagButtons();
        ui.cartLogic();
    });

    })

   



 