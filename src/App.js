import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MainLayout from './components/MainLayout';
import Enquaries from './pages/Enquaries';
import BlogList from './pages/BlogList';
import AddBlog from './pages/AddBlog';
import BlogCatagoryList from './pages/BlogCatagoryList';
import Order from './pages/Order';
import Customers from './pages/Customers';
import ProductList from './pages/ProductList';
import BrandList from './pages/BrandList';
import CatagoryList from './pages/CatagoryList';
import ColorList from './pages/ColorList';
import AddBlogCatagory from './pages/AddBlogCatagory';
import AddColor from './pages/AddColor';
import AddCatagory from './pages/AddCatagory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import CouponList from './pages/CouponList';
import AddCoupon from './pages/AddCoupon';
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import Profile from "./pages/profile";
import { PrivateRoutes } from './routing/ProtectedRoutes';
import { OpenRoutes } from './routing/OpenRoutes';

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<OpenRoutes><Login/></OpenRoutes>}/>
        <Route path="/admin" element={<PrivateRoutes>< MainLayout/></PrivateRoutes>}>
          <Route index element={< Dashboard/>} />
          <Route path="customers" element={< Customers/>} />
          <Route path="orders" element={< Order/>} />
          <Route path="orders/:id" element={<ViewOrder />} />
          <Route path="enquiries" element={< Enquaries/>} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="product" element={< AddProduct/>} />
          <Route path="product/:id" element={< AddProduct/>} />
          <Route path="product-list" element={< ProductList/>} />
          <Route path="brand" element={< AddBrand/>} />
          <Route path="brand/:id" element={< AddBrand/>} />
          <Route path="brand-list" element={< BrandList/>} />
          <Route path="category" element={< AddCatagory/>} />
          <Route path="category/:id" element={< AddCatagory/>} />
          <Route path="category-list" element={< CatagoryList/>} />
          <Route path="color" element={< AddColor/>} />
          <Route path="color/:id" element={<AddColor />} />
          <Route path="color-list" element={< ColorList/>} />
          <Route path="blog" element={< AddBlog/>} />
          <Route path="blog/:id" element={< AddBlog/>} />
          <Route path="blog-list" element={< BlogList/>} />
          <Route path="profile" element={<Profile/>} />
          <Route path="coupon" element={< AddCoupon/>} />
          <Route path="coupon/:id" element={< AddCoupon/>} />
          <Route path="coupon-list" element={< CouponList/>} />
          <Route path="blog-category" element={< AddBlogCatagory/>} />
          <Route path="blog-category-list" element={< BlogCatagoryList/>} />
        </Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
