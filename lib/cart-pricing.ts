const FREE_DELIVERY_THRESHOLD = 499;
const DEFAULT_DELIVERY_FEE = 25;
const HANDLING_FEE = 4;

export interface CartPricing {
  deliveryFee: number;
  handlingFee: number;
  grandTotal: number;
  amountForFreeDelivery: number;
}

export function getCartPricing(subtotal: number): CartPricing {
  const deliveryFee =
    subtotal > 0 && subtotal < FREE_DELIVERY_THRESHOLD ? DEFAULT_DELIVERY_FEE : 0;
  const amountForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const grandTotal = subtotal + deliveryFee + HANDLING_FEE;

  return {
    deliveryFee,
    handlingFee: HANDLING_FEE,
    grandTotal,
    amountForFreeDelivery,
  };
}
