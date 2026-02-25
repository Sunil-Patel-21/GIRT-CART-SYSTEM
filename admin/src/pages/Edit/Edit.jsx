import React, { useState, useEffect } from 'react';
import "./Edit.css";
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from 'react-router-dom';

const Edit = ({url}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const giftData = location.state?.gift;

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Flowers"
    });

    useEffect(() => {
        if (giftData) {
            setData({
                name: giftData.name,
                description: giftData.description,
                price: giftData.price,
                category: giftData.category
            });
        }
    }, [giftData]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("id", giftData._id);
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        if (image) formData.append("image", image);
        
        try {
            const response = await axios.post(`${url}/api/gift/update`, formData);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/list');
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error updating gift:', error);
            toast.error('Failed to update gift');
        }
    };

    return (
        <div className='add'>
            <form onSubmit={onSubmitHandler} className='flex-col'>
                <div className='add-img-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : `${url}/images/${giftData?.image}`} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type-here' required />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} value={data.category} name="category">
                            <option value="Flowers">Flowers</option>
                            <option value="Chocolates">Chocolates</option>
                            <option value="Cakes">Cakes</option>
                            <option value="Toys">Toys</option>
                            <option value="Personalized">Personalized</option>
                            <option value="Jewelry">Jewelry</option>
                            <option value="Gift Hampers">Gift Hampers</option>
                            <option value="Greeting Cards">Greeting Cards</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='Rs.200' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>UPDATE</button>
            </form>
        </div>
    );
};

export default Edit;
