import { cart , removeFromCart , updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

export function renderPaymentSummary()
{
    let cartQuantity=0;
    let cartPriceCents=0;
    let shippingPriceCents=0;

        cart.forEach((cartItem) => {
    
          cartQuantity += cartItem.quantity;

          const productId = cartItem.productId;
          let matchProduct;
          products.forEach((p) => {
              if(p.id === productId) {
                matchProduct = p;
              }
            });
            cartPriceCents += (matchProduct.priceCents * cartItem.quantity);

            const deliveryOptionId= cartItem.deliveryOptionId;
              let deliveryOption;
            deliveryOptions.forEach((option) => {
              if(String(option.id) === String(deliveryOptionId))
              {
                deliveryOption=option;
          } 
          });
          shippingPriceCents += (deliveryOption.priceCents );

    });
    pHTML= `
      <div class="payment-summary-title">
                  Order Summary
                </div>

                <div class="payment-summary-row">
                  <div>Items (3):</div>
                  <div class="payment-summary-money">$42.75</div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money">$4.99</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money">$47.74</div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">$4.77</div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money">$52.51</div>
                </div>

                <button class="place-order-button button-primary">
                  Place your order
                </button>

      `
    
}
 const paymentSummaryElement = document.querySelector('.js-payment-summary');
    if (paymentSummaryElement) {
      paymentSummaryElement.innerHTML = pHTML;
    } else {
      console.error("Could not find .js-payment-summary element");
    }