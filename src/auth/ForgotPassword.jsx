
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { string, object } from 'yup';
import axios from '../services/axios';
import Swal from 'sweetalert2';
import { APPNAME } from '../App';

const ForgotPassword = () => {
  const { handleSubmit, handleBlur, handleChange, errors, touched, isSubmitting } = useFormik({
    initialValues: { email: '' },
    validationSchema: object({
      email: string().email('Invalid email address').required('Email is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('/api/auth/forgot-password', { email: values.email });
        resetForm();
        Swal.fire({
          icon: 'success',
          title: 'Check your inbox!',
          text: 'If that email is registered, a reset link has been sent.',
          timer: 3000,
          showConfirmButton: false,
          background: '#1e293b',
          color: '#fff',
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: err?.response?.data?.message || 'Something went wrong.',
          background: '#1e293b',
          color: '#fff',
        });
      }
    },
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center p-2">
      <img
        src="https://res.cloudinary.com/doug6jcc5/image/upload/v1774001629/register_page_kppnsl.jpg"
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />
      <div className="absolute inset-0 bg-black/10 backdrop-blur-xs pointer-events-none" />

      <div className="relative z-10 max-w-md w-full rounded-[30px] overflow-hidden shadow-2xl backdrop-blur-lg bg-white/5">
        <div className="bg-slate-800 p-12 flex flex-col justify-center">

          <div className="mb-10 text-center">
            <h1 className="text-white text-3xl font-black tracking-widest uppercase mb-2">
              {APPNAME}
            </h1>
            <p className="text-white/60 text-xs font-bold uppercase tracking-widest">
              Forgot your password?
            </p>
          </div>

          <p className="text-white/50 text-sm text-center mb-8 leading-relaxed">
            Enter your registered email address and we'll send you a link to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="relative mb-2 border-b border-white/30 pb-2">
              <input
                type="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Email address"
                className="w-full bg-transparent text-white placeholder:text-white/40 py-2 outline-none font-medium transition-all duration-300 focus:scale-[1.02] pr-8"
              />
              <span className="absolute right-0 top-2">✉️</span>
            </div>
            {touched.email && errors.email && (
              <p className="text-red-400 text-xs mb-4 mt-1 font-semibold tracking-wide">
                ⚠ {errors.email}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-white text-[#1b3a6e] py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'SENDING...' : 'SEND RESET LINK'}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">
              Remembered your password?{' '}
              <Link to="/login" className="text-white hover:underline ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;