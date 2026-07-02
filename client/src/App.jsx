import './App.css';
import { Routes, Route } from "react-router-dom";
import { lazy,useEffect} from "react";
import { fetchUser } from "./redux/actions/authAction.js";
import { useDispatch,useSelector } from 'react-redux';
import PublicLayout from "./layouts/PublicLayout"
import AuthLayout from "./layouts/AuthLayout"
import ProtectedRoute from './components/ProtectedRoute';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Admin_Add_products, Admin_AllProducts, Admin_getSingleProduct, Admin_UpdateSingleProduct, Admin_AllOrders } from './pages/AdminDashboard/index.js';
import { PaymentSuccess, Public_getMyOrders, Public_getSingleOrder, Public_myAccount, Public_GetSingleProduct } from './pages/PublicDashboard/index.js';
import { AdminDashboard, PublicDashboard, ContactUs, NotFound, Unauthorized, Wishlist, AllProducts, Cart, Checkout,AboutsUs, Home, Login, Register } from './pages/index.js';


function App() {
const dispatch = useDispatch();
const { user,isAuthLoading } = useSelector(state => state.auth);

useEffect(() => {
  dispatch(fetchUser());
},[dispatch]);

if(isAuthLoading){
  return <div>Loading...</div>
}

  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutsUs />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="product/:id" element={<Public_GetSingleProduct />}/>
          <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminDashboard />}> 
          <Route index element={<h1>Welcome Admin</h1>}/> 
          <Route path="add-product" element={<Admin_Add_products />}/>
          <Route path="products" element={<Admin_AllProducts />}/>
          <Route path="product/:id" element={<Admin_getSingleProduct />}/>
          <Route path="update-product/:id" element={<Admin_UpdateSingleProduct />}/>
          <Route path="orders" element={<Admin_AllOrders />}/>
        </Route>
      </Route>


      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/public" element={<PublicDashboard />}>
          <Route index element={<h1>Welcome {user ? user.name : "User"}</h1>} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="product/:id" element={<Public_GetSingleProduct />}/>
          <Route path="order/:id" element={<Public_getSingleOrder/>} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="my_orders" element={<Public_getMyOrders/>} />
          <Route path="my_account" element={<Public_myAccount/>} />
          <Route path="payment-success" element={<PaymentSuccess />} />
        </Route>
      </Route>

      <Route path="unauthorized" element={<Unauthorized/>} />
      <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  );
}

export default App;