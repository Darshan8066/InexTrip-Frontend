// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik'
// import { string, object } from 'yup'
// import { login } from '../services/authService';


// const Login = () => {

//   const navigate = useNavigate();

//   const myintitalvalue = {
//     email: "",
//     password: "",
//   }

//   const myvalidation = object({
//     email: string().email("invalid Email").required("email is required"),
//     password: string().min(6, "minimum 6 characters").required("password is required"),
//   })

//   const { handleSubmit, handleBlur, handleChange, errors, touched } = useFormik({

//     initialValues: myintitalvalue,
//     validationSchema: myvalidation,

//     onSubmit: async (value) => {
//       try {
//         const res = await login(value);
//         console.log("data:", res.user)

//       } catch (error) {
//         console.log(error)
//       }
//       navigate('/user/dashboard');

//     }
//   })


//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center bg-[url('https://th.bing.com/th/id/R.b8c6912557342533654cd70ef362d4d3?rik=xBjuorxK0s52Vg&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2fc%2f3%2fe%2f499750.jpg&ehk=6XHycAHzLXWPJtQalcd7JLSAsR7KWE9B7DI5VekHqHc%3d&risl=1&pid=ImgRaw&r=0')]  justify-center p-4">
//       <div className="max-w-4xl w-full bg-white rounded-[40px] bg-cover bg-center shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[560px]">
//         {/* Left Pane - Scenic Image */}
//         <div className="md:w-1/2 relative">
//           <img
//             src="https://static.vecteezy.com/system/resources/thumbnails/032/490/514/small_2x/group-of-hikers-walking-on-a-mountain-at-sunset-beautiful-mountains-with-snow-active-sport-concept-generative-ai-photo.jpg"
//             className="absolute inset-0 w-full h-full object-cover"
//             alt="Scenic view"
//           />
//           <div className="absolute inset-0 bg-indigo-900/30 backdrop-blur-[1px]" />
//           <div className="relative h-full flex flex-col justify-center items-center p-12 text-center text-white">
//             <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight drop-shadow-lg uppercase tracking-tight">
//               TRAVEL IS THE ONLY THING <br /> YOU BUY THAT MAKES YOU RICHER
//             </h2>
//             {/* <div className="flex gap-4 mt-8">
//               <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40">f</span>
//               <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40">t</span>
//               <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer hover:bg-white/40">i</span>
//             </div> */}
//           </div>
//         </div>

//         {/* Right Pane - Form */}
//         <div className="md:w-1/2 bg-[#1b3a6e] p-12 md:p-16 flex flex-col justify-center">
//           <div className="mb-10 text-center">
//             <h1 className="text-white text-3xl font-black tracking-widest uppercase mb-2">TRAVEL BLOGGER</h1>
//             <div className="h-1 w-12 bg-white mx-auto rounded-full" />
//           </div>

//           {/* <div className="flex justify-center gap-6 mb-8">
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1b3a6e] font-bold shadow-lg">f</button>
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1b3a6e] font-bold shadow-lg">G+</button>
//             <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#1b3a6e] font-bold shadow-lg">in</button>
//           </div> */}
//           <p className="text-white/60 text-center text-xs font-bold mb-8 uppercase tracking-widest">Plan your journey with AI</p>

//           <form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto w-full">
//             <div className="relative group border-b border-white/30 pb-2">
//               <input
//                 required
//                 type="email"
//                 name='email'
//                 onBlur={handleBlur}
//                 onChange={handleChange}
//                 // value={formData.email}
//                 // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 placeholder="Email"
//                 className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium"
//               />
//               {touched.email && errors.email ? <p>{errors.email}</p> : null}
//               <span className="absolute right-0 top-2 opacity-40 group-focus-within:opacity-100">👤</span>
//             </div>

//             <div className="relative group border-b border-white/30 pb-2">
//               <input
//                 required
//                 name='password'
//                 onChange={handleChange}
//                 onBlur={handleBlur}
//                 type={showPassword ? "text" : "password"}
//                 // value={formData.password}
//                 // onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                 placeholder="Password"
//                 className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium pr-10"
//               />
//               {touched.password && errors.password ? <p>{errors.password}</p> : null}
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-0 top-2 opacity-40 hover:opacity-100 text-xs text-white"
//               >
//                 {showPassword ? "HIDE" : "SHOW"}
//               </button>
//             </div>

//             {/* {error && <p className="text-rose-400 text-xs font-bold text-center uppercase tracking-widest">{error}</p>} */}

//             <div className="text-right">
//               <button type="button" className="text-white/40 text-[10px] font-bold uppercase tracking-widest hover:text-white">Forgot Your Password?</button>
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-white text-[#1b3a6e] py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl"
//             >
//               ENTER
//             </button>
//           </form>

//           <div className="mt-12 text-center">
//             <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
//               Don't have an account? <Link to="/register" className="text-white hover:underline ml-1">Sign Up</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;












import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import { string, object } from 'yup'
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';


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
        console.log("data:" , res.user.role);
        setUser(res.user);
        if (res.user.role === 'USER') navigate('/user/dashboard');
        else navigate('/admin/dashboard');

      } catch (error) {
        console.log(error)
      }
      // navigate('/user/dashboard');

    }
  })

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const users = storageService.getUsers();
  //   const user = users.find(u => u.email === formData.email && u.password === formData.password);

  //   if (user) {
  //     onLogin(user);
  //     if (user.role === 'ADMIN') navigate('/admin');
  //     else navigate('/dashboard');
  //   } else {
  //     setError('Invalid email or password.');
  //   }
  // };


  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-2">
      <div>

        <img
          src="https://res.cloudinary.com/doug6jcc5/image/upload/v1771664880/tripplanner/p9mmsldsocvfrvm2pyyp.jpg"
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
              src="https://res.cloudinary.com/doug6jcc5/image/upload/v1771652336/tripplanner/grbr4wxwmlpklqutaq9y.jpg"
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
