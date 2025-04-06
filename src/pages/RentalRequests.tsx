import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

interface RentalRequest {
  id: number
  equipmentId: number
  equipmentName: string
  equipmentImage: string
  startDate: string
  endDate: string
  totalDays: number
  totalCost: number
  renterId: string
  renterName: string
  ownerId: string
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

const RentalRequests: FC = () => {
  const [requests, setRequests] = useState<RentalRequest[]>([])
  const [filter, setFilter] = useState<'received' | 'sent'>('received')
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}')

  useEffect(() => {
    const loadRequests = () => {
      const allRequests = JSON.parse(localStorage.getItem('rentals') || '[]')
      setRequests(allRequests)
    }

    loadRequests()
    // Set up an interval to check for new requests every minute
    const interval = setInterval(loadRequests, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleStatusUpdate = (requestId: number, newStatus: 'approved' | 'rejected') => {
    const updatedRequests = requests.map(request => 
      request.id === requestId ? { ...request, status: newStatus } : request
    )
    setRequests(updatedRequests)
    localStorage.setItem('rentals', JSON.stringify(updatedRequests))
  }

  const filteredRequests = requests.filter(request => 
    filter === 'received' ? request.ownerId === currentUser.id : request.renterId === currentUser.id
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-900">Rental Requests</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('received')}
              className={`px-4 py-2 rounded-md ${
                filter === 'received'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Received
            </button>
            <button
              onClick={() => setFilter('sent')}
              className={`px-4 py-2 rounded-md ${
                filter === 'sent'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              Sent
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="relative h-48">
                <img
                  src={request.equipmentImage}
                  alt={request.equipmentName}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{request.equipmentName}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Rental Period:</span>
                    <span className="text-gray-900">
                      {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Cost:</span>
                    <span className="text-gray-900">₹{request.totalCost}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                      {filter === 'received' ? 'Requested by:' : 'Owner:'}
                    </span>
                    <span className="text-gray-900">
                      {filter === 'received' ? request.renterName : 'Equipment Owner'}
                    </span>
                  </div>
                </div>

                {filter === 'received' && request.status === 'pending' && (
                  <div className="mt-6 flex justify-end space-x-2">
                    <motion.button
                      onClick={() => handleStatusUpdate(request.id, 'approved')}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </motion.button>
                    <motion.button
                      onClick={() => handleStatusUpdate(request.id, 'rejected')}
                      className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </motion.button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {filteredRequests.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filter === 'received'
                  ? "You haven't received any rental requests yet."
                  : "You haven't sent any rental requests yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default RentalRequests 