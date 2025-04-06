import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, DollarSign, Calendar, Shield, Camera, Loader2, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface EquipmentForm {
  name: string
  description: string
  dailyRate: number
  deposit: number
  images: string[]
  insuranceRequired: boolean
  condition: string
  specifications: string
  availableFrom: string
  availableTo: string
}

const ListEquipment: FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  // Debug function to check localStorage
  const checkLocalStorage = () => {
    const equipment = JSON.parse(localStorage.getItem('equipment') || '[]')
    console.log('Current equipment in localStorage:', equipment)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Check if user is logged in
      if (!currentUser.id) {
        throw new Error('Please sign in to list equipment')
      }

      const form = e.currentTarget
      const formData = new FormData(form)

      // Create new equipment object
      const newEquipment = {
        id: Date.now(),
        name: formData.get('name')?.toString().trim(),
        description: formData.get('description')?.toString().trim(),
        price: formData.get('price')?.toString().trim(),
        location: formData.get('location')?.toString().trim(),
        images: [formData.get('imageUrl')?.toString().trim()],
        availableFrom: formData.get('availableFrom')?.toString() || new Date().toISOString().split('T')[0],
        availableTo: formData.get('availableTo')?.toString() || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        insuranceRequired: formData.get('insuranceRequired') === 'on',
        ownerId: currentUser.id,
        ownerName: currentUser.name
      }

      // Validate required fields
      if (!newEquipment.name || !newEquipment.price || !newEquipment.location || !newEquipment.images[0]) {
        throw new Error('Please fill in all required fields')
      }

      // Get existing equipment from localStorage
      const existingEquipment = JSON.parse(localStorage.getItem('equipment') || '[]')
      
      // Add new equipment
      const updatedEquipment = [...existingEquipment, newEquipment]
      
      // Save to localStorage
      localStorage.setItem('equipment', JSON.stringify(updatedEquipment))

      // Debug logs
      console.log('New equipment added:', newEquipment)
      console.log('Updated equipment list:', updatedEquipment)
      
      // Navigate to my equipment page
      navigate('/my-equipment')
    } catch (err: any) {
      console.error('Error adding equipment:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Check localStorage on component mount
  useState(() => {
    checkLocalStorage()
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">List Your Equipment</h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 required">
                Equipment Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., John Deere Tractor"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="Describe your equipment..."
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 required">
                Daily Rental Price (₹) *
              </label>
              <input
                type="text"
                name="price"
                id="price"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., 2,500"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 required">
                Location *
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="e.g., Mumbai, Maharashtra"
              />
            </div>

            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 required">
                Equipment Image URL *
              </label>
              <input
                type="url"
                name="imageUrl"
                id="imageUrl"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700">
                  Available From
                </label>
                <input
                  type="date"
                  name="availableFrom"
                  id="availableFrom"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>

              <div>
                <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700">
                  Available To
                </label>
                <input
                  type="date"
                  name="availableTo"
                  id="availableTo"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="insuranceRequired"
                id="insuranceRequired"
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="insuranceRequired" className="ml-2 block text-sm text-gray-700">
                Require insurance from renters
              </label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/my-equipment')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Listing...' : 'List Equipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ListEquipment 