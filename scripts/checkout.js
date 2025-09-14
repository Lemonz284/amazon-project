import { cart , removeFromCart , updateDeliveryOption} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatMoney } from './utils/money.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; 


  
let cartHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;


  let matchProduct;
  products.forEach((p) => {
      if(p.id === productId) {
        matchProduct = p;
      }
    });
   console.log('Found matching product:', matchProduct);

  const deliveryOptionId= cartItem.deliveryOptionId;
  let deliveryOption;
 deliveryOptions.forEach((option) => {
  if(String(option.id) === String(deliveryOptionId))
  {
    deliveryOption=option;
  }
 });

 console.log('Found delivery option:', deliveryOption);

    // Check if we found the delivery option
    if (!deliveryOption) {
      console.error('Delivery option not found for ID:', deliveryOptionId);
      return; // Skip this item
    }
  
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
  const dateString =  deliveryDate.format('dddd, MMMM D');

cartHTML += `
        <div class="cart-item-container js-cart-item-container-${matchProduct.id}" >
          <div class ="delivery-date js-delivery-date">
            Delivery date: ${dateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchProduct.name}
              </div>
              <div class="product-price">
                ${formatMoney(matchProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">
                  ${cartItem.quantity}
                  </span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchProduct, cartItem)}
          </div>
        </div>
      </div>
`;
});

function deliveryOptionsHTML(matchProduct, cartItem)
{ 
  let delHTML='';
  

  deliveryOptions.forEach((deliveryOption) => { 
    const today=dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString =  deliveryDate.format('dddd, MMMM D');
    const priceString =deliveryOption.priceCents ===0 ? 'Free' : 
    `$${formatMoney(deliveryOption.priceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId ;

    delHTML +=`
         <div class="delivery-option js-delivery-option" 
         data-product-id="${matchProduct.id}"
         data-delivery-option-id="${deliveryOption.id}">
                  <input type="radio" 
                    ${isChecked ? 'checked' : '' }
                    class="delivery-option-input"
                    name="delivery-option-${matchProduct.id}">
                    <div>  
                <div class="delivery-option-date">
                      ${dateString}
                </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                </div>
          </div>
             
    `
    

  });
  return delHTML; 
}

const orderSummaryElement = document.querySelector('.js-order-summary');
if (orderSummaryElement) {
  orderSummaryElement.innerHTML = cartHTML;
} else {
  console.error("Could not find .js-order-summary element");
}


document.querySelectorAll('.js-delete-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', (event) => {
    
    const productId = deleteLink.dataset.productId; 
    removeFromCart(productId);

    // const cartItemContainer = event.target.closest('.cart-item-container');
    const cartItemContainer =document.querySelector(`.js-cart-item-container-${productId}`);
    cartItemContainer.remove();


  });  
});

document.querySelectorAll('.js-delivery-option').forEach((element)=>
{
  element.addEventListener('click',()=>
  {
    const productId= element.dataset.productId;
    const deliveryOptionId= element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);

    location.reload();
  });
});

  