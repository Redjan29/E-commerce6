import React, { useContext, useState } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [showPayment, setShowPayment] = useState(false); // Ajouter un état pour l'affichage de la section de paiement
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cardnumber: '',
    expirationdate: '',
    cvv: '',
    cardholdername: ''
  });

  const validateForm = () => {
    const newErrors = {};
    const cardNumberRegex = /^\d{16}$/;
    const expirationDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY
    const cvvRegex = /^\d{3}$/;
    const cardholderNameRegex = /^[a-zA-Z\s]+$/;

    if (!cardNumberRegex.test(formData.cardnumber)) {
      newErrors.cardnumber = 'Incorrect entry';
    }
    if (!expirationDateRegex.test(formData.expirationdate)) {
      newErrors.expirationdate = 'Incorrect entry';
    }
    if (!cvvRegex.test(formData.cvv)) {
      newErrors.cvv = 'Incorrect entry';
    }
    if (!cardholderNameRegex.test(formData.cardholdername)) {
      newErrors.cardholdername = 'Incorrect entry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cardnumber" || name === "cvv") {
      if (/^\d*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "expirationdate") {
      if (/^[\d/]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else if (name === "cardholdername") {
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit the form
      console.log('Form submitted', formData);
    }
  };

  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.Id_Produit] > 0) {
          return (
            <div key={e.Id_Produit}>
              <div className="cartitems-format cartitems-format-main">
                <img src={`http://localhost:5001/images/${e.Image}`} alt={e.Titre} className='carticon-product-icon' />
                <p>{e.Titre}</p>
                <p>${e.Prix}</p>
                <button className='cartitems-quantity'>{cartItems[e.Id_Produit]}</button>
                <p>${e.Prix * cartItems[e.Id_Produit]}</p>
                <img className='cartitems-remove-icon' src={remove_icon} onClick={() => { removeFromCart(e.Id_Produit) }} alt="" />
              </div>
              <hr />
            </div>
          )
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button onClick={() => setShowPayment(true)}>PROCEED TO CHECKOUT</button> {/* Ajouter onClick pour afficher la section de paiement */}
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder='promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
      {showPayment && ( // Afficher la section de paiement si showPayment est vrai
        <div className="payment-section">
          <h2>Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="field-group">
              <label>Card number *</label>
              <input 
                type="text" 
                name="cardnumber" 
                placeholder="Enter card number" 
                value={formData.cardnumber} 
                onChange={handleInputChange}
                maxLength="16"
              />
              {errors.cardnumber && <span className="error">{errors.cardnumber}</span>}
            </div>
            <div className="inline-fields">
              <div className="field-group">
                <label>Expiration date *</label>
                <input 
                  type="text" 
                  name="expirationdate" 
                  placeholder="MM / YY" 
                  value={formData.expirationdate} 
                  onChange={handleInputChange}
                  maxLength="5"
                />
                {errors.expirationdate && <span className="error">{errors.expirationdate}</span>}
              </div>
              <div className="field-group">
                <label>CVV *</label>
                <input 
                  type="text" 
                  name="cvv" 
                  placeholder="XXX" 
                  value={formData.cvv} 
                  onChange={handleInputChange}
                  maxLength="3"
                />
                {errors.cvv && <span className="error">{errors.cvv}</span>}
              </div>
            </div>
            <div className="field-group">
              <label>Cardholder name *</label>
              <input 
                type="text" 
                name="cardholdername" 
                placeholder="Enter cardholder name" 
                value={formData.cardholdername} 
                onChange={handleInputChange}
              />
              {errors.cardholdername && <span className="error">{errors.cardholdername}</span>}
            </div>
            <div className="checkbox-group">
              <input type="checkbox" name="savecard" />
              <label>Save card details for next time.</label>
            </div>
            <div className="checkbox-group">
              <input type="checkbox" name="allowcharge" />
              <label>
                I allow <strong>Perry's Pet Place</strong> to directly charge the card for any future purchases. I understand that I can cancel this permission at any time.
                <span className="info-icon">i</span>
              </label>
            </div>
            <button type="submit">Pay Now</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default CartItems;
