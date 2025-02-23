import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Layout from '../../components/layout/Layout';
import myContext from '../../context/myContext';
import { addToCart, deleteFromCart } from '../../slices/cartSlice';
import Loader from '../../components/loader/Loader';

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, getAllProduct } = context;
    context.getAllProduct = [
        { id: 1, title: "Premium School Backpack", price: 999, productImageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=60" },
        { id: 2, title: "Insulated Lunch Box", price: 599, productImageUrl: "https://images.unsplash.com/photo-1598346762291-aee88549193f?w=800&auto=format&fit=crop&q=60" },
        { id: 3, title: "Designer Pencil Case", price: 299, productImageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=60" },
        { id: 4, title: "Hardbound Notebook Set", price: 199, productImageUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=60" },
        { id: 5, title: "Premium Binder Collection", price: 399, productImageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=60" },
        { id: 6, title: "Luxury Pen Set", price: 799, productImageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60" },
        { id: 7, title: "Art Marker Set", price: 899, productImageUrl: "https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=800&auto=format&fit=crop&q=60" },
        { id: 8, title: "Premium Color Pencils", price: 499, productImageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=800&auto=format&fit=crop&q=60" },
        { id: 9, title: "Elite School Uniform", price: 1499, productImageUrl: "https://images.unsplash.com/photo-1604671801908-6f0c6a092c05?w=800&auto=format&fit=crop&q=60" },
        { id: 10, title: "Sports Kit Complete", price: 1999, productImageUrl: "https://images.unsplash.com/photo-1515191107209-c28698631303?w=800&auto=format&fit=crop&q=60" },
        { id: 11, title: "Winter Cardigan", price: 1299, productImageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=60" },
        { id: 12, title: "Designer School Jacket", price: 2499, productImageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=60" },
        { id: 13, title: "Premium Sports Shoes", price: 2999, productImageUrl: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&auto=format&fit=crop&q=60" },
        { id: 14, title: "Cotton Socks Pack", price: 299, productImageUrl: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=800&auto=format&fit=crop&q=60" },
        { id: 15, title: "Student Laptop Pro", price: 45999, productImageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=60" },
        { id: 16, title: "Scientific Calculator", price: 1499, productImageUrl: "https://images.unsplash.com/photo-1574607383476-f517f260d30b?w=800&auto=format&fit=crop&q=60" },
        { id: 17, title: "Noise-Canceling Headphones", price: 2999, productImageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60" },
        { id: 18, title: "Fast Charging Kit", price: 999, productImageUrl: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&auto=format&fit=crop&q=60" },
        { id: 19, title: "Insulated Water Bottle", price: 699, productImageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=60" },
        { id: 20, title: "Premium Hand Sanitizer", price: 199, productImageUrl: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?w=800&auto=format&fit=crop&q=60" },
        { id: 21, title: "Reusable Face Masks", price: 299, productImageUrl: "https://images.unsplash.com/photo-1586942593568-29361efcd571?w=800&auto=format&fit=crop&q=60" },
        { id: 22, title: "Professional Art Kit", price: 3499, productImageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=60" },
        { id: 23, title: "Advanced Science Kit", price: 2499, productImageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&auto=format&fit=crop&q=60" },
        { id: 24, title: "Premium Textbook Set", price: 4999, productImageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=60" },
        { id: 25, title: "Educational Board Games", price: 1299, productImageUrl: "https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&auto=format&fit=crop&q=60" },
        { id: 26, title: "Premium Sports Gear", price: 3999, productImageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop&q=60" },
        { id: 27, title: "Musical Instrument Pack", price: 5999, productImageUrl: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=60" },
        { id: 28, title: "Study Desk Combo", price: 7999, productImageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&auto=format&fit=crop&q=60" },
        { id: 29, title: "Digital Drawing Tablet", price: 6999, productImageUrl: "https://images.unsplash.com/photo-1544931170-3ca1337cce88?w=800&auto=format&fit=crop&q=60" },
        { id: 30, title: "Premium School Chair", price: 4999, productImageUrl: "https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=60" }
    ];

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <Layout>
            <div className="py-8">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold">All Products</h1>
                </div>

                {/* main  */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex justify-center">
                            {loading && <Loader />}
                        </div>
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item, index) => {
                                const { id, title, price, productImageUrl } = item
                                return (
                                    <div key={index} className="p-4 w-full md:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80 h-96 w-full object-cover"
                                                src={productImageUrl}
                                                alt={title}
                                            />
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                                    SRC-Mart
                                                </h2>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    {title.substring(0, 25)}
                                                </h1>
                                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                                                    ₹{price}
                                                </h1>

                                                <div className="flex justify-center ">
                                                    {cartItems.some((p) => p.id === item.id)
                                                        ?
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className=" bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Delete From Cart
                                                        </button>
                                                        :
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className=" bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold">
                                                            Add To Cart
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}

export default AllProduct;