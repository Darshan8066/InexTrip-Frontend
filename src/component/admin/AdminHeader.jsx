import React from 'react';

export default function AdminHeader({
    title,
    subtitle,
    user,
    onProfileClick,
    onToggleSidebar,
    rightContent
}) {
    return (
        <header className="bg-white border-b border-slate-200 p-8 flex justify-between items-center sticky top-0 z-40 backdrop-blur-md bg-white/90">
            
            {/* LEFT SIDE */}
            <div className="flex items-center gap-6">
                {/* Sidebar Toggle */}
                <button
                    onClick={onToggleSidebar}
                    className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all flex flex-col gap-1 items-center justify-center w-12 h-12"
                >
                    <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
                    <span className="w-4 h-0.5 bg-slate-900 rounded-full" />
                    <span className="w-6 h-0.5 bg-slate-900 rounded-full" />
                </button>

                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-slate-400 font-bold uppercase text-[9px] tracking-widest mt-1">
                        {subtitle}
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">

                {/* Extra buttons (optional) */}
                {rightContent}

                {/* Profile */}
                <button
                    onClick={onProfileClick}
                    className="flex items-center gap-3 bg-slate-50 p-2 pl-3 rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all group"
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-slate-900 font-black text-xs group-hover:text-indigo-600">
                            {user?.fullname}
                        </p>
                        <p className="text-indigo-600 text-[8px] font-black uppercase tracking-widest">
                            Master Node
                        </p>
                    </div>

                    {user?.profilePhoto ? (
                        <img
                            src={user.profilePhoto}
                            className="w-10 h-10 rounded-xl border-2 border-white shadow-md"
                        />
                    ) : (
                        <div className="w-10 h-10 bg-indigo-600 text-white flex items-center justify-center rounded-xl font-bold">
                            {user?.fullname?.charAt(0)?.toUpperCase()}
                        </div>
                    )}
                </button>
            </div>
        </header>
    );
}