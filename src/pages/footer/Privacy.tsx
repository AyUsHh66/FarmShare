import { FC } from 'react'
import { motion } from 'framer-motion'

const Privacy: FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            <p>
              We collect information that you provide directly to us, including when you:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Create an account</li>
              <li>List equipment for rent</li>
              <li>Make rental requests</li>
              <li>Contact our support team</li>
              <li>Subscribe to our newsletter</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Process your rental requests</li>
              <li>Communicate with you about your rentals</li>
              <li>Improve our services</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Prevent fraud and ensure platform security</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
            <p>
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>
        </div>
      </motion.div>
    </div>
  )
}

export default Privacy 