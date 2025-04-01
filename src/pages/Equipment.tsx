import { FC, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, Calendar, Shield, ExternalLink, Image as ImageIcon, X, CheckCircle, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

interface EquipmentListing {
  id: number
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
  ownerId: string
  createdAt: string
  status: string
}

interface RentalDetails {
  startDate: string;
  endDate: string;
  totalDays: number;
  totalCost: number;
  insuranceRequired: boolean;
}

const Equipment: FC = () => {
  const [listings, setListings] = useState<EquipmentListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [showRentalModal, setShowRentalModal] = useState(false)
  const [rentalDetails, setRentalDetails] = useState<RentalDetails | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Load listings from localStorage
    const storedListings = localStorage.getItem('equipmentListings')
    if (storedListings) {
      setListings(JSON.parse(storedListings))
    }
    setLoading(false)
  }, [])

  // Filter listings based on search term and price filter
  const filteredListings = listings.filter(listing => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (priceFilter === 'all') return matchesSearch
    if (priceFilter === 'low') return matchesSearch && listing.dailyRate <= 100
    if (priceFilter === 'medium') return matchesSearch && listing.dailyRate > 100 && listing.dailyRate <= 500
    if (priceFilter === 'high') return matchesSearch && listing.dailyRate > 500
    return matchesSearch
  })

  const handleDelete = (listingId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?')
    if (confirmDelete) {
      try {
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
        
        // Get all listings
        const allListings = JSON.parse(localStorage.getItem('equipmentListings') || '[]')
        
        // Find the listing
        const listing = allListings.find((l: any) => l.id === listingId)
        
        // Check if user owns the listing
        if (listing && listing.ownerId === currentUser.id) {
          // Filter out the deleted listing
          const updatedListings = allListings.filter((l: any) => l.id !== listingId)
          
          // Save updated listings
          localStorage.setItem('equipmentListings', JSON.stringify(updatedListings))
          
          // Update state
          setListings(updatedListings)
        } else {
          alert('You can only delete your own listings')
        }
      } catch (error) {
        console.error('Error deleting listing:', error)
        alert('Failed to delete listing')
      }
    }
  }

  const handleRentClick = (equipment: any) => {
    setSelectedEquipment(equipment)
    setShowRentalModal(true)
  }

  const calculateRental = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    return {
      totalDays: diffDays,
      totalCost: diffDays * selectedEquipment.dailyRate
    }
  }

  const handleRentalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const formData = new FormData(e.currentTarget)
      const startDate = formData.get('startDate') as string
      const endDate = formData.get('endDate') as string
      const acceptInsurance = formData.get('acceptInsurance') === 'on'

      if (!startDate || !endDate) {
        throw new Error('Please select both start and end dates')
      }

      if (new Date(startDate) > new Date(endDate)) {
        throw new Error('End date must be after start date')
      }

      if (selectedEquipment.insuranceRequired && !acceptInsurance) {
        throw new Error('Insurance is required for this equipment')
      }

      const { totalDays, totalCost } = calculateRental(startDate, endDate)

      // Save rental to localStorage
      const rentals = JSON.parse(localStorage.getItem('rentals') || '[]')
      const newRental = {
        id: Date.now(),
        equipmentId: selectedEquipment.id,
        equipmentName: selectedEquipment.name,
        startDate,
        endDate,
        totalDays,
        totalCost,
        insuranceAccepted: acceptInsurance,
        renterId: JSON.parse(localStorage.getItem('currentUser') || '{}').id,
        status: 'pending'
      }
      rentals.push(newRental)
      localStorage.setItem('rentals', JSON.stringify(rentals))

      // Update rental details for confirmation
      setRentalDetails({
        startDate,
        endDate,
        totalDays,
        totalCost,
        insuranceRequired: selectedEquipment.insuranceRequired
      })

      // Close modal after short delay
      setTimeout(() => {
        setShowRentalModal(false)
        setSelectedEquipment(null)
        setRentalDetails(null)
      }, 3000)

    } catch (err: any) {
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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Available Equipment</h1>
          <Link
            to="/list-equipment"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            List Your Equipment
          </Link>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:space-x-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ImageIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            />
          </div>
          <div className="flex-shrink-0">
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $100/day</option>
              <option value="medium">$100-$500/day</option>
              <option value="high">Over $500/day</option>
            </select>
          </div>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              {searchTerm ? 'No equipment matches your search' : 'No equipment listed'}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Get started by listing your first piece of equipment.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  to="/list-equipment"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  List Equipment
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Equipment Image */}
                <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                  {listing.images && listing.images.length > 0 ? (
                    <img
                      src={listing.images[0]}
                      alt={listing.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://images.unsplash.com/photo-1586496235841-7809b7564a8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                      }}
                    />
                  ) : (
                    <div className="w-full h-48 flex flex-col items-center justify-center bg-gray-100">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                      <span className="text-sm text-gray-500 mt-2">No image available</span>
                    </div>
                  )}
                </div>

                {/* Equipment Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{listing.name}</h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{listing.description}</p>

                  <div className="mt-4 space-y-3">
                    {/* Daily Rate */}
                    <div className="flex items-center text-sm">
                      <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">
                        ${listing.dailyRate}/day
                        {listing.deposit > 0 && ` (${listing.deposit} deposit)`}
                      </span>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center text-sm">
                      <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-gray-700">
                        Available: {new Date(listing.availableFrom).toLocaleDateString()} - {new Date(listing.availableTo).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Insurance Required */}
                    {listing.insuranceRequired && (
                      <div className="flex items-center text-sm">
                        <Shield className="h-5 w-5 text-gray-400 mr-2" />
                        <span className="text-gray-700">Insurance required</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleRentClick(listing)}
                      className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Rent Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </button>
                  </div>

                  {/* Add delete button if user owns the listing */}
                  {listing.ownerId === JSON.parse(localStorage.getItem('currentUser') || '{}').id && (
                    <div className="px-6 py-4 border-t border-gray-100">
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors duration-200 absolute top-4 right-4"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Rental Modal */}
      <AnimatePresence>
        {showRentalModal && selectedEquipment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
            >
              {rentalDetails ? (
                // Confirmation View
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Rental Confirmed!
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Your rental request has been submitted successfully.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-gray-500">Total Days:</div>
                      <div className="text-gray-900 font-medium">{rentalDetails.totalDays}</div>
                      <div className="text-gray-500">Total Cost:</div>
                      <div className="text-gray-900 font-medium">${rentalDetails.totalCost}</div>
                    </div>
                  </div>
                </div>
              ) : (
                // Rental Form
                <form onSubmit={handleRentalSubmit}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Rent Equipment
                    </h3>
                    <button
                      type="button"
                      onClick={() => setShowRentalModal(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                        <div className="ml-3">
                          <p className="text-sm text-red-600">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date
                      </label>
                      <input
                        type="date"
                        name="startDate"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                      />
                    </div>

                    {selectedEquipment.insuranceRequired && (
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            type="checkbox"
                            name="acceptInsurance"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="font-medium text-gray-700">
                            Accept Insurance Requirements
                          </label>
                          <p className="text-gray-500">
                            I understand and agree to provide required insurance coverage.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                    >
                      {loading ? 'Processing...' : 'Confirm Rental'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Equipment 