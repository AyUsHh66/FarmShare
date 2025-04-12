import { FC, useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Upload, DollarSign, Calendar, Shield, Camera, Loader2, AlertCircle, X } from 'lucide-react'

interface Equipment {
  id: number
  name: string
  description: string
  price: string
  location: string
  images: string[]
  availableFrom: string
  availableTo: string
  insuranceRequired: boolean
  ownerId: string
  ownerName: string
}

const EquipmentEditPage: FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  useEffect(() => {
    loadEquipment()
  }, [id])

  const loadEquipment = () => {
    try {
      const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]')
      const equipmentToEdit = allEquipment.find((item: Equipment) => item.id === Number(id))
      
      if (!equipmentToEdit) {
        throw new Error('Equipment not found')
      }

      if (equipmentToEdit.ownerId !== currentUser.id) {
        throw new Error('You can only edit your own equipment')
      }

      setEquipment(equipmentToEdit)
      setImagePreview(equipmentToEdit.images[0])
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Create a preview URL for the image
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const form = e.currentTarget
      const formData = new FormData(form)

      // Use the image preview if available, otherwise use the existing image
      const imageToUse = imagePreview || equipment?.images[0]

      const updatedEquipment = {
        ...equipment,
        name: formData.get('name')?.toString().trim(),
        description: formData.get('description')?.toString().trim(),
        price: formData.get('price')?.toString().trim(),
        location: formData.get('location')?.toString().trim(),
        images: [imageToUse],
        availableFrom: formData.get('availableFrom')?.toString() || equipment?.availableFrom,
        availableTo: formData.get('availableTo')?.toString() || equipment?.availableTo,
        insuranceRequired: formData.get('insuranceRequired') === 'on'
      }

      // Validate required fields
      if (!updatedEquipment.name || !updatedEquipment.price || !updatedEquipment.location || !updatedEquipment.images[0]) {
        throw new Error('Please fill in all required fields')
      }

      // Get existing equipment from localStorage
      const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]')
      
      // Update the equipment
      const updatedAllEquipment = allEquipment.map((item: Equipment) => 
        item.id === Number(id) ? updatedEquipment : item
      )
      
      // Save to localStorage
      localStorage.setItem('equipment', JSON.stringify(updatedAllEquipment))
      
      // Navigate back to my equipment page
      navigate('/my-equipment')
    } catch (err: any) {
      console.error('Error updating equipment:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
          <button
            onClick={() => navigate('/my-equipment')}
            className="mt-4 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700"
          >
            Back to My Equipment
          </button>
        </div>
      </div>
    )
  }

  if (!equipment) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Equipment</h1>

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
                defaultValue={equipment.name}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
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
                defaultValue={equipment.description}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
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
                defaultValue={equipment.price}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
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
                defaultValue={equipment.location}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 required">
                Equipment Image *
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex-shrink-0 h-32 w-32 rounded-md overflow-hidden border border-gray-300">
                  {imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Equipment preview" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-gray-100">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </button>
                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null)
                        if (fileInputRef.current) {
                          fileInputRef.current.value = ''
                        }
                      }}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Image
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Upload a clear image of your equipment (JPG, PNG, GIF)
              </p>
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
                  defaultValue={equipment.availableFrom}
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
                  defaultValue={equipment.availableTo}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="insuranceRequired"
                id="insuranceRequired"
                defaultChecked={equipment.insuranceRequired}
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
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EquipmentEditPage 