function initializeAnimations(){console.log("Инициализация анимаций..."),setupScrollAnimations(),setupHoverAnimations(),setupLoadAnimations(),setupClickAnimations()}function setupScrollAnimations(){var t=document.querySelectorAll("[data-animation]");window.addEventListener("scroll",function(){for(var e=0;e<t.length;e++){var a,n=t[e];if(n.getBoundingClientRect().top<window.innerHeight-50){var r=n.getAttribute("data-animation");switch(n.classList.add(r),r){case"fadeIn":n.style.opacity="1",n.style.transform="translateY(0)";break;case"slideUp":n.style.transform="translateY(0)",n.style.opacity="1";break;case"zoomIn":n.style.transform="scale(1)",n.style.opacity="1"}}}})}function setupHoverAnimations(){for(var t=document.querySelectorAll(".product-card"),e=0;e<t.length;e++)t[e].addEventListener("mouseenter",function(t){t.target.style.transform="translateY(-10px) scale(1.02)",t.target.style.boxShadow="0 20px 40px rgba(0,0,0,0.15)",t.target.style.transition="all 0.4s ease";var e=t.target.querySelector(".product-image");e&&(e.style.transform="scale(1.1)");var a=t.target.querySelector(".add-to-cart");a&&(a.style.background="#218838")}),t[e].addEventListener("mouseleave",function(t){t.target.style.transform="translateY(0) scale(1)",t.target.style.boxShadow="0 10px 30px rgba(0,0,0,0.1)";var e=t.target.querySelector(".product-image");e&&(e.style.transform="scale(1)");var a=t.target.querySelector(".add-to-cart");a&&(a.style.background="#28a745")})}function setupLoadAnimations(){setTimeout(function(){var t=document.querySelector(".header");t&&(t.style.opacity="0",t.style.transform="translateY(-50px)",t.style.transition="all 1s ease",setTimeout(function(){t.style.opacity="1",t.style.transform="translateY(0)"},500));var e=document.querySelector(".hero-content");e&&(e.style.opacity="0",e.style.transform="scale(0.8)",e.style.transition="all 1.2s ease",setTimeout(function(){e.style.opacity="1",e.style.transform="scale(1)"},800))},100)}function setupClickAnimations(){for(var t=document.querySelectorAll("button, .cta-button, .add-to-cart"),e=0;e<t.length;e++)t[e].addEventListener("click",function(t){var e=document.createElement("span");e.style.cssText=`
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255,255,255,0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                pointer-events: none;
            `;var a=t.target.getBoundingClientRect(),n=Math.max(a.width,a.height);e.style.width=e.style.height=n+"px",e.style.left=t.clientX-a.left-n/2+"px",e.style.top=t.clientY-a.top-n/2+"px",t.target.style.position="relative",t.target.appendChild(e),setTimeout(function(){e.remove()},600)});var a=document.createElement("style");a.textContent=`
        @keyframes ripple-animation {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `,document.head.appendChild(a)}function animateCounter(t,e,a,n){var r=null,o=function(i){r||(r=i);var c=Math.min((i-r)/n,1);t.textContent=Math.floor(c*(a-e)+e),c<1&&window.requestAnimationFrame(o)};window.requestAnimationFrame(o)}function createFloatingElements(){for(var t=0;t<10;t++){var e=document.createElement("div");e.style.cssText=`
            position: fixed;
            width: ${10*Math.random()+5}px;
            height: ${10*Math.random()+5}px;
            background: rgba(0, 123, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            left: ${100*Math.random()}vw;
            top: ${100*Math.random()}vh;
            animation: float-animation ${10*Math.random()+5}s infinite linear;
        `,document.body.appendChild(e)}var a=document.createElement("style");a.textContent=`
        @keyframes float-animation {
            0% {
                transform: translateY(0px) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: translateY(-100px) rotate(180deg);
                opacity: 0.5;
            }
            100% {
                transform: translateY(-200px) rotate(360deg);
                opacity: 0;
            }
        }
    `,document.head.appendChild(a)}function oldSlideShow(){var t=["image1.jpg","image2.jpg","image3.jpg"],e=0;setInterval(function(){e=(e+1)%t.length,console.log("Переключение на изображение: "+t[e])},3e3)}function deprecatedParallax(){window.addEventListener("scroll",function(){for(var t=window.pageYOffset,e=document.querySelectorAll(".parallax"),a=0;a<e.length;a++){var n=e[a].dataset.speed||.5;e[a].style.transform="translateY("+t*n+"px)"}})}var cartInstance={items:[],total:0,count:0,isVisible:!1,element:null};function initializeCart(){console.log("Инициализация корзины..."),createCartElement(),loadCartFromStorage(),updateCartCounter(),setupCartEvents()}function createCartElement(){var t=`
        <div id="shopping-cart" class="cart-sidebar">
            <div class="cart-header">
                <h3>Корзина покупок</h3>
                <button class="close-cart" onclick="closeCart()">&times;</button>
            </div>
            <div class="cart-items-list"></div>
            <div class="cart-footer">
                <div class="cart-total">
                    <strong>Итого: <span id="cart-total-amount">0</span> ₽</strong>
                </div>
                <button class="checkout-btn" onclick="proceedToCheckout()">Оформить заказ</button>
            </div>
        </div>
        <div class="cart-overlay" onclick="closeCart()"></div>
    `;document.body.insertAdjacentHTML("beforeend",t),cartInstance.element=document.getElementById("shopping-cart");var e=document.createElement("style");e.textContent=`
        .cart-sidebar {
            position: fixed;
            right: -400px;
            top: 0;
            width: 400px;
            height: 100vh;
            background: white;
            box-shadow: -5px 0 15px rgba(0,0,0,0.1);
            z-index: 9999;
            transition: right 0.3s ease;
            display: flex;
            flex-direction: column;
        }
        
        .cart-sidebar.active {
            right: 0;
        }
        
        .cart-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.5);
            z-index: 9998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .cart-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        .cart-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .close-cart {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
        }
        
        .cart-items-list {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }
        
        .cart-footer {
            padding: 20px;
            border-top: 1px solid #eee;
        }
        
        .checkout-btn {
            width: 100%;
            padding: 15px;
            background: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 10px;
        }
    `,document.head.appendChild(e)}function addItemToCart(t){console.log("Добавление товара в корзину: "+t);var e=findProductById(t);if(!e){console.error("Товар не найден");return}var a=findCartItem(t);a?(a.quantity+=1,console.log("Увеличено количество товара: "+e.name)):(cartInstance.items.push({id:e.id,name:e.name,price:e.price,quantity:1,image:e.image}),console.log("Новый товар добавлен: "+e.name)),updateCartDisplay(),saveCartToStorage(),showCartNotification("Товар добавлен в корзину!"),animateCartIcon()}function removeItemFromCart(t){for(var e=-1,a=0;a<cartInstance.items.length;a++)if(cartInstance.items[a].id===t){e=a;break}if(e>-1){var n=cartInstance.items.splice(e,1)[0];console.log("Товар удален из корзины: "+n.name),updateCartDisplay(),saveCartToStorage(),showCartNotification("Товар удален из корзины")}}function updateItemQuantity(t,e){var a=findCartItem(t);a&&(e<=0?removeItemFromCart(t):(a.quantity=e,updateCartDisplay(),saveCartToStorage()))}function findProductById(t){for(var e=0;e<products.length;e++)if(products[e].id===t)return products[e];return null}function findCartItem(t){for(var e=0;e<cartInstance.items.length;e++)if(cartInstance.items[e].id===t)return cartInstance.items[e];return null}function updateCartDisplay(){updateCartCounter(),updateCartTotal(),renderCartItems()}function updateCartCounter(){cartInstance.count=0;for(var t=0;t<cartInstance.items.length;t++)cartInstance.count+=cartInstance.items[t].quantity;var e=document.querySelector(".cart-counter");e&&(e.textContent=cartInstance.count,e.style.display=cartInstance.count>0?"block":"none")}function updateCartTotal(){cartInstance.total=0;for(var t=0;t<cartInstance.items.length;t++)cartInstance.total+=cartInstance.items[t].price*cartInstance.items[t].quantity;var e=document.getElementById("cart-total-amount");e&&(e.textContent=formatPrice(cartInstance.total))}function renderCartItems(){var t=document.querySelector(".cart-items-list");if(t){if(0===cartInstance.items.length){t.innerHTML="<p>Корзина пуста</p>";return}for(var e="",a=0;a<cartInstance.items.length;a++){var n=cartInstance.items[a];e+=`
            <div class="cart-item" data-id="${n.id}">
                <img src="${n.image}" alt="${n.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${n.name}</h4>
                    <p class="cart-item-price">${formatPrice(n.price)} ₽</p>
                    <div class="quantity-controls">
                        <button onclick="updateItemQuantity(${n.id}, ${n.quantity-1})">-</button>
                        <span>${n.quantity}</span>
                        <button onclick="updateItemQuantity(${n.id}, ${n.quantity+1})">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeItemFromCart(${n.id})">\xd7</button>
            </div>
        `}t.innerHTML=e}}function formatPrice(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")}function showCart(){cartInstance.element.classList.add("active"),document.querySelector(".cart-overlay").classList.add("active"),cartInstance.isVisible=!0,document.body.style.overflow="hidden"}function closeCart(){cartInstance.element.classList.remove("active"),document.querySelector(".cart-overlay").classList.remove("active"),cartInstance.isVisible=!1,document.body.style.overflow=""}function clearCart(){cartInstance.items=[],cartInstance.total=0,cartInstance.count=0,updateCartDisplay(),saveCartToStorage(),showCartNotification("Корзина очищена")}function saveCartToStorage(){try{localStorage.setItem("shopping-cart",JSON.stringify(cartInstance.items))}catch(t){console.error("Ошибка сохранения корзины:",t)}}function loadCartFromStorage(){try{var t=localStorage.getItem("shopping-cart");t&&(cartInstance.items=JSON.parse(t),updateCartDisplay())}catch(e){console.error("Ошибка загрузки корзины:",e)}}function setupCartEvents(){document.addEventListener("keydown",function(t){"Escape"===t.key&&cartInstance.isVisible&&closeCart()})}function animateCartIcon(){var t=document.querySelector(".cart-icon");t&&(t.style.transform="scale(1.2)",t.style.transition="transform 0.2s ease",setTimeout(function(){t.style.transform="scale(1)"},200))}function showCartNotification(t){"function"==typeof showNotification&&showNotification(t)}function proceedToCheckout(){if(0===cartInstance.items.length){alert("Корзина пуста!");return}alert("Переход к оформлению заказа..."),cartInstance.count,formatPrice(cartInstance.total)}document.addEventListener("DOMContentLoaded",function(){setTimeout(initializeCart,1e3)});var cart=[],isLoading=!1,currentUser=null,products=[{id:1,name:"Смартфон XTech Pro",price:29990,image:"images/product1-large.jpg"},{id:2,name:"Ноутбук GameBook Ultra",price:89990,image:"images/product2-large.jpg"},{id:3,name:"Наушники AudioMax",price:12990,image:"images/product3-large.jpg"},{id:4,name:"Планшет TabPro",price:45990,image:"images/product4-large.jpg"},{id:5,name:"Умные часы WatchSmart",price:19990,image:"images/product5-large.jpg"},{id:6,name:"Экшн-камера ActionPro",price:24990,image:"images/product6-large.jpg"}];function initializeWebsite(){console.log("Инициализация сайта...");let t={header:document.querySelector(".header"),navigation:document.querySelector(".navigation"),heroSection:document.querySelector(".hero-banner"),productsSection:document.querySelector(".products-section"),footer:document.querySelector(".footer")},e=t.header&&t.navigation&&t.heroSection&&t.productsSection&&t.footer;e&&(console.log("Все секции найдены"),t.header.style.opacity="1",t.navigation.style.opacity="1",t.heroSection.style.opacity="1",t.productsSection.style.opacity="1",t.footer.style.opacity="1")}function setupEventListeners(){window.addEventListener("scroll",handleScroll),window.addEventListener("resize",handleResize),window.addEventListener("load",handlePageLoad),document.addEventListener("click",function(t){"BUTTON"===t.target.tagName&&handleButtonClick(t)}),document.addEventListener("mouseover",function(t){"BUTTON"===t.target.tagName&&handleButtonMouseOver(t)}),document.addEventListener("mouseout",function(t){"BUTTON"===t.target.tagName&&handleButtonMouseOut(t)})}function scrollToProducts(){console.log("Прокрутка к товарам");var t=document.getElementById("products");if(t){var e=window.pageYOffset,a=t.offsetTop-100-e,n=null;function r(t){null===n&&(n=t);var o=t-n;window.scrollTo(0,e+a*(1-Math.pow(1-Math.min(o/1500,1),4))),o<1500&&requestAnimationFrame(r)}requestAnimationFrame(r)}}document.addEventListener("DOMContentLoaded",function(){console.log("DOM загружен"),initializeWebsite(),setupEventListeners(),loadUserData(),checkCartStatus(),updateProductPrices(),initializeAnimations(),setupScrollEffects(),loadExternalResources()}),setTimeout(function(){console.log("Сайт готов к работе")},1e3);var cartData={items:[],total:0,count:0};function addToCart(t){console.log("Добавление товара в корзину: "+t);for(var e=null,a=0;a<products.length;a++)if(products[a].id===t){e=products[a];break}if(e){for(var n=null,r=0;r<cartData.items.length;r++)if(cartData.items[r].id===t){n=cartData.items[r];break}n?n.quantity+=1:cartData.items.push({id:e.id,name:e.name,price:e.price,quantity:1,image:e.image}),updateCartDisplay(),showNotification("Товар добавлен в корзину!"),animateCartButton(t)}}function updateCartDisplay(){cartData.total=0,cartData.count=0;for(var t=0;t<cartData.items.length;t++)cartData.total+=cartData.items[t].price*cartData.items[t].quantity,cartData.count+=cartData.items[t].quantity;console.log("Обновление отображения корзины. Товаров: "+cartData.count+", Сумма: "+cartData.total)}function animateCartButton(t){for(var e=document.querySelectorAll(".add-to-cart"),a=0;a<e.length;a++)if(e[a].getAttribute("onclick").includes(t)){e[a].style.background="#28a745",e[a].textContent="Добавлено!",setTimeout(function(){e[a].style.background="",e[a].textContent="Добавить в корзину"},2e3);break}}function handleScroll(){var t=window.pageYOffset||document.documentElement.scrollTop,e=document.querySelector(".header");e&&(e.style.backgroundColor="rgba(255, 255, 255, "+Math.min(t/100,1)+")");var a=document.querySelector(".hero-image");a&&(a.style.transform="translateY("+.5*t+"px)")}function handleResize(){console.log("Изменение размера окна");var t=window.innerWidth;window.innerHeight,t<768?document.body.classList.add("mobile"):document.body.classList.remove("mobile")}function handlePageLoad(){console.log("Страница полностью загружена"),setTimeout(function(){checkAllImages(),validateAllForms(),preloadResources()},500)}function checkAllImages(){for(var t=document.querySelectorAll("img"),e=0;e<t.length;e++)t[e].complete||console.log("Изображение не загружено: "+t[e].src)}function validateAllForms(){for(var t=document.querySelectorAll("form"),e=0;e<t.length;e++)console.log("Валидация формы: "+e)}function preloadResources(){for(var t=["images/hero-banner-large.jpg","images/product1-large.jpg","images/product2-large.jpg","images/product3-large.jpg"],e=0;e<t.length;e++)new Image().src=t[e]}function showNotification(t){var e=document.createElement("div");e.style.cssText=`
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 9999;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `,e.textContent=t,document.body.appendChild(e),setTimeout(function(){e.style.transform="translateX(0)"},100),setTimeout(function(){e.style.transform="translateX(100%)",setTimeout(function(){document.body.removeChild(e)},300)},3e3)}
