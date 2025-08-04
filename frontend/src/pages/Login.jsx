import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn, UserCheck, Users, GraduationCap } from 'lucide-react';
import WaitAlert from '../component/Waitalert';
import SuccessAlert from '../component/Successalert';
import ErrorAlert from '../component/Erroralert';
import { useNavigate } from 'react-router-dom';
import PageNotFOund from './PageNotFound';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    loginType: 'member'
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hide, setHide] = useState('')
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(false)
              
      useEffect(()=>{
        setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
      },[])
  
      if(isLogin){
        return(<PageNotFOund/>)
      }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsLoading(true);
      setHide('process')
      
      // Simulate API call
      const res = await fetch("https://byteup-ten.vercel.app/login", {
        headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        formData
      })
    })
    
    const datas = await res.json();
    setIsLoading(false)
    console.log(datas.message)
    setHide(datas.success?'success':'error')
    if(datas.success){
      const userData = {
      id: datas.id,
      role: datas.role,
      isLogin: true
    };

// Save to localStorage
    localStorage.setItem('isLogin', JSON.stringify(userData.isLogin));
    localStorage.setItem('role', userData.role);
    localStorage.setItem('id', userData.id);
    navigate('/dashboard')
    }
      
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
       { hide === 'process'?<WaitAlert/>:''}
        { hide === 'success'?<SuccessAlert close={setHide} text={"Login success"} />:''}
        { hide === 'error'?<ErrorAlert close={setHide} text={"Invalid email or password or you are not approved by our team!"} />:''}
            
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
            <LogIn className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            
            {/* Login Type Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Login as</h3>
              <div className="grid grid-cols-2 gap-3">
                <label className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                  formData.loginType === 'member' 
                    ? 'border-gray-400 bg-gray-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="loginType"
                    value="member"
                    checked={formData.loginType === 'member'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <h4 className="font-medium text-gray-800 text-sm">Member</h4>
                  </div>
                </label>
                
                <label className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                  formData.loginType === 'mentor' 
                    ? 'border-gray-400 bg-gray-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="loginType"
                    value="mentor"
                    checked={formData.loginType === 'mentor'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <GraduationCap className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <h4 className="font-medium text-gray-800 text-sm">Mentor</h4>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                  errors.email 
                    ? 'border-red-300 bg-red-50 focus:ring-red-400' 
                    : 'border-gray-300 focus:border-gray-400'
                }`}
                placeholder="Enter your email address"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                    errors.password 
                      ? 'border-red-300 bg-red-50 focus:ring-red-400' 
                      : 'border-gray-300 focus:border-gray-400'
                  }`}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 mr-1">⚠</span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-gray-600 focus:ring-gray-400 border-gray-300 rounded transition-colors duration-200"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200 font-medium"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed scale-100'
                  : 'bg-gray-800 hover:bg-gray-700 hover:scale-[1.02] shadow-lg'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </div>
              )}
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}

            {/* Sign Up Link */}
            <div className="text-center ">
              <p className=" text-gray-600">
                Don't have an account?{' '}
                <Link to={'/register'}
                  type="button"
                  className="font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By signing in, you agree to our{' '}
            <button className="underline hover:text-gray-700 transition-colors duration-200">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="underline hover:text-gray-700 transition-colors duration-200">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}