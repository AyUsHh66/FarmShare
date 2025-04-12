import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, AlertCircle, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Equipment {
  id: number;
  name: string;
  description: string;
  price: string;
  location: string;
  images: string[];
  availableFrom: string;
  availableTo: string;
  insuranceRequired: boolean;
  ownerId: string;
  ownerName: string;
}

const MyEquipment: FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  useEffect(() => {
    loadEquipment();
  }, []);

  const loadEquipment = () => {
    try {
      const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
      console.log('All equipment:', allEquipment); // Debug log
      console.log('Current user:', currentUser); // Debug log
      const userEquipment = allEquipment.filter((item: Equipment) => item.ownerId === currentUser.id);
      console.log('User equipment:', userEquipment); // Debug log
      setEquipment(userEquipment);
    } catch (error) {
      console.error('Error loading equipment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/equipment/${id}/edit`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this equipment?')) {
      try {
        const allEquipment = JSON.parse(localStorage.getItem('equipment') || '[]');
        const updatedEquipment = allEquipment.filter((item: Equipment) => item.id !== id);
        localStorage.setItem('equipment', JSON.stringify(updatedEquipment));
        setEquipment(equipment.filter(item => item.id !== id));
      } catch (error) {
        console.error('Error deleting equipment:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Listed Equipment</h1>
          <motion.button
            onClick={() => navigate('/list-equipment')}
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            List New Equipment
          </motion.button>
        </div>

        {equipment.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No equipment listed</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by listing your first equipment.</p>
            <motion.button
              onClick={() => navigate('/list-equipment')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Equipment
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {equipment.map((item) => (
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
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Listed
                  </div>
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
                    <div className="flex space-x-2">
                      <motion.button
                        onClick={() => handleEdit(item.id)}
                        className="p-2 text-gray-600 hover:text-primary-600 rounded-full hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Edit2 className="h-5 w-5" />
                      </motion.button>
                      <motion.button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-600 hover:text-red-600 rounded-full hover:bg-gray-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Trash2 className="h-5 w-5" />
                      </motion.button>
                    </div>
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
    </div>
  );
};

export default MyEquipment; 