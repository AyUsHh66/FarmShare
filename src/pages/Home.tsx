import { FC } from 'react'
import { Search, MapPin, Star, Shield, Clock, ChevronRight, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import FeaturedEquipment from '../components/FeaturedEquipment'
import HowItWorks from '../components/HowItWorks'
import AnimatedImageGrid from '../components/AnimatedImageGrid'

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are protected with industry-standard security measures."
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Our team is always here to help you with any questions or concerns."
  },
  {
    icon: Star,
    title: "Verified Equipment",
    description: "All equipment is inspected and verified for quality and safety."
  }
]

const testimonials = [
  {
    name: "John Smith",
    role: "Farm Owner",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    content: "This platform has revolutionized how I manage my farm equipment. The rental process is seamless and the equipment quality is excellent."
  },
  {
    name: "Sarah Johnson",
    role: "Agricultural Contractor",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "I've saved thousands by renting equipment instead of buying. The platform's support team is always helpful and responsive."
  },
  {
    name: "Michael Brown",
    role: "Farm Manager",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    content: "The variety of equipment available and the competitive pricing make this platform my go-to choice for farm equipment rentals."
  }
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const Home: FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <motion.div 
                className="sm:text-center lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h1 
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="block">Rent Agricultural</span>
                  <span className="block text-primary-600">Equipment Nearby</span>
                </motion.h1>
                <motion.p 
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Connect with local farmers to rent the equipment you need. Save money and help your farming community grow together.
                </motion.p>
                <motion.div 
                  className="mt-8 sm:flex sm:justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <div className="relative rounded-full w-full max-w-lg">
                    <input
                      type="text"
                      placeholder="Search for equipment..."
                      className="w-full px-6 py-4 rounded-full border-2 border-gray-300 focus:outline-none focus:border-primary-500 shadow-sm"
                    />
                    <motion.button 
                      className="absolute right-2 top-2 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Search className="h-6 w-6" />
                    </motion.button>
                  </div>
                </motion.div>
                <motion.div 
                  className="mt-8 flex items-center justify-center lg:justify-start space-x-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <div className="flex items-center text-gray-500">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>Available in 50+ locations</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Star className="h-5 w-5 mr-2 text-yellow-400" />
                    <span>4.8/5 average rating</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Shield className="h-5 w-5 mr-2 text-primary-500" />
                    <span>Secure Payments</span>
                  </div>
                </motion.div>
              </motion.div>
            </main>
          </div>
        </div>
        <motion.div 
          className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <AnimatedImageGrid />
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide the best experience for renting agricultural equipment
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="flex-shrink-0">
                  <motion.div 
                    className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="h-6 w-6" />
                  </motion.div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                  <p className="mt-1 text-base text-gray-500">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Equipment Section */}
      <FeaturedEquipment />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from farmers who have experienced the benefits of our platform
            </p>
          </motion.div>
          <motion.div 
            className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                variants={fadeInUp}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.content}</p>
                <div className="mt-4 flex items-center text-yellow-400">
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of farmers who are already saving money and time with our platform
            </p>
            <motion.button
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-primary-600 bg-white hover:bg-primary-50 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Renting Today
              <ChevronRight className="ml-2 h-5 w-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home 