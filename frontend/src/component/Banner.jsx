import { Link } from "react-router-dom";
export default function Banner({handleClose}) {
    return (
        <div className="fixed w-full bg-black top-0 left-0">
        <div className="w-full flex items-center  justify-between px-4 md:px-14 py-1 font-medium text-sm text-white text-center bg-gray-800">
            <p>Be a part of ByteUP!</p>
            <div className="flex items-center space-x-6">
                <Link to={'/register'} type="button" className="font-normal text-gray-800 bg-white px-7 py-2 rounded-full">Be a part</Link>
                <button onClick={()=>handleClose(false)} type="button">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="12.532" width="17.498" height="2.1" rx="1.05" transform="rotate(-45.74 0 12.532)" fill="#fff"/>
                        <rect x="12.533" y="13.915" width="17.498" height="2.1" rx="1.05" transform="rotate(-135.74 12.533 13.915)" fill="#fff"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
    );
};