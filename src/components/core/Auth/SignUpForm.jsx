import { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { sendOtp } from "../../../services/operations/authAPI.js";
import { setSignupData } from "../../../slices/authSlice.jsx";
import { ACCOUNT_TYPE } from "../../../../utils/constant.js";
import Tab from "../Homepage/common/Tab.jsx";
import { setProgress } from "../../../slices/loadingBarSlice.jsx";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Account Type: User or Admin
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);

  // Form Data State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { name, email, password, role } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    const signupData = {
      ...formData,
      accountType,
    };

    try {
      dispatch(sendOtp(formData.email, navigate));
      dispatch(setSignupData(signupData));
      dispatch(setProgress(60));

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "user",
      });
      setAccountType(ACCOUNT_TYPE.USER);

      toast.success("Account creation initiated! Please verify OTP.");
    } catch (error) {
      toast.error("Failed to sign up. Please try again.");
    }
  };

  const tabData = [
    {
      id: 1,
      tabName: "Admin",
      type: ACCOUNT_TYPE.ADMIN,
    },
    {
      id: 2,
      tabName: "User",
      type: ACCOUNT_TYPE.USER,
    },
  ];
  console.log(formData.role);
  return (
    <div className="flex flex-col items-center">
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <label>
          <p className="mb-1 text-[0.875rem] text-richblack-5">
            Full Name <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter Full Name"
            className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
          />
        </label>
        <label>
          <p className="mb-1 text-[0.875rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email Address"
            className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
          />
        </label>
        <label className="relative">
          <p className="mb-1 text-[0.875rem] text-richblack-5">
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            className="w-full rounded-md bg-richblack-800 p-3 text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        {/* Role is now set to "user" by default */}
        <input type="hidden" name="role" value="user" />

        <button
          type="submit"
          className="mt-6 rounded-md bg-yellow-50 py-2 px-4 font-medium text-richblack-900"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
