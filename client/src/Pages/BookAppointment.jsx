import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import moment from "moment";
// import { authAxios } from "../../middlewares/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../Redux/reducer";
import axios from "axios";
import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import toast from "react-hot-toast";
const url = process.env.REACT_APP_API_URL;
function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const getDoctorDatainfo = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${url}/getdocterinfoid`,
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
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
  const checkBooking= async () => {
    try {
      dispatch(showLoading());
      const res= await axios.post(
        `${url}/checkbookAvailability`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
      }else{
        toast.error(res.data.message)
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${url}/bookappointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };
  useEffect(() => {
    getDoctorDatainfo();
  }, []);
  
  return (
    <Layout>
      <div>
        {doctor && (
          <>
            <h1 className="card-title">
              {doctor && (
                <div>
                  <h1 className="page-title">
                    {doctor.firstName} {doctor.lastName}
                  </h1>
                </div>
              )}
            </h1>
            <hr />
            <Row>
              <Col span={8} sm={24} xs={24} lg={8}>
                <h1 className="normal-text">
                  <b>Timings:</b>
                  {doctor.timings[0]}-{doctor.timings[1]}
                </h1>
                <div className="d-flex flex-column pt-2">
                  <DatePicker
                    format="DD-MM-YYYY"
                    onChange={(value) =>
                      setDate(moment(value).format("DD-MM-YYYY"))
                    }
                  />
                  <TimePicker
                    format="HH:mm"
                    className="mt-3"
                    onChange={(values) => {
                      setTime([moment(values).format("HH:mm")]);
                    }}
                  />
                  <Button className="primary-button mt-3 full-width-button"onClick={checkBooking}>
                    Check Availability
                  </Button>
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
                  </Button>
                </div>
              </Col>
            </Row>
          </>
        )}
      </div>
    </Layout>
  );
}
export default BookAppointment;
