import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqs = [
  {
    question: "How does equipment rental work?",
    answer: "Browse available equipment, select your rental dates, and submit a request. The owner will review and approve your request. Once approved, you can coordinate pickup or delivery details."
  },
  {
    question: "What if the equipment is damaged?",
    answer: "All rentals are covered by our insurance policy. In case of damage, report it immediately through our platform, and our team will guide you through the claims process."
  },
  {
    question: "How do payments work?",
    answer: "We use secure payment processing. You'll be charged when the owner accepts your rental request. Payments are held in escrow until the rental period begins."
  },
  {
    question: "Can I cancel my rental?",
    answer: "Yes, you can cancel up to 24 hours before the rental period begins for a full refund. Cancellations within 24 hours may be subject to a fee."
  }
]

const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex justify-between items-center text-left"
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-6 pb-4"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default FAQ 