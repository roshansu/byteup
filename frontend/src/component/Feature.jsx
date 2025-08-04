import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react"

// Simple utility to combine class names
const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "🚀 Project-Based Learning",
      description: "Work on real projects with mentors and peers to build practical coding skills.",
      icon: <IconTerminal2 />,
    },
    {
      title: "👨‍🏫 Personalized Mentorship",
      description: "Connect with mentors by subject or domain and get guidance on your coding journey.",
      icon: <IconEaseInOut />,
    },
    {
      title: "📚 Subject-wise Guidance",
      description: "Get mentorship tailored to your academic subjects like DSA, DBMS, OS, and more.",
      icon: <IconHelp />,
    },
    {
      title: "🤖 Instant Help with Our AI Chatbot",
      description: "Get quick answers to coding doubts, platform queries, and learning resources—24/7 support powered by intelligent AI assistance.",
      icon: <IconHeart />,
    },
  ]
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 pt-24 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  )
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={classNames(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">{description}</p>
    </div>
  )
}
