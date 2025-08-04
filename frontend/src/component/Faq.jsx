import React from "react";

const Faq = () => {
    const [openIndex, setOpenIndex] = React.useState(null);

    const faqs = [
        {
            question: "What is this platform about?",
            answer: "This platform connects CS students with mentors and peers to strengthen coding culture through mentorship, discussions, and learning tools.",
        },
        {
            question: "How do I become a member or mentor?",
            answer: "You can register on the platform and choose your role during signup. Mentors and members are verified before approval.",
        },
        {
            question: "Can I ask doubts anytime?",
            answer: "Yes! Use our AI chatbot for instant answers or connect with a mentor for in-depth guidance.",
        },
        {
            question: "Is it free to use?",
            answer: "Yes, becoming a member and accessing mentorship or the chatbot is completely free for students.",
        },
    ];
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            <div className="max-w-xl mx-auto flex flex-col items-center justify-center py-4 lg:py-20 px-4 md:px-0">
                <p className="text-indigo-600 text-sm font-medium">FAQ's</p>
                <h1 className="text-3xl font-semibold text-center">Common Questions About the Platform</h1>
                <p className="text-sm text-slate-500 mt-2 pb-8 text-center">
                    Learn how to use the platform, connect with mentors, and get help from the AI chatbot.
                </p>
                {faqs.map((faq, index) => (
                    <div className="border-b border-slate-200 py-4 cursor-pointer w-full" key={index} onClick={() => setOpenIndex(openIndex === index ? null : index)}>
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-medium">
                                {faq.question}
                            </h3>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${openIndex === index ? "rotate-180" : ""} transition-all duration-500 ease-in-out`}>
                                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2" stroke="#1D293D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <p className={`text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`} >
                            {faq.answer}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Faq