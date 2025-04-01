import { FC } from 'react'
import { motion } from 'framer-motion'

const Logo: FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center space-x-3"
    >
      <motion.div
        className="w-14 h-14 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-12 h-12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Tractor body */}
          <path
            d="M19 14h-2v2h2v-2zm-9-9H8v2h2V5zm7 0h-4v2h4V5zm2 5h-3v2h3v-2zm-4-3h-2v2h2V7zM4 17h16v2H4v-2z"
            fill="#4F772D"
          />
          {/* Wheels */}
          <circle cx="7" cy="18" r="2" fill="#31572C" />
          <circle cx="17" cy="18" r="2" fill="#31572C" />
          {/* Farmer's cabin */}
          <path
            d="M13 11V7h3l2 4h-5z"
            fill="#90A955"
          />
          {/* Additional details */}
          <path
            d="M6 15h2v2H6v-2zm12-3h2v2h-2v-2z"
            fill="#ECF39E"
          />
        </svg>
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col"
      >
        <span className="text-2xl font-bold text-primary-600">FarmShare</span>
        <span className="text-sm text-gray-600">Equipment Rental</span>
      </motion.div>
    </motion.div>
  )
}

export default Logo 