import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import moment from "moment";
// import { authAxios } from "../../middlewares/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/reducer";
import toast from "react-hot-toast";
import DoctorForm from "../components/DoctorForm";
import axios from "axios";
const url = process.env.REACT_APP_API_URL;
function DoctorProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);

  const getDoctorDatainfo = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.get(`${url}/getdocterinfo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (res.data.data) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      console.log("failed to laod doctor list");
    }
  };

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `${url}/updatedoctorinfo`,
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

  useEffect(() => {
    getDoctorDatainfo();
  }, []);
  return (
    <Layout>
      {doctor && (
        <DoctorForm
          buttonText="Update"
          title="Doctor Profile"
          onFinish={onFinish}
          initialValues={doctor}
        />
      )}
    </Layout>
  );
}

export default DoctorProfile;
