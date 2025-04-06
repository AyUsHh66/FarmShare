import { FC } from 'react'
import { motion } from 'framer-motion'

const Terms: FC = () => {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg">
          <p className="text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using FarmShare, you agree to be bound by these Terms of Service 
              and all applicable laws and regulations. If you do not agree with any of these terms, 
              you are prohibited from using or accessing this platform.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily access and use FarmShare for personal, 
              non-commercial transient viewing only. This is the grant of a license, not a 
              transfer of title.
            </p>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Rental Terms</h2>
            <ul className="list-disc pl-6 mt-4">
              <li>All rentals must be processed through our platform</li>
              <li>Equipment must be returned in the same condition</li>
              <li>Insurance requirements must be met</li>
              <li>Cancellation policies apply</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities</h2>
            <p>
              Users are responsible for:
            </p>
            <ul className="list-disc pl-6 mt-4">
              <li>Providing accurate information</li>
              <li>Maintaining account security</li>
              <li>Following equipment usage guidelines</li>
              <li>Reporting any issues promptly</li>
            </ul>
          </section>
          
          <section className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p>
              FarmShare shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages resulting from your use or inability to use the platform.
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  )
}

export default Terms 