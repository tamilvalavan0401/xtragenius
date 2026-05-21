import { motion, Variants } from "framer-motion"
import { useState } from "react"
import { Search, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchError, setSearchError] = useState<string | null>(null)

  const validateSearchQuery = (query: string) => {
    if (!query.trim()) {
      return "Search query cannot be empty"
    }
    if (query.trim().length < 3) {
      return "Search query must be at least 3 characters long"
    }
    return null
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const error = validateSearchQuery(searchQuery)
    if (error) {
      setSearchError(error)
      return
    }
    setSearchError(null)
    console.log("Searching for:", searchQuery)
  }

const coinVariants: Variants = {
  initial: { y: -50, opacity: 0 },
  animate: {
    y: [0, -20, 0],
    opacity: 1,
    rotate: 360,
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.5, 1],
      },
      rotate: {
        duration: 2,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
      opacity: { duration: 0.5 },
    },
  },
}

  const textVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  }

  const barVariants: Variants = {
    initial: { height: 0, opacity: 0 },
    animate: (i: number) => ({
      height: [20, 50, 30, 60, 40][i % 5],
      opacity: 1,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl text-center">
        <motion.div
          variants={coinVariants}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <svg
            className="w-24 h-24 mx-auto text-[#124cbe]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </motion.div>

        <motion.h1
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-5xl font-bold text-gray-800 mb-4 font-['Familjen_Grotesk']"
        >
          404 - Page Not Found
        </motion.h1>
        <motion.p
          variants={textVariants}
          initial="initial"
          animate="animate"
          className="text-lg text-[#FFFFFF] mb-8 "
        >
          Oops! The page you're looking for seems to have vanished like a bad investment. Let's get you back on track.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.4 } }}
          className="flex justify-center gap-2 mb-8"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={barVariants}
              initial="initial"
              animate="animate"
              className="w-8 bg-[#284292] rounded-t"
            />
          ))}
        </motion.div>

        <motion.form
          onSubmit={handleSearch}
          className="relative max-w-md mx-auto mb-6"
          animate={searchError ? { x: [-10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setSearchError(null)
              }}
              placeholder="Search for a page..."
              className={`w-full h-10 px-4 py-2 rounded-lg border border-gray-300 text-gray-800 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#124cbe] ${
                searchError ? "border-red-500" : ""
              } `}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FFFFFF]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
          {searchError && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-xs mt-1 "
            >
              {searchError}
            </motion.p>
          )}
        </motion.form>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-[#002f8b] transition-colors "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  )
}

