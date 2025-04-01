import { FC, useState } from 'react';
import { MapPin, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface Equipment {
  id: number;
  name: string;
  image: string;
  price: string;
  location: string;
  rating: number;
  description: string;
}

const featuredEquipment: Equipment[] = [
  {
    id: 1,
    name: "John Deere 6M Tractor",
    image: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
    price: "150/day",
    location: "Springfield, IL",
    rating: 4.8,
    description: "Powerful and reliable tractor suitable for various farming operations."
  },
  {
    id: 2,
    name: "Combine Harvester",
    image: "https://images.pexels.com/photos/2252585/pexels-photo-2252585.jpeg",
    price: "300/day",
    location: "Des Moines, IA",
    rating: 4.9,
    description: "Modern combine harvester with advanced grain handling system."
  },
  {
    id: 3,
    name: "Seed Drill",
    image: "https://images.pexels.com/photos/2252586/pexels-photo-2252586.jpeg",
    price: "80/day",
    location: "Lincoln, NE",
    rating: 4.7,
    description: "Precision seed drill for efficient planting operations."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const EquipmentCard: FC<{ item: Equipment }> = ({ item }) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48">
        {imageLoading && (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          </motion.div>
        )}
        <motion.img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{item.description}</p>
        <div className="flex items-center mt-4 text-gray-600">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{item.location}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-primary-600">${item.price}</span>
            <span className="text-sm text-gray-500 ml-1">/day</span>
          </div>
          <motion.button 
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Book Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedEquipment: FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Equipment</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our selection of high-quality agricultural equipment available for rent in your area.
          </p>
        </motion.div>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedEquipment;