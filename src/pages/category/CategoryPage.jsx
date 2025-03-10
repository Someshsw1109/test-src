
import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;

    const navigate = useNavigate();

    // Updated category mapping
    const categoryMapping = {
        'School Supplies': ['stationery', 'supplies', 'school'],
        'Uniforms': ['uniform', 'dress', 'clothing'],
        'Electronics': ['electronics', 'gadget', 'device'],
        'Bags': ['bag', 'backpack'],
        'Sports': ['sports', 'game', 'athletic'],
        'Art Supplies': ['art', 'craft', 'drawing'],
        'Books': ['book', 'textbook'],
        'Music': ['music', 'instrument']
    };

    const filterProduct = getAllProduct.filter((obj) => {
        const categoryTerms = categoryMapping[categoryname] || [categoryname.toLowerCase()];
        return categoryTerms.some(term => 
            obj.category?.toLowerCase().includes(term) || 
            obj.title?.toLowerCase().includes(term)
        );
    });

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
            <div className="mt-10">
                <div className="">
                    <h1 className="text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>

                {loading ?
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                    :
                    <section className="text-gray-600 body-font">
                        <div className="container px-5 py-5 mx-auto">
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ? (
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl } = item;
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
                                                        <div className="flex justify-center">
                                                            {cartItems.some((p) => p.id === item.id) ? (
                                                                <button
                                                                    onClick={() => deleteCart(item)}
                                                                    className="bg-red-700 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                                >
                                                                    Delete From Cart
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => addCart(item)}
                                                                    className="bg-pink-500 hover:bg-pink-600 w-full text-white py-[4px] rounded-lg font-bold"
                                                                >
                                                                    Add To Cart
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center">
                                        <div className="flex justify-center">
                                            <img className="mb-2 w-16" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="No products" />
                                        </div>
                                        <h1 className="text-black text-xl">No products found in {categoryname}</h1>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                }
            </div>
        </Layout>
    );
}

export default CategoryPage;
