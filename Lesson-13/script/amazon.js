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
        <select>
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
      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart" 
      data-product-name="${product.name}">
        Add to Cart
      </button>
    </div>
  `; // copy all html for 1 product
});

// now put in on the page using DOM.
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// use forEach() to loop through the buttons
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      // now create a cart Array. how do we know which product we are adding? ---> Data Attribute (start: data-)
      const productName = button.dataset.productName;

      // increasing quantity for multiple similar items saving and add to cart for new item on following algorithm
      
      // step 1: check if the product is alreadyin the cart before adding/pushing the product to the cart array.
      let matchingItem;
      cart.forEach((item) => {
        if (productName === item.productName) {
          matchingItem = item;
        }
      });

      // step 2: if it's in the cart, increase the quantity
      if (matchingItem) {
        matchingItem.quantity++;
      } else {
        // step 3: push the product into the array.
        cart.push({
          productName: productName,
          quantity: 1
        });
      }

      
      console.log(cart);
    })
  })

  


  