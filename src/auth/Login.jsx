
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { string, object } from 'yup'
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import swal from 'sweetalert';




const Login = () => {

  const navigate = useNavigate();
  const { setUser } = useAuth();

  const myintitalvalue = {
    email: "",
    password: "",
  }

  const myvalidation = object({
    email: string().email("invalid Email").required("email is required"),
    password: string().min(6, "minimum 6 characters").required("password is required"),
  })

  const { handleSubmit, handleBlur, handleChange, } = useFormik({

    initialValues: myintitalvalue,
    validationSchema: myvalidation,

    onSubmit: async (value) => {
      try {
        const res = await login(value);
        console.log("data:", res.user.role);
        setUser(res.user);
        if (res.user.role === 'USER') navigate('/user/dashboard');
        else navigate('/admin/dashboard');
        swal({
          title: "Good job!",
          text:res.message ,
          icon: "success",
          button: " Yes",
        });
      } catch (error) {
        console.log(error)
        swal({
          title: "Error",
          text:error.message,
          icon: "error",
          button: " Yes",
        });
      }


    }
  })

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div>

        <img
          src="https://res.cloudinary.com/doug6jcc5/image/upload/v1774001629/register_page_kppnsl.jpg"
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          alt="Scenic view"
        />
        {/* <div className="absolute inset-0 backdrop-blur-md bg-black/70"/> */}
        <div className="absolute inset-0 bg-black/10 backdrop-blur-xs pointer-events-none" />

        {/* <div className="max-w-4xl w-full  rounded-[0px]  overflow-hidden flex flex-col md:flex-row-reverse "> */}
        <div className="max-w-4xl w-full rounded-[30px] overflow-hidden flex flex-col md:flex-row-reverse shadow-2xl backdrop-blur-lg bg-white/5">
          {/* Left Pane - Scenic Image */}

          <div className="md:w-1/2 relative  overflow-hidden group">
            <img
              src="https://res.cloudinary.com/doug6jcc5/image/upload/v1774001616/Login_Page_bkcmwu.jpg"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Scenic view"
            />
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[3px]" />
            <div className="relative h-full flex flex-col justify-center items-center text-center p-12">
              <h2 className="md:text-4xl font-black mb-8 leading-tight drop-shadow-lg uppercase tracking-tight">
                TRAVEL IS THE ONLY THING, <br /> YOU BUY THAT MAKES YOU RICHER.
              </h2>
            </div>
          </div>

          {/* Right Pane - Form */}

          <div className="md:w-1/2 bg--600 bg-slate-800 z-[10] p-12 md:p-16  flex flex-col justify-center">
            <div className="mb-10 z-100 text-center">
              <h1 className="text-white  text-3xl  font-black tracking-widest uppercase mb-2">TRAVEL BLOGGER</h1>
              <div className="h-1 w-12 mx-auto" />
            </div>

            <p className="text-white/60 text-center z-100 text-xs font-bold mb-8 uppercase tracking-widest">Plan your journey with AI</p>

            <form onSubmit={handleSubmit} className="">
              <div className="relative mb-8 group border-b border-white/30 pb-2">

                <input
                  required
                  type="email"
                  name='email'
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Email"
                  // className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium"
                  className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium transition-all duration-300 focus:scale-[1.02]"
                />

                <span className="absolute right-0 top-2 opacity-100">👤</span>
              </div>

              <div className="relative mb-8 group border-b border-white/30 pb-2">
                <input
                  required
                  name='password'
                  onChange={handleChange}
                  onBlur={handleBlur}

                  type={showPassword ? "text" : "password"}

                  placeholder="Password"
                  // className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium pr-10"
                  className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium transition-all duration-300 focus:scale-[1.02]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 opacity-40 hover:opacity-100 text-xs text-white"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>


              <div className="text-right">
                <button type="button" className="text-white/40 mb-4 text-[10px] font-bold uppercase tracking-widest hover:text-white">Forgot Your Password?</button>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-[#1b3a6e] py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                ENTER
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
                Don't have an account? <Link to="/register" className="text-white hover:underline ml-1">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
