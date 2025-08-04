import React from "react";

export default function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#F1EAFF] to-[#FFFFFF] text-gray-800">
            <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col items-center">
                <div className="flex items-center space-x-3 mb-6">
                    <h1 className='text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-800 to-indigo-900 bg-clip-text text-transparent'>
                        ByteUP
                    </h1>
                </div>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    We're a student-driven initiative at Shobhit University committed to growing a strong, inclusive, and mentorship-led coding culture.
                </p>
                <p className="mt-4">Contact us</p>
                <p className="text-center max-w-xl text-sm font-normal leading-relaxed">
                    roshanjaiswal.bca@gmail.com
                </p>
            </div>
            <div className="border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm font-normal">
                    <a href="#">ByteUP</a> ©2025. All rights reserved.
                </div>
            </div>
        </footer>
    );
};