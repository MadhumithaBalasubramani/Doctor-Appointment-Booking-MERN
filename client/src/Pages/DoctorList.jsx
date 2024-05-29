import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/reducer";
import Layout from "../components/Layout";
import { Table } from "antd";
import axios from "axios";
const url = process.env.REACT_APP_API_URL;
const DoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const dispatch = useDispatch();
    const getDoctorData = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.get(`${url}/getdoctorslist`, {
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
            toast.error("Failed to load users list");
        }
    };

    useEffect(() => {
        getDoctorData();
    }, []);

    const changeDocStatus = async (record, status) => {
        try {
            dispatch(showLoading());
            const response = await axios.post(
                `${url}/ChangeStatus`,
                { doctorId: record._id, userId:record.userId,status:status },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            dispatch(hideLoading());

            if (response.data.success) {
                // Update the status locally
                // setDoctors((prevDoctors) =>
                //     prevDoctors.map((doctor) =>
                //         doctor._id === record._id ? { ...doctor, status } : doctor
                //     )
                // );
                toast.success(response.data.message);
                getDoctorData();
            } 
            // else {
            //     toast.error(response.data.message);
            // }
        } catch (error) {
           
            console.error("Failed to change doctor status:", error);
            toast.error("Failed to change doctor status");
            dispatch(hideLoading());
        }
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => (
                <span className="normal-text">
                    {record.firstName} {record.lastName}
                </span>
            ),
        },
        {
            title: "Mobile",
            dataIndex: "mobileNumber",
        },
        {
            title: "Status",
            dataIndex: "status",
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    {record.status === "Pending" && (
                        <h1
                            className="anchor cursorPointer"
                            onClick={() => changeDocStatus(record, "Approved")}
                        >
                            Approve
                        </h1>
                    )}
                    {record.status === "Approved" && (
                        <h1
                            className="anchor cursorPointer"
                            onClick={() => changeDocStatus(record, "pending")}
                        >
                            Block
                        </h1>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Layout>
            <h1 className="page-title">Doctor's List</h1>
            <Table columns={columns} dataSource={doctors} />
        </Layout>
    );
};

export default DoctorsList;
