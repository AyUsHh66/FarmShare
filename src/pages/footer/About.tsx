import { FC } from 'react'
import { motion } from 'framer-motion'

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">About FarmShare</h1>
        <div className="prose prose-lg">
          <p>
            FarmShare is a revolutionary platform that connects farmers and agricultural businesses, 
            making it easy to rent and share farming equipment. Our mission is to make modern farming 
            equipment accessible to all farmers, helping to reduce costs and increase efficiency in 
            the agricultural sector.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p>
            We believe that every farmer should have access to the equipment they need to succeed. 
            By creating a sharing economy for agricultural equipment, we're helping farmers reduce 
            costs while maximizing the utility of existing machinery.
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Values</h2>
          <ul className="list-disc pl-6">
            <li>Trust and transparency in every transaction</li>
            <li>Community-driven support and collaboration</li>
            <li>Innovation in agricultural practices</li>
            <li>Sustainability and environmental responsibility</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}

export default About 