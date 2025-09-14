import { cart } from '../../data/cart.js';
import { products,getProduct } from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


export function renderPaymentSummary()
{
    let cartQuantity=0;
    let cartPriceCents=0;
    let shippingPriceCents=0;

        cart.forEach((cartItem) => {
    
          cartQuantity += cartItem.quantity;

          const productId = cartItem.productId;
          const matchProduct=getProduct(productId);

            cartPriceCents += (matchProduct.priceCents * cartItem.quantity);

            const deliveryOptionId= cartItem.deliveryOptionId;
            const deliveryOption= getDeliveryOption(deliveryOptionId);
            
            shippingPriceCents += (deliveryOption.priceCents );

            console.log(shippingPriceCents);
            console.log(cartPriceCents);
            console.log(cartQuantity);

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