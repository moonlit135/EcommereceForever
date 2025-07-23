import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { apiService } from '../services/api'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, cartItems, products, getCartAmount } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            // Prepare order items from cart
            let orderItems = [];
            
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = products.find(product => product._id === items);
                        if (itemInfo) {
                            orderItems.push({
                                ...itemInfo,
                                size: item,
                                quantity: cartItems[items][item]
                            });
                        }
                    }
                }
            }

            // Prepare order data
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + 10 // Adding delivery fee
            };

            // No userId needed since authentication is temporarily removed

            // Place order
            const response = await apiService.placeOrder(orderData);
            
            if (response.data.success) {
                toast.success('Order placed successfully!');
                navigate('/orders');
            } else {
                toast.error(response.data.message || 'Failed to place order');
            }
            
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>

            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='First name' 
                        name='firstName'
                        value={formData.firstName}
                        onChange={onChangeHandler}
                        required
                    />
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='Last name' 
                        name='lastName'
                        value={formData.lastName}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="email" 
                    placeholder='Email address' 
                    name='email'
                    value={formData.email}
                    onChange={onChangeHandler}
                    required
                />
                <input 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="text" 
                    placeholder='Street' 
                    name='street'
                    value={formData.street}
                    onChange={onChangeHandler}
                    required
                />
                <div className='flex gap-3'>
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='City' 
                        name='city'
                        value={formData.city}
                        onChange={onChangeHandler}
                        required
                    />
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='State' 
                        name='state'
                        value={formData.state}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <div className='flex gap-3'>
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="number" 
                        placeholder='Zipcode' 
                        name='zipcode'
                        value={formData.zipcode}
                        onChange={onChangeHandler}
                        required
                    />
                    <input 
                        className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                        type="text" 
                        placeholder='Country' 
                        name='country'
                        value={formData.country}
                        onChange={onChangeHandler}
                        required
                    />
                </div>
                <input 
                    className='border border-gray-300 rounded py-1.5 px-3.5 w-full' 
                    type="text" 
                    placeholder='Phone' 
                    name='phone'
                    value={formData.phone}
                    onChange={onChangeHandler}
                    required
                />
            </div>

            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className=' text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
                        </div>
                    </div>
                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm '>PLACE ORDER</button>
                    </div>

                </div>

            </div>

        </form>
    )
}

export default PlaceOrder
