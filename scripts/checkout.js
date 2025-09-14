import { cart , removeFromCart , updateDeliveryOption} from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';

renderOrderSummary();  
renderPaymentSummary();