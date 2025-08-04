import { Link } from "react-router-dom";

export default function HeroButton({text}) {
  return (
    <>
      <style>{`
        @keyframes rotate {
          0% {
            transform: rotate(0turn);
          }
          100% {
            transform: rotate(1turn);
          }
        }

        .rainbow::before {
          content: '';
          position: absolute;
          z-index: -2;
          left: -50%;
          top: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            #ff0080,
            #7928ca,
            #2afadf,
            #00f0ff,
            #ffcb05,
            #ff0080
          );
          filter: blur(12px);
          animation: rotate 6s linear infinite;
        }
      `}</style>

      <div className="relative z-0 p-0.5 flex items-center justify-center rounded-full overflow-hidden rainbow hover:scale-105 transition duration-300 active:scale-100 bg-white/10">
        <Link to={'/dashboard'} className="px-8 text-sm py-3 text-white rounded-full font-medium bg-gray-900/80 backdrop-blur">
          {text}
        </Link>
      </div>
    </>
  );
}
