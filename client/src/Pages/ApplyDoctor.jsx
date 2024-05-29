
import Layout from "../components/Layout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../Redux/reducer";
import toast from "react-hot-toast";
import axios from "axios";
import DoctorForm from "../components/DoctorForm"; 
import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import moment from "moment";
const url = process.env.REACT_APP_API_URL;
function ApplyDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${url}/applydoctoraccount`,
        {
           ...values, 
           userId: user._id, 
           timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Apply Doctor</h1>
      <DoctorForm onFinish={onFinish}/>
    </Layout>
  );
}

export default ApplyDoctor;
