import axios from "axios";
import React, { useEffect, useState } from "react";
import LayoutDes from "../components/Layout";
import Doctor from "../components/doctor";
import { hideLoading, showLoading } from "../Redux/reducer";
import { Row, Col } from "antd"; // Import Col from antd
import { useDispatch } from "react-redux";

const url = process.env.REACT_APP_API_URL;

function Home() {

    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getApprovedDoctorData= async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`${url}/getApprovedDoctorsList`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.data) {
                setDoctors(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Failed to load users list:", error);
            // toast.error("Failed to load users list");
        }
    };

    useEffect(() => {
        getApprovedDoctorData();
    }, []);


    return (
        <LayoutDes>
            <h1>HOME</h1>
            <Row gutter={[16, 16]}>
              {doctors.map((doctor)=>(
                <Col span={8} xs={24} sm={24} lg={8}>
                    <Doctor doctor={doctor}/>
                </Col>
              ))}
            </Row>
        </LayoutDes>
    );
}

export default Home;