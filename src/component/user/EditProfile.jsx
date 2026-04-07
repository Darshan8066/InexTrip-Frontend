
import{ useEffect, useRef, useState } from "react";

import toast from 'react-hot-toast'
import { Navbar } from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { object, string } from "yup";
import { fetchUserById, updateProfile } from "../../services/authService";
import { getToken } from "../../utils/auth";
import { useAuth } from "../../context/AuthContext";
import axios from "../../services/axios";


const EditProfile = () => {

    const navigate = useNavigate();                           // React Router navigation hook
    const fileInputRef = useRef(null);                        // Used to trigger hidden file input when clicking "Change Photo"
    const token = getToken();                                 // Get logged in user from localStorage
    const { setUser, logout } = useAuth();
    const [selectedFile, setSelectedFile] = useState(null);

    if (!token) {
        navigate("/login");
        return null;
    }
    const [loading, setLoading] = useState(true);              // Loading state to show loader until user data is fetched

    // ---------------------------
    // Validation Schema (Yup)
    // ---------------------------

    const validationSchema = object({
        fullname: string().required("Full name is required"),
        mobile: string()
            .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
            .required("Mobile is required"),
    });

    // ---------------------------
    // Formik Configuration
    // ---------------------------

    const formik = useFormik({
        initialValues: {                                         // will be filled after API call
            fullname: "",
            email: "",
            mobile: "",
            profilePhoto: "",
        },
        validationSchema,

        onSubmit: async (values) => {
            try {
                let imageUrl = values.profilePhoto;

                // ✅ Upload only if new file selected
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append("image", selectedFile);

                    const uploadRes = await axios.post("/upload/upload", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    });

                    imageUrl = uploadRes.data.imageUrl;
                }

                const updatedData = {
                    ...values,
                    profilePhoto: imageUrl,
                };

                const res = await updateProfile(updatedData);

                // update context
                setUser(res.user);
                toast.success("Profile updated successfully!");
                navigate("/dashboard");

            } catch (error) {
                console.log(error);
                toast.error("Update failed");
            }
        }
    });

    // ---------------------------
    // Fetch User Data on Page Load
    // ---------------------------

    useEffect(() => {

        const loadUser = async () => {
            try {
                const res = await fetchUserById();                        // Call backend using logged-in user id

                formik.setValues({                                        // Set form values using API response            
                    fullname: res.user.fullname,                          // make sure backend field name matches
                    email: res.user.email,
                    mobile: res.user.mobile,
                    profilePhoto: res.user.profilePhoto,
                });

                setLoading(false); // stop loader

            } catch (error) {
                console.log(error);
            }
        };
        loadUser();
    }, []);                                                                  // runs only once when page loads

    // ---------------------------
    // Handle Profile Photo Change
    // ---------------------------
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        // show preview
        const previewUrl = URL.createObjectURL(file);
        formik.setFieldValue("profilePhoto", previewUrl);
    };
    if (loading) return <div className="text-center py-20">Loading...</div>;         // If data still loading show loader

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">


            {/* Navbar */}
            <Navbar logout={logout} />

            <main className="max-w-3xl mx-auto px-4 py-12 w-full flex-grow">

                <div className="bg-white rounded-[48px] shadow-2xl border overflow-hidden">


                    {/* Top Gradient Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 h-32"></div>

                    <div className="px-10 pb-12 -mt-16">


                        {/* Profile Photo Section */}
                        <div className="flex flex-col items-center mb-12">
                            <div className="relative group mb-4">


                                {/* Show current profile image */}

                                {formik.values.profilePhoto ? (
                                    <img
                                        src={formik.values.profilePhoto}
                                        className="w-36 h-36 border-8 border-slate-300 rounded-[32px] shadow-3xl object-cover"
                                        alt="Profile"
                                    />
                                ) : (
                                    <div className="w-32 h-32 rounded-[32px] border-8 border-slate-300 shadow-xl bg-indigo-600 text-white flex items-center justify-center text-6xl font-bold">
                                        {formik.values.fullname?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                {/* Change Photo Button */}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded-[32px] flex items-center justify-center text-white font-bold transition-all"
                                >
                                    Change Photo
                                </button>


                                {/* Hidden File Input */}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <h1 className="text-3xl font-black text-slate-900">
                                Edit Profile
                            </h1>
                        </div>

                        {/* ---------------------------
                                    FORM START
                            --------------------------- */}


                        <form onSubmit={formik.handleSubmit} className="space-y-8">

                            <div className="grid md:grid-cols-2 gap-8">


                                {/* Full Name Field */}
                                <div>
                                    <label className="block text-black font-bold mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={formik.values.fullname}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full px-4 py-3 text-black  border rounded-xl"
                                    />
                                    {formik.touched.fullname && formik.errors.fullname && (
                                        <p className="text-red-500 text-black  mt-1">
                                            {formik.errors.fullname}
                                        </p>
                                    )}
                                </div>


                                {/* Mobile Field */}
                                <div>
                                    <label className="block text-black font-bold mb-2">
                                        Mobile
                                    </label>
                                    <input
                                        type="tel"
                                        name="mobile"
                                        value={formik.values.mobile}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        className="w-full text-black px-4 py-3 border rounded-xl"
                                    />
                                    {formik.touched.mobile && formik.errors.mobile && (
                                        <p className="text-red-500 text-black mt-1">
                                            {formik.errors.mobile}
                                        </p>
                                    )}
                                </div>

                            </div>


                            {/* Email Locked Field */}
                            <div>
                                <label className="block text-black font-bold mb-2">
                                    Email (Locked)
                                </label>
                                <input
                                    type="email"
                                    value={formik.values.email}
                                    disabled
                                    className="w-full cursor-not-allowed  px-4 py-3 text-black bg-gray-100 rounded-xl"
                                />
                            </div>


                            {/* Buttons */}
                            <div className="flex pl-80 gap-4 pt-4">

                                <button
                                    type="submit"
                                    className="bg-indigo-600 text-white py-4 px-9 rounded-2xl font-black hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all"
                                >
                                    Update Changes
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate("/dashboard")}
                                    className="px-8 text-black bg-gray-100 rounded-xl"
                                >
                                    Discard
                                </button>

                            </div>

                        </form>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default EditProfile;