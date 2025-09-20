import { cart,updateDeliveryOption,removeFromCart } from '../../data/cart.js';
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

    });
    const totalBeforeTaxCents= cartPriceCents + shippingPriceCents;
    const taxCents = Math.round(totalBeforeTaxCents * 0.10);
    const totalCents = totalBeforeTaxCents + taxCents;

            
            console.log(cartPriceCents);
            console.log(shippingPriceCents);
            console.log(cartQuantity);
            console.log(totalBeforeTaxCents);
            console.log(taxCents);
            console.log(totalCents);
 
    const paymentHTML= `
      <div class="payment-summary-title">
                  Order Summary
                </div>

                <div class="payment-summary-row">
                  <div>Items (${cartQuantity}):</div>
                  <div class="payment-summary-money">${formatMoney(cartPriceCents)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div class="payment-summary-money"> ${formatMoney(shippingPriceCents)}</div>
                </div>

                <div class="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div class="payment-summary-money"> ${formatMoney(totalBeforeTaxCents)}</div>
                </div>

                <div class="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div class="payment-summary-money">
                   ${formatMoney(taxCents)}
                  </div>
                </div>

                <div class="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div class="payment-summary-money"> ${formatMoney(totalCents)}</div>
                </div>

                <button class="place-order-button button-primary">
                  Place your order
                </button>

      `;
  document.querySelector('.js-payment-summary').innerHTML=paymentHTML;
}
 