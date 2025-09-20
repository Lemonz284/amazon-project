/**
 * Simple test for money-related functions.
 */
import { formatMoney } from "../scripts/utils/money.js";
console.log(formatMoney(2095));
console.log(formatMoney(0));
if(formatMoney(2095)=='$20.95')
{
  
  console.log('passed');
}
else
{
  console.log('fail');
}
