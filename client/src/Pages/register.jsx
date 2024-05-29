import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading,showLoading } from "../Redux/reducer";
import { Form, Input, Button } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'
const url = process.env.REACT_APP_API_URL;

function Register() {
    
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const dispatch = useDispatch()
    const next = useNavigate();

    const handleOnChange = (e) => {
        
        setUserData(prevUserData => ({
            ...prevUserData,
            [e.target.name]:e.target.value
        }));
    };
   
    const handleSubmit = async (e) => {
        
        try {
            dispatch(showLoading())
            const response = await axios.post(`${url}/userregister`, userData);
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to Login Page");
                next('/login');
            } else {
                toast.error(response.data.message);
            }
           
        } catch (error) {
            dispatch(hideLoading())
            toast.error("Something went wrong");
        }
       
    };

    return (
        <div className="authentication">
            <div className="authentication-form card p-4">
                <h1 className="card-title">NICE TO MEET YOU</h1>
                <form layout='vertical' onSubmit={handleSubmit}>
                    
                    <Form.Item>
                        <Input placeholder="Name" name="name" onChange={handleOnChange} value={userData.username} className="p-1 px-4" />
                    </Form.Item>
                    <Form.Item >
                        <Input placeholder="Email" name="email" onChange={handleOnChange} value={userData.email} className="  p-1 px-4"/>
                    </Form.Item>
                    <Form.Item >
                        <Input.Password placeholder="Password" name="password" onChange={handleOnChange} value={userData.password} className="p-1 px-2"/>
                    </Form.Item>
                    <Button type="button" htmlType="submit" className="primary-button" >REGISTER</Button>
                    <Link to='/login' className="anchor mt-6">CLICK HERE TO LOGIN</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
