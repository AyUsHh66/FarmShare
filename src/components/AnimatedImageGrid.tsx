import { FC, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Image {
  url: string
  alt: string
}

const images: Image[] = [
  {
    url: "https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg",
    alt: "Modern tractor in field"
  },
  {
    url: "https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg",
    alt: "Harvester in action"
  },
  {
    url: "https://images.pexels.com/photos/2255936/pexels-photo-2255936.jpeg",
    alt: "Farm equipment"
  }
]

const AnimatedImageGrid: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load only the first image initially
    const img = new Image()
    img.src = images[0].url
    img.onload = () => setIsLoading(false)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  if (isLoading) {
    return (
      <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg">
      <motion.div
        className="absolute inset-0"
        key={currentIndex}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <img
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}

export default AnimatedImageGrid 