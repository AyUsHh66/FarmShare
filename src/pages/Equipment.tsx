import { FC, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { DollarSign, Calendar, Shield, ExternalLink, Image as ImageIcon, X, CheckCircle, AlertCircle, MapPin, Search } from 'lucide-react'
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
  location: string
  price: string
  ownerName: string
}

interface RentalDetails {
  startDate: string;
  endDate: string;
  totalDays: number;
  totalCost: number;
  insuranceRequired: boolean;
}

const Equipment: FC = () => {
  const [equipment, setEquipment] = useState<EquipmentListing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priceFilter, setPriceFilter] = useState('all')
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [showRentalModal, setShowRentalModal] = useState(false)
  const [rentalDetails, setRentalDetails] = useState<RentalDetails | null>(null)
  const [error, setError] = useState('')

  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = () => {
    try {
      const data = JSON.parse(localStorage.getItem('equipment') || '[]');
      setEquipment(data);
    } catch (error) {
      console.error('Error loading equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter listings based on search term and price filter
  const filteredEquipment = equipment.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (listingId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this listing?')
    if (confirmDelete) {
      try {
        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')
        
        // Get all listings
        const allListings = JSON.parse(localStorage.getItem('equipment') || '[]')
        
        // Find the listing
        const listing = allListings.find((l: any) => l.id === listingId)
        
        // Check if user owns the listing
        if (listing && listing.ownerId === currentUser.id) {
          // Filter out the deleted listing
          const updatedListings = allListings.filter((l: any) => l.id !== listingId)
          
          // Save updated listings
          localStorage.setItem('equipment', JSON.stringify(updatedListings))
          
          // Update state
          setEquipment(updatedListings)
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

      const startDateTime = new Date(startDate).getTime()
      const endDateTime = new Date(endDate).getTime()
      const availableFromTime = new Date(selectedEquipment.availableFrom).getTime()
      const availableToTime = new Date(selectedEquipment.availableTo).getTime()

      // Check if rental dates are within available range
      if (startDateTime < availableFromTime || endDateTime > availableToTime) {
        throw new Error(`Equipment is only available from ${new Date(selectedEquipment.availableFrom).toLocaleDateString()} to ${new Date(selectedEquipment.availableTo).toLocaleDateString()}`)
      }

      if (startDateTime > endDateTime) {
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
        equipmentImage: selectedEquipment.images[0],
        startDate,
        endDate,
        totalDays,
        totalCost,
        insuranceAccepted: acceptInsurance,
        renterId: JSON.parse(localStorage.getItem('currentUser') || '{}').id,
        renterName: JSON.parse(localStorage.getItem('currentUser') || '{}').name,
        ownerId: selectedEquipment.ownerId,
        status: 'pending',
        createdAt: new Date().toISOString()
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
              <Search className="h-5 w-5 text-gray-400" />
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

        {filteredEquipment.length === 0 ? (
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
            {filteredEquipment.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative h-48">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
                  <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{item.location}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary-600">₹{item.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/day</span>
                    </div>
                    {item.ownerId !== currentUser.id && (
                      <motion.button
                        onClick={() => handleRentClick(item)}
                        className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Rent Now
                      </motion.button>
                    )}
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    <p>Available: {new Date(item.availableFrom).toLocaleDateString()} - {new Date(item.availableTo).toLocaleDateString()}</p>
                    {item.insuranceRequired && (
                      <p className="mt-1">Insurance required</p>
                    )}
                  </div>
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