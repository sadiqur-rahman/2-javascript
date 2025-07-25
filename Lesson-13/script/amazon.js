let productsHTML = ''; // all HTML into this var

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>
      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>
      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>
      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>
      <div class="product-quantity-container">
        <select class="js-product-quantity js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" 
      data-product-id="${product.id}"> 
        Add to Cart
      </button>
    </div>
  `; // copy all html for 1 product
});

// now put in on the page using DOM.
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// step 2
// create an Object to put all the timeout IDs.
// property as productID: timeoutID
const addedMessageTimeouts = {};

// use forEach() to loop through the buttons
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // now create a cart Array. how do we know which product we are adding? ---> Data Attribute (start: data-)
      // const productId = button.dataset.productId;
      const {productId} = button.dataset; // destructuring
      const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`);
      const quantity = Number(quantitySelect.value);
      console.log('Selected Qnt:', quantity);

      // for Increasing Quantity
      let matchingItem;

      cart.forEach((item) => {
        if (productId === item.productId) {
          matchingItem = item;
        }
      });
      // step 2: if it's in the cart, increase the quantity
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        // step 3: push the product into the array.
        cart.push({
          productId,
          quantity
        });
      }
      
      // finding total quantity
      let cartQuantity = 0;

      cart.forEach((item) => {
        cartQuantity += item.quantity;
      })
      
      console.log('Cart Qnt:', cartQuantity);
      console.log('Cart:', cart);

      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

      // timeout handeling section
      // getting productID from added cart pressed item.
      const addedProduct = document.querySelector(`.js-added-to-cart-${productId}`);

      addedProduct.classList.add('js-added-to-cart-visible');
      console.log('Added ProductID:', addedProduct);

      // step 4
      // Check if there's a previous timeout for this product. 
      // If there is, we should stop it. Thus bring it from the object
      const previousTimeOutId = addedMessageTimeouts[productId];

      if(previousTimeOutId) {
        clearTimeout(previousTimeOutId);
      }
      
      // setp 1
      const timeOutId = setTimeout(() => {
        addedProduct.classList.remove('js-added-to-cart-visible');
      }, 2000);

      // step 3
      // Save the timeoutId for this product into the object
      // so we can stop it later if we need to.
      addedMessageTimeouts[productId] = timeOutId;
    })
  })

  


  