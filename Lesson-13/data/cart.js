export const cart = [];

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