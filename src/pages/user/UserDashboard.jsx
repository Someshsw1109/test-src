import React, { useContext } from 'react';
import { myContext } from '../../context/data/myContext';
import Layout from '../../components/layout/Layout';
import { FiShoppingBag, FiUser, FiMail, FiCalendar } from 'react-icons/fi';

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 sm:p-12 bg-gradient-to-r from-purple-500 to-pink-500">
                            <div className="flex flex-col sm:flex-row items-center justify-between">
                                <div className="flex items-center mb-4 sm:mb-0">
                                    <div className="h-20 w-20 rounded-full bg-white p-1">
                                        <img
                                            src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                                            alt="Profile"
                                            className="h-full w-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div className="ml-4 text-white">
                                        <h1 className="text-2xl font-bold">{user?.name}</h1>
                                        <p className="text-purple-100">{user?.role}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <div className="bg-purple-50 rounded-xl p-6 flex items-center">
                                    <FiUser className="text-3xl text-purple-500" />
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500">Account Type</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.role}</p>
                                    </div>
                                </div>

                                <div className="bg-pink-50 rounded-xl p-6 flex items-center">
                                    <FiMail className="text-3xl text-pink-500" />
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-xl p-6 flex items-center">
                                    <FiShoppingBag className="text-3xl text-blue-500" />
                                    <div className="ml-4">
                                        <p className="text-sm text-gray-500">Total Orders</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {getAllOrder?.length || 0}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {getAllOrder && getAllOrder.length > 0 && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
                                    <div className="bg-white rounded-xl border border-gray-200">
                                        {getAllOrder.map((order, index) => (
                                            <div key={index} className="border-b border-gray-200 p-4 last:border-b-0">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <p className="font-medium text-gray-900">Order #{order.id}</p>
                                                        <p className="text-sm text-gray-500">{order.date}</p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm ${
                                                        order.status === 'delivered' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default UserDashboard;