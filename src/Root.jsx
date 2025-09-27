import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Admin from './pages/admin/Admin';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Products from './pages/products/Products';
import Register from './pages/register/Register';
import Notfound from './pages/Notfound';
import Biz from './pages/biz/Biz';
import Profil from './pages/profil/Profil';
import Savat from './pages/savat/Savat';
import Qidirish from './pages/qidirish/Qidirish';
import Like from './pages/like/Like';
import Support from './pages/support/Support';
import Men from './pages/men/Men';
import Buyurtmalar from './pages/buyurtmalar/Buyurtmalar';
import Manzil from './pages/manzil/Manzil';
import Tolovusul from './pages/tolovusul/Tolovusul';
import AllProducts from './pages/allproduct/AllProducts';
import Adminlogin from './pages/adminlogin/Adminlogin';
import Slide from './pages/slide/Slide';
import Zakaz from './pages/zakaz/Zakaz';


function Root() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/biz' element={<Biz />} />
                <Route path='/profil' element={<Profil />} />
                <Route path='/qidirish' element={<Qidirish />} />
                <Route path='/savat' element={<Savat />} />
                <Route path='/like' element={<Like />} />
                <Route path='/support' element={<Support />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='/products/:id' element={<Products />} />
                <Route path='/men' element={<Men />} />
                <Route path='/admin' element={<Admin />} />
                <Route path='/buyurtmalar' element={<Buyurtmalar />} />
                <Route path='/manzil' element={<Manzil />} />
                <Route path='/slide' element={<Slide />} />
                <Route path='/tolovusul' element={<Tolovusul />} />
                <Route path='/all-products' element={<AllProducts />} />
                <Route path='/adminlogin' element={<Adminlogin />} />
                <Route path='/zakaz' element={<Zakaz />} />
                <Route path='*' element={<Notfound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Root;
