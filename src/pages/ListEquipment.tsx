import { FC, useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, DollarSign, Calendar, Shield, Camera, Loader2 } from 'lucide-react'
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
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<EquipmentForm>({
    name: '',
    description: '',
    dailyRate: 0,
    deposit: 0,
    images: [],
    insuranceRequired: true,
    condition: '',
    specifications: '',
    availableFrom: '',
    availableTo: ''
  })
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Create preview URLs for display
    const newPreviewUrls = files.map(file => URL.createObjectURL(file))
    setPreviewUrls(prev => [...prev, ...newPreviewUrls])

    // Convert images to base64
    try {
      const base64Images = await Promise.all(
        files.map(file => new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => resolve(reader.result as string)
          reader.onerror = reject
          reader.readAsDataURL(file)
        }))
      )

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }))
    } catch (err) {
      setError('Error processing images. Please try again.')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Get current user
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
      if (!currentUser.id) {
        throw new Error('Please sign in to list equipment')
      }

      // Validate form data
      if (!formData.name || !formData.description || formData.dailyRate <= 0) {
        throw new Error('Please fill in all required fields')
      }

      // Get existing listings or initialize empty array
      const existingListings = JSON.parse(localStorage.getItem('equipmentListings') || '[]')
      
      // Create new listing
      const newListing = {
        ...formData,
        id: Date.now(),
        ownerId: currentUser.id,
        ownerName: currentUser.name,
        createdAt: new Date().toISOString(),
        status: 'available'
      }

      // Add to listings
      existingListings.push(newListing)
      localStorage.setItem('equipmentListings', JSON.stringify(existingListings))

      // Show success message
      alert('Equipment listed successfully!')
      
      // Navigate to equipment page
      navigate('/equipment')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-6">List Your Equipment</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {/* Equipment Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Equipment Photos
              </label>
              <div className="grid grid-cols-2 gap-4 mb-4">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative aspect-video rounded-lg overflow-hidden">
                    <img src={url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="space-y-1 text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500">
                      <span>Upload images</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Equipment Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="e.g., John Deere Tractor Model 6120M"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  placeholder="Describe your equipment's features and condition..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Daily Rate
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="dailyRate"
                      value={formData.dailyRate}
                      onChange={(e) => setFormData(prev => ({ ...prev, dailyRate: parseFloat(e.target.value) }))}
                      required
                      min="0"
                      step="0.01"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Security Deposit
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="deposit"
                      value={formData.deposit}
                      onChange={(e) => setFormData(prev => ({ ...prev, deposit: parseFloat(e.target.value) }))}
                      required
                      min="0"
                      step="0.01"
                      className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available From
                  </label>
                  <input
                    type="date"
                    name="availableFrom"
                    value={formData.availableFrom}
                    onChange={(e) => setFormData(prev => ({ ...prev, availableFrom: e.target.value }))}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Available To
                  </label>
                  <input
                    type="date"
                    name="availableTo"
                    value={formData.availableTo}
                    onChange={(e) => setFormData(prev => ({ ...prev, availableTo: e.target.value }))}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            {/* Insurance Section */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary-600" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Insurance Requirements</h3>
                  <div className="mt-2">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="insuranceRequired"
                          checked={formData.insuranceRequired}
                          onChange={(e) => setFormData(prev => ({ ...prev, insuranceRequired: e.target.checked }))}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                          Require renter to provide insurance
                        </label>
                      </div>
                      <div className="text-sm text-gray-500">
                        Renters must provide proof of insurance that covers:
                        <ul className="list-disc ml-5 mt-2">
                          <li>Accidental damage</li>
                          <li>Theft protection</li>
                          <li>Third-party liability</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Listing Equipment...
                  </>
                ) : (
                  'List Equipment'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ListEquipment 