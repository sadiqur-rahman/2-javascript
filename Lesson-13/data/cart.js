export const cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

// adding items into cart
export function addToCart(productId, quantity) {
  // for Increasing Quantity
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
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
}