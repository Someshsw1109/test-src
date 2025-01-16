
import {
  Route,
  Routes,
} from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ProductInfo from "./pages/productInfo/ProductInfo";
import CartPage from "./pages/cart/CartPage";
import AllProduct from "./pages/allProduct/AllProduct";
import Signup from "./pages/registration/Signup";
import Login from "./pages/registration/Login";
import UserDashboard from "./pages/user/UserDashboard";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import CategoryPage from "./pages/category/CategoryPage";
import VerifyOtp from "./pages/registration/VerifyOtp";
import Dashboard from "./pages/Dashboard";
import { useDispatch,useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "../utils/constant";
import AddItem from "./components/core/AddItem/index.jsx"
import Settings from "./components/core/Dashboard/Settings.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import MyItems from "./components/core/Dashboard/MyItems/MyItems.jsx";

const App = () => {
  const user=useSelector((state)=>state.profile.user);
  const dispatch=useDispatch();

  return (
    <>
     <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-email" element={<VerifyOtp></VerifyOtp>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/catalog/:catalog" element={<CategoryPage />} />  {/* category Page route  */}
          <Route path="/user-dashboard" element={
            <ProtectedRouteForUser>
              <UserDashboard />
            </ProtectedRouteForUser>
          } />




        <Route
          element={
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          }
        >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="dashboard/settings" element={<Settings />} /> 
          
        {user?.accountType === ACCOUNT_TYPE.USER && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
            </>
        )}

        {user?.role === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/add-item" element={<AddItem />} />
              <Route path="dashboard/instructor" element={<AdminDashboard />}/>

              {/* My-courses */}
              <Route path="dashboard/my-items" element={<MyItems></MyItems>}/>
              {/* <Route path="dashboard/edit-course/:courseId" element={<EditCourse></EditCourse>}></Route> */}
            </>
        )}
        </Route>



        </Routes>
    </>
      
      
  );
}

export default App;
