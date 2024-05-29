import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../Redux/reducer";
// import { authAxios } from "../middlewares/AxiosInstance";
import Layout from "../components/Layout";
import { Table } from "antd";
import axios from "axios";
const url = process.env.REACT_APP_API_URL;
function UsersList() {
  const [user, setUsers] = useState([]);
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(`${url}/getuserlist`,{
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
      });
      dispatch(hideLoading());

      if (response.data.data) {
        setUsers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log("failed to load users list");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
const columns = [
    {
        title: 'Name', 
        dataIndex: 'name'
    },
    {
        title: 'Email', 
        dataIndex: 'email'
    },
    {
        title: 'Created At', 
        dataIndex: 'createdAt'
    },
    {
        title: 'Actions', 
        dataIndex: 'actions',
        render: (text, record)=>(
            <div className="d-flex">
<h1 className="anchor cursorPointer">Block</h1>
            </div>
        )
    }
]
  return (
    <Layout>
<h1 className="page-title">User's List</h1>
<Table columns={columns} dataSource={user} />

    </Layout>
  );
}

export default UsersList;