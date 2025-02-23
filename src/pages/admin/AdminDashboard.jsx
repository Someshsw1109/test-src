
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAdminItems } from '../../services/operations/itemDetailsAPI.js'
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
        { title: 'Total Items', value: courses?.length || 0, bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600' },
        { title: 'Total Users', value: totalStudents || 0, bgColor: 'bg-gradient-to-r from-purple-500 to-purple-600' },
        { title: 'Total Earnings', value: `₹ ${totalEarnings || 0}`, bgColor: 'bg-gradient-to-r from-green-500 to-green-600' }
    ]

    return (
        <div className='min-h-screen bg-gray-100'>
            <div className='mx-auto w-11/12 max-w-[1200px] py-8'>
                {/* Header */}
                <div className='mb-8 bg-white rounded-2xl p-6 shadow-sm'>
                    <h1 className='text-3xl font-bold text-gray-800'>Welcome back, {user?.name || 'Admin'} 👋</h1>
                    <p className='text-gray-600 mt-2'>Here's what's happening with your store today.</p>
                </div>

                {/* Stats Cards */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    {stats.map((stat, index) => (
                        <div key={index} className={`${stat.bgColor} rounded-2xl p-6 shadow-sm transition-transform hover:scale-105`}>
                            <h3 className='text-white text-lg font-medium'>{stat.title}</h3>
                            <p className='text-white text-3xl font-bold mt-2'>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Charts Section */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
                    <div className='lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm'>
                        <div className='flex items-center justify-between mb-6'>
                            <h2 className='text-xl font-bold text-gray-800'>Analytics Overview</h2>
                            <div className='flex gap-2'>
                                <button 
                                    onClick={() => setCurrentChart('revenue')}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        currentChart === 'revenue' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Revenue
                                </button>
                                <button 
                                    onClick={() => setCurrentChart('students')}
                                    className={`px-4 py-2 rounded-lg transition-all ${
                                        currentChart === 'students' 
                                        ? 'bg-blue-500 text-white' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    Users
                                </button>
                            </div>
                        </div>
                        <DashboardChart details={details} currentChart={currentChart} />
                    </div>

                    <div className='bg-white rounded-2xl p-6 shadow-sm'>
                        <h2 className='text-xl font-bold text-gray-800 mb-4'>Quick Actions</h2>
                        <div className='space-y-3'>
                            <button onClick={() => navigate('/dashboard/add-item')} 
                                className='w-full py-3 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                                Add New Item
                            </button>
                            <button onClick={() => navigate('/dashboard/my-items')} 
                                className='w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors'>
                                Manage Items
                            </button>
                        </div>
                    </div>
                </div>

                {/* Recent Items */}
                <div className='bg-white rounded-2xl p-6 shadow-sm'>
                    <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-bold text-gray-800'>Recent Items</h2>
                        <button 
                            onClick={() => navigate('/dashboard/my-courses')} 
                            className='text-blue-500 hover:text-blue-600 font-medium'
                        >
                            View all →
                        </button>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        {courses?.length === 0 ? (
                            <p className='text-gray-500'>You have not created any items yet</p>
                        ) : (
                            courses.slice(0, 3).map((course, index) => (
                                <div key={index} className='bg-gray-50 rounded-xl overflow-hidden transition-transform hover:scale-105'>
                                    <img src={course?.thumbnail} alt="course" className='w-full h-48 object-cover' />
                                    <div className='p-4'>
                                        <h3 className='font-medium text-gray-800'>{course?.courseName}</h3>
                                        <div className='flex items-center gap-3 mt-2 text-gray-600 text-sm'>
                                            <span>{course?.studentsEnrolled?.length} Students</span>
                                            <span>•</span>
                                            <span>₹ {course?.price}</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
