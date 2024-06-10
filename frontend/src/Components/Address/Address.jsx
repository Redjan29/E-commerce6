import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Address.css';
import { Link } from 'react-router-dom';

const Address = () => {
    const [addressData, setAddressData] = useState({
        fullname: '',
        address: '',
        city: '',
        postalcode: '',
        country: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateAddress = () => {
        const newErrors = {};
        const lettersRegex = /^[a-zA-Z\s]+$/;
        const postalCodeRegex = /^\d{5}$/;

        if (!addressData.fullname.trim()) {
            newErrors.fullname = 'This field is required';
        }
        if (!lettersRegex.test(addressData.address)) {
            newErrors.address = 'Only letters are allowed';
        }
        if (!lettersRegex.test(addressData.city)) {
            newErrors.city = 'Only letters are allowed';
        }
        if (!postalCodeRegex.test(addressData.postalcode)) {
            newErrors.postalcode = 'Must be exactly 5 digits';
        }
        if (!addressData.country.trim()) {
            newErrors.country = 'This field is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData({ ...addressData, [name]: value });
    };

    const handleAddressSubmit = (e) => {
        e.preventDefault();
        if (validateAddress()) {
            // Save the address data or handle it as needed
            navigate('/cart/payment');
        }
    };

    return (
        <div className="address-section">
            <h2>Shipping Address</h2>
            <form onSubmit={handleAddressSubmit}>
                <div className="field-group">
                    <label>Full Name *</label>
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Enter full name"
                        value={addressData.fullname}
                        onChange={handleAddressChange}
                    />
                    {errors.fullname && <span className="error">{errors.fullname}</span>}
                </div>
                <div className="field-group">
                    <label>Address *</label>
                    <input
                        type="text"
                        name="address"
                        placeholder="Enter address"
                        value={addressData.address}
                        onChange={handleAddressChange}
                    />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <div className="inline-fields">
                    <div className="field-group">
                        <label>City *</label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Enter city"
                            value={addressData.city}
                            onChange={handleAddressChange}
                        />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                    <div className="field-group">
                        <label>Postal Code *</label>
                        <input
                            type="text"
                            name="postalcode"
                            placeholder="Enter postal code"
                            value={addressData.postalcode}
                            onChange={handleAddressChange}
                        />
                        {errors.postalcode && <span className="error">{errors.postalcode}</span>}
                    </div>
                </div>
                <div className="field-group">
                    <label>Country *</label>
                    <select
                        name="country"
                        value={addressData.country}
                        onChange={handleAddressChange}
                    >
                        <option value="">Select Country</option>
                        <option value="Spain">Spain</option>
                        <option value="Portugal">Portugal</option>
                        <option value="Belgium">Belgium</option>
                        <option value="France">France</option>
                    </select>
                    {errors.country && <span className="error">{errors.country}</span>}
                </div>
                <Link to='/cart/payment'><button type="submit">Next</button></Link>
               
            </form>
        </div>
    );
};

export default Address;
