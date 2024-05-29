
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './Pages/login'
import Register from './Pages/register'
import {Toaster} from 'react-hot-toast'
import { useSelector } from "react-redux";
import Home from './Pages/home';
import ProtectedComponents from './components/protectedRoute';
import PublicRoute from './components/publicRoute';
import ApplyDoctor from './Pages/ApplyDoctor';
import DoctorProfile from './Pages/doctorProfile';
import Notification from './Pages/Notification';
import UsersList from './Pages/UserList';
import DoctorsList from './Pages/DoctorList';
import BookAppointment from './Pages/BookAppointment';
import Appointments from './Pages/Appointments';
function App() {
  const {loading} = useSelector((state) => state.alerts)
  return (
    <div>
      <BrowserRouter>
      {loading &&(
      <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <Toaster
  position="top-center"
  reverseOrder={false}/>

      <Routes>
        <Route path='/login' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/register' element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path='/' element={
          <ProtectedComponents><Home/></ProtectedComponents>
        }/>
        <Route
          path="/apply-doctor"
          element={
            <ProtectedComponents>
              <ApplyDoctor/>
            </ProtectedComponents>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedComponents>
              <Notification/>
            </ProtectedComponents>
          }
        />
        <Route
          path="/doctors"
          element={
            <ProtectedComponents>
              <DoctorsList />
            </ProtectedComponents>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedComponents>
              <UsersList />
            </ProtectedComponents>
          }
        />
        <Route 
          path="/doctor/profile/:userId"
          element={
            <ProtectedComponents>
              <DoctorProfile />
            </ProtectedComponents>
          }
        />
        <Route 
          path="/book-appointment/:doctorId"
          element={
            <ProtectedComponents>
              <BookAppointment />
            </ProtectedComponents>
          }
        />
        <Route 
          path="/appointments"
          element={
            <ProtectedComponents>
              <Appointments />
            </ProtectedComponents>
          }
        />
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
