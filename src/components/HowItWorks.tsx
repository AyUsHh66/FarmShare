import { FC } from 'react'
import { Search, Calendar, MessageSquare, Tractor } from 'lucide-react'
import { motion } from 'framer-motion'

interface Step {
  icon: FC<{ className?: string }>
  title: string
  description: string
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Find Equipment",
    description: "Search our extensive catalog of agricultural equipment available in your area."
  },
  {
    icon: Calendar,
    title: "Book & Pay",
    description: "Select your dates and securely pay through our platform."
  },
  {
    icon: MessageSquare,
    title: "Communicate",
    description: "Chat with equipment owners to arrange pickup or delivery."
  },
  {
    icon: Tractor,
    title: "Start Farming",
    description: "Get your work done with quality equipment at affordable rates."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

const HowItWorks: FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600">Simple steps to rent the equipment you need</p>
        </motion.div>

        <motion.div 
          className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="relative"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center">
                <motion.div 
                  className="flex items-center justify-center h-16 w-16 rounded-full bg-primary-100 text-primary-600"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="h-8 w-8" />
                </motion.div>
                <motion.h3 
                  className="mt-6 text-xl font-medium text-gray-900"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.title}
                </motion.h3>
                <p className="mt-2 text-center text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default HowItWorks 