let productsHTML = '';

// Generate HTML for all products
products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image" src="${product.image}">
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
          ${[...Array(10)].map((_, i) => 
            `<option value="${i+1}" ${i===0?'selected':''}>${i+1}</option>`
          ).join('')}
        </select>
      </div>
      <div class="product-spacer"></div>
      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png"> Added
      </div>
      <button class="add-to-cart-button button-primary js-add-to-cart"
              data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

// Render products to page
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Add click handlers to all "Add to Cart" buttons
document.querySelectorAll('.js-add-to-cart').forEach((button) => {
  button.addEventListener('click', () => {
    const { productId } = button.dataset;

    // Get selected quantity
    const quantitySelect = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelect.value);

    // Update cart
    let matchingItem = cart.find(item => item.productId === productId);
    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    // Update cart quantity display
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.js-cart-quantity').innerHTML = totalQuantity;

    // Show "Added" badge
    const addedProduct = document.querySelector(`.js-added-to-cart-${productId}`);
    addedProduct.classList.add('js-added-to-cart-visible');

    // Handle timer: cancel old, start new
    if (addedProduct.timeoutId) {
      clearTimeout(addedProduct.timeoutId);
    }
    addedProduct.timeoutId = setTimeout(() => {
      addedProduct.classList.remove('js-added-to-cart-visible');
    }, 2000);
  });
});
