import React from "react";
import { useState } from "react";
import { Form,Input} from 'antd'
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'
import { useSelector } from "react-redux";
const url = process.env.REACT_APP_API_URL;
function Login(){
    // const {loading} = useSelector(state => state.alerts)
    // console.log(loading)
    const [userData, setUserData] = useState({
       
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleOnChange = (e) => {
        
        setUserData(prevUserData => ({
            ...prevUserData,
            [e.target.name]:e.target.value
        }));
    };
   
    const handleSubmit = async () => {
        // e.preventDefault();
        try {
            const response = await axios.post(`${url}/userlogin`, userData);
            if (response.data.success) {
                toast.success(response.data.message);
                toast("Redirecting to home page")
                localStorage.setItem("token",response.data.data)
                navigate('/');
            } else {
                toast.error(response.data.message);
            }
           
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
    return(
        <div className="authentication">
            <div className="authentication-form card p-4">
                <h1 className="card-title">WELCOME BACK</h1>
                <Form layout='vertical' onFinish={handleSubmit}>
                    <Form.Item >
                        <Input placeholder="Email" name="email" onChange={handleOnChange} value={userData.email} ></Input>
                    </Form.Item>
                    <Form.Item >
                        <Input placeholder="Password" name="password" onChange={handleOnChange} value={userData.password} ></Input>
                    </Form.Item>
                    <button className="primary-button my-3" htmlType="submit">Login</button>
                    <Link to='/register' className="anchor mt-2">CLICK HERE TO REGISTER</Link>
                </Form>
            </div>
        </div>
    )
}

export default Login;