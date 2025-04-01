import { FC } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  ClipboardList, 
  Calendar, 
  Tractor, 
  DollarSign, 
  Shield, 
  UserCheck,
  CheckCircle2
} from 'lucide-react'

const HowItWorks: FC = () => {
  const steps = [
    {
      title: 'List or Browse',
      description: 'List your farm equipment or browse available machinery in your area',
      icon: ClipboardList,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Select Dates',
      description: 'Choose when you need the equipment or set availability for your machinery',
      icon: Calendar,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Book Equipment',
      description: 'Reserve the machinery you need or accept booking requests',
      icon: Tractor,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Secure Payment',
      description: 'Pay securely through our platform with flexible payment options',
      icon: DollarSign,
      color: 'bg-purple-100 text-purple-600'
    }
  ]

  const features = [
    {
      title: 'For Equipment Owners',
      benefits: [
        'Earn extra income from your idle machinery',
        'Set your own rental rates and availability',
        'Insurance coverage for your equipment',
        'Verify renter credentials',
        'Manage bookings easily'
      ],
      icon: Shield,
      color: 'bg-primary-100 text-primary-600'
    },
    {
      title: 'For Equipment Renters',
      benefits: [
        'Access equipment without large investments',
        'Find machinery near you',
        'Flexible rental periods',
        'Verified equipment condition',
        'Transparent pricing'
      ],
      icon: UserCheck,
      color: 'bg-primary-100 text-primary-600'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How FarmShare Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with local farmers to share equipment and reduce costs. Simple, secure, and efficient.
          </p>
        </motion.div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <div className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-200"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Process Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Simple Rental Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Search & Select</h3>
              <p className="text-gray-600">
                Browse available equipment in your area and select what you need
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Book & Pay</h3>
              <p className="text-gray-600">
                Choose your rental dates and complete secure payment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Pick Up & Use</h3>
              <p className="text-gray-600">
                Collect the equipment and start using it for your farming needs
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/equipment"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors"
            >
              Browse Equipment
            </Link>
            <Link
              to="/list-equipment"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 rounded-md shadow-sm text-base font-medium text-primary-600 bg-white hover:bg-primary-50 transition-colors"
            >
              List Your Equipment
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default HowItWorks 