
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/reducer";
import Layout from "../components/Layout";
import { Table } from "antd";
import axios from "axios";
import moment from "moment"
const url = process.env.REACT_APP_API_URL;
function Appointments(){
    const [appointments, setAppointments] = useState([]);
    const dispatch = useDispatch();
    const getAppointmentsData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`${url}/getappointmentslistid`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            dispatch(hideLoading());
            if (response.data.data) {
                setAppointments(response.data.data);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.error("Failed to load users list:", error);
            toast.error("Failed to load users list");
        }
    };
    const columns = [
        {
            title:"Id",
            dataIndex:"_id"
        },
        {
            title: "Doctor",
            dataIndex: "name",
            render: (text, record) => (
                <span className="normal-text">
                    {record.doctorInfo.firstName} {record.doctorInfo.lastName}
                </span>
            ),
        },
        {
            title: "Mobile",
            dataIndex: "mobileNumber",
            render: (text, record) => (
                <span className="normal-text">
                    {record.doctorInfo.mobileNumber} 
                </span>
            ),
        },
        {
            title:"Date & Time",
            dataIndex:"createdAt",
            render: (text, record) => (
                <span className="normal-text">
                    {moment(record.date).format("DD-MM-YYYY")}{moment(record.time).format("HH:mm")} 
                </span>
            ),
        },
        {
            title:"status",
            dataIndex:"status",
            
        }
        
    ];
    useEffect(() => {
        getAppointmentsData();
    }, []);
    return(
        
        <Layout>
        <h1 className="page-title">Appointments</h1>
        <Table columns={columns} dataSource={appointments} />
    </Layout>
    )
}
export default Appointments;