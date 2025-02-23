
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAdminItems } from '../../services/operations/itemDetailsAPI.js'
import { FiUsers, FiDollarSign, FiPackage, FiTrendingUp } from 'react-icons/fi'
import DashboardChart from './DashboardChart.jsx'

const AdminDashboard = () => {
    const [details, setDetails] = useState([])
    const [courses, setCourses] = useState([])
    const [currentChart, setCurrentChart] = useState('revenue')
    const { token } = useSelector(state => state.auth)
    const { user } = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) return;
        (async () => {
            try {
                if (token) {
                    const instructorCourses = await fetchAdminItems(token)
                    setCourses(instructorCourses)
                }
            } catch (error) {
                console.error('Error fetching data:', error.message)
            }
        })()
    }, [token, dispatch])

    const totalEarnings = details?.reduce((acc, course) => acc + course?.totalRevenue, 0)
    const totalStudents = details?.reduce((acc, course) => acc + course?.totalStudents, 0)

    const stats = [
        { 
            title: 'Total Items', 
            value: courses?.length || 0, 
            icon: <FiPackage className="text-3xl" />,
            bgColor: 'bg-gradient-to-br from-blue-400 to-blue-600'
        },
        { 
            title: 'Total Users', 
            value: totalStudents || 0, 
            icon: <FiUsers className="text-3xl" />,
            bgColor: 'bg-gradient-to-br from-purple-400 to-purple-600'
        },
        { 
            title: 'Total Earnings', 
            value: `₹${totalEarnings || 0}`, 
            icon: <FiDollarSign className="text-3xl" />,
            bgColor: 'bg-gradient-to-br from-green-400 to-green-600'
        },
        { 
            title: 'Growth', 
            value: '+28%', 
            icon: <FiTrendingUp className="text-3xl" />,
            bgColor: 'bg-gradient-to-br from-yellow-400 to-yellow-600'
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name || 'Admin'} 👋</h1>
                            <p className="mt-1 text-gray-500">Here's what's happening with your store today.</p>
                        </div>
                        <button 
                            onClick={() => navigate('/dashboard/add-item')}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            + Add New Item
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div 
                            key={index} 
                            className={`${stat.bgColor} rounded-2xl p-6 shadow-sm transition-transform hover:scale-105`}
                        >
                            <div className="flex items-center justify-between text-white">
                                <div>
                                    <p className="text-white/80">{stat.title}</p>
                                    <h3 className="text-3xl font-bold mt-2">{stat.value}</h3>
                                </div>
                                {stat.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Analytics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Analytics Overview</h2>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => setCurrentChart('revenue')}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        currentChart === 'revenue' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Revenue
                                </button>
                                <button 
                                    onClick={() => setCurrentChart('students')}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        currentChart === 'students' 
                                        ? 'bg-indigo-600 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Users
                                </button>
                            </div>
                        </div>
                        <DashboardChart details={details} currentChart={currentChart} />
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <button 
                                onClick={() => navigate('/dashboard/add-item')} 
                                className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Add New Item
                            </button>
                            <button 
                                onClick={() => navigate('/dashboard/my-items')} 
                                className="w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Manage Items
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Items */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-900">Recent Items</h2>
                        <button 
                            onClick={() => navigate('/dashboard/my-items')} 
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                        >
                            View all →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {courses?.slice(0, 3).map((course, index) => (
                            <div key={index} className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-all hover:shadow-lg">
                                <div className="aspect-w-16 aspect-h-9">
                                    <img 
                                        src={course?.thumbnail} 
                                        alt={course?.courseName} 
                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                                        {course?.courseName}
                                    </h3>
                                    <div className="flex items-center gap-3 mt-2 text-gray-500 text-sm">
                                        <span>{course?.studentsEnrolled?.length} Students</span>
                                        <span>•</span>
                                        <span>₹{course?.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {courses?.length === 0 && (
                            <p className="text-gray-500 col-span-3 text-center py-4">
                                You have not created any items yet
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
