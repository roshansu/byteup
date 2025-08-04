import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, BookOpen, GraduationCap, Calendar, Phone, Mail, Camera, Linkedin, Github, UserCheck, Users } from 'lucide-react';
import imageCompression from 'browser-image-compression'
import WaitAlert from '../component/Waitalert';
import SuccessAlert from '../component/Successalert'
import ErrorAlert from '../component/Erroralert'
import PageNotFOund from './PageNotFound';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    specialization: '',
    passout: '',
    mobile: '',
    email: '',
    photo: null,
    linkedin: '',
    github: '',
    role: 'member',
    about:'',
    password: '',
    confirmPassword: '',
  });

  const [hide, setHide] = useState('')
  const [errors, setErrors] = useState({});
   const [isLogin, setIsLogin] = useState(false)
            
    useEffect(()=>{
      setIsLogin(JSON.parse(localStorage.getItem('isLogin')))
    },[])

    if(isLogin){
      return(<PageNotFOund/>)
    }

  const courses = [
    'Computer Science Engineering',
    'Information Technology',
    'Electronics & Communication',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electrical Engineering',
    'Chemical Engineering',
    'Biotechnology',
    'BCA',
    'MCA',
    'Other'
  ];

  const specializations = [
    'Software Development',
    'Data Science',
    'Machine Learning',
    'Artificial Intelligence',
    'Frontend Development',
    'Backend Development',
    'Web Development',
    'Fullstack Development AI',
    'Mobile App Development',
    'Python Developer',
    'Game Developer',
    'Java Developer',
    'C/C++ Developer',
    'Computer Fundamental/Organization',
    'Cybersecurity',
    'Operating System',
    'Computer Network',
    'OS/CN',
    'Cloud Computing',
    'DevOps',
    'UI/UX Design',
    'Product Management',
    'Business Analytics',
  ];



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value)
    if(name === 'about'){
      if(value.length >100)
        return;
    }
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

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log("Original size:", file.size / 1024 / 1024, "MB");
      console.log("Compressed size:", compressedFile.size / 1024 / 1024, "MB");
      setFormData(prev => ({
        ...prev,
        photo: compressedFile
      }));
      console.log(formData, compressedFile)
    } catch (error) {
      console.error("Compression error:", error);
    }

      
  };

  const validateForm = () => {
    const newErrors = {};

    if(formData.role != 'member'){
      if(!formData.about.trim()) newErrors.about = 'subjects/skills is required';
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: "Passwords do not match" }));
      return;
    }

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.course) newErrors.course = 'Course is required';
    if (!formData.specialization) newErrors.specialization = 'Specialization is required';
    if (!formData.passout) newErrors.passout = 'Passout year is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.photo) newErrors.photo = 'Profile picture is required';
    else if (!/^\+?[\d\s-()]{10,}$/.test(formData.mobile)) newErrors.mobile = 'Invalid mobile number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert('Check all fields.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('course', formData.course);
    data.append('specialization', formData.specialization);
    data.append('passout', formData.passout);
    data.append('phone', formData.mobile);
    data.append('email', formData.email);
    data.append('linkedin', formData.linkedin);
    data.append('github', formData.github);
    data.append('role', formData.role);
    data.append('about', formData.about);
    data.append('password', formData.confirmPassword);
    data.append('photo', formData.photo);

    console.log('Form submitted:', data);
    setHide('process')

    const res = await fetch("https://byteup-ten.vercel.app/register", {
      method: "POST",
      body:data,
    })
    
    const datas = await res.json();
    console.log(datas.message)
    setHide(datas.success?'success':'error')
    console.log(hide)
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      { hide === 'process'?<WaitAlert/>:''}
      { hide === 'success'?<SuccessAlert close={setHide} text={"Registeration success, now you will get response from our team soon."} />:''}
      { hide === 'error'?<ErrorAlert close={setHide} text={"User already register or something went wrong!!"} />:''}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg mb-6">
            <UserCheck className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Join Our Community</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Register as a member or mentor and become part of our growing professional network
          </p>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="space-y-8">
            
            {/* Registration Type */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Choose Your Role</h3>
              <div className="grid grid-cols-2 gap-4">
                <label className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
                  formData.role === 'member' 
                    ? 'border-gray-400 bg-gray-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="member"
                    checked={formData.role === 'member'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <Users className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold text-gray-800">Member</h4>
                    <p className="text-sm text-gray-600 mt-2">Join as a community member</p>
                  </div>
                </label>
                
                <label className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all duration-200 ${
                  formData.role === 'mentor' 
                    ? 'border-gray-400 bg-gray-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <input
                    type="radio"
                    name="role"
                    value="mentor"
                    checked={formData.role === 'mentor'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="text-center">
                    <GraduationCap className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                    <h4 className="font-semibold text-gray-800">Mentor</h4>
                    <p className="text-sm text-gray-600 mt-2">Guide and support others</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.mobile ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Enter your mobile number"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-sm text-red-600">{errors.mobile}</p>
                  )}
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Password Fields */}
<div>
  <h3 className="text-xl font-semibold text-gray-800 mb-6">
    Security
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Create Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Password *
      </label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
          errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
        }`}
        placeholder="Enter your password"
      />
      {errors.password && (
        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
      )}
    </div>

    {/* Confirm Password */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Confirm Password *
      </label>
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
          errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
        }`}
        placeholder="Re-enter your password"
      />
      {errors.confirmPassword && (
        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
      )}
    </div>
  </div>
</div>


            {/* Academic Information */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Academic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course *
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.course ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                  >
                    <option value="">Select your course</option>
                    {courses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                  {errors.course && (
                    <p className="mt-1 text-sm text-red-600">{errors.course}</p>
                  )}
                </div>

                {/* Specialization */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization *
                  </label>
                  <select
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.specialization ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                  >
                    <option value="">Select your specialization</option>
                    {specializations.map(spec => (
                      <option key={spec} value={spec}>{spec}</option>
                    ))}
                  </select>
                  {errors.specialization && (
                    <p className="mt-1 text-sm text-red-600">{errors.specialization}</p>
                  )}
                </div>

                {/* Passout Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Passout Year *
                  </label>
                  <select
                    name="passout"
                    value={formData.passout}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.passout ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                  >
                    <option value="">Select year</option>
                    {Array.from({ length: 5 }, (_, i) => 2030 - i).map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.passout && (
                    <p className="mt-1 text-sm text-red-600">{errors.passout}</p>
                  )}
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Camera className="w-4 h-4 inline mr-1" />
                    Profile Photo*, will be display in mentor/member section
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        name="photo"
                        required={true}
                        onChange={handlePhotoChange}
                        accept="image/*"
                        className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.photo ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}/>
                    {errors.photo && (
                    <p className="mt-1 text-sm text-red-600">{errors.photo}</p>
                  )}
                    </div>
                   
                  </div>
                </div>
                  
                  <div className={` ${formData.role != 'member'?'block':'hidden'}`}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your strong subjects/skills*
                  </label>
                  <textarea
                    rows={4}
                    name="about"
                    value={formData.about}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                      errors.about ? 'border-red-300 bg-red-50' : 'border-gray-300 focus:border-gray-400'
                    }`}
                    placeholder="Describe your skills/subject in which you are good in"
                  />
                  {errors.about && (
                    <p className="mt-1 text-sm text-red-600">{errors.about}</p>
                  )}
                </div>

              </div>
            </div>

            {/* Social Profiles */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Social Profiles, Its recommended to add social profile
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LinkedIn */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Linkedin className="w-4 h-4 inline mr-1" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors duration-200"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Github className="w-4 h-4 inline mr-1" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 transition-colors duration-200"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleSubmit}
                className={` ${hide?'hidden':'block'} w-full bg-gray-800 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] shadow-lg`}
              >
                Complete Registration
              </button>

              <div className="text-center pt-4">
              <p className=" text-gray-600">
                Already have an account?{' '}
                <Link to={'/login'}
                  type="button"
                  className="font-medium text-gray-800 hover:text-gray-600 transition-colors duration-200"
                >
                  Login here
                </Link>
              </p>
            </div>
              
              <p className="text-center text-sm text-gray-600 mt-4">
                By registering, you agree to our terms of service and privacy policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}