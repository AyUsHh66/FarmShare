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
        className="w-12 h-12 flex items-center justify-center overflow-hidden rounded-full"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/farmer.png"
          alt="FarmShare Logo"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col"
      >
        <span className="text-xl font-bold text-primary-600">FarmShare</span>
        <span className="text-xs text-gray-600">Equipment Rental</span>
      </motion.div>
    </motion.div>
  )
}

export default Logo 