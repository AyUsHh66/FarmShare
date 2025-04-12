import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, Thermometer, Droplets, Cloud, Wind, Sun, Leaf, BarChart } from 'lucide-react'

interface PredictionResult {
  recommendedCrop: string;
  probabilities: Record<string, number>;
}

const CropPrediction = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setPrediction(null)

    try {
      // Convert form data to numbers
      const data = {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      }

      // Validate inputs
      if (Object.values(data).some(isNaN)) {
        throw new Error('Please enter valid numbers for all fields')
      }

      // Call the Flask API
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to get prediction')
      }

      const result = await response.json()
      setPrediction(result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Crop Prediction System
        </h1>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
          Enter your soil and environmental data to get crop recommendations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Soil Nutrients */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Soil Nutrients</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="N" className="block text-sm font-medium text-gray-700">
                      Nitrogen (N)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Leaf className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="N"
                        name="N"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-140"
                        value={formData.N}
                        onChange={(e) => setFormData({ ...formData, N: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="P" className="block text-sm font-medium text-gray-700">
                      Phosphorus (P)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Leaf className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="P"
                        name="P"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-140"
                        value={formData.P}
                        onChange={(e) => setFormData({ ...formData, P: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="K" className="block text-sm font-medium text-gray-700">
                      Potassium (K)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Leaf className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="K"
                        name="K"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-140"
                        value={formData.K}
                        onChange={(e) => setFormData({ ...formData, K: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="ph" className="block text-sm font-medium text-gray-700">
                      Soil pH
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BarChart className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="ph"
                        name="ph"
                        step="0.1"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-14"
                        value={formData.ph}
                        onChange={(e) => setFormData({ ...formData, ph: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Environmental Conditions */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Environmental Conditions</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">
                      Temperature (°C)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Thermometer className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="temperature"
                        name="temperature"
                        step="0.1"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-50"
                        value={formData.temperature}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="humidity" className="block text-sm font-medium text-gray-700">
                      Humidity (%)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Droplets className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="humidity"
                        name="humidity"
                        step="0.1"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-100"
                        value={formData.humidity}
                        onChange={(e) => setFormData({ ...formData, humidity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="rainfall" className="block text-sm font-medium text-gray-700">
                      Rainfall (mm)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Cloud className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        id="rainfall"
                        name="rainfall"
                        step="0.1"
                        className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="0-300"
                        value={formData.rainfall}
                        onChange={(e) => setFormData({ ...formData, rainfall: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                    Analyzing...
                  </>
                ) : (
                  'Predict Crop'
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white shadow rounded-lg p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">Prediction Results</h2>
          
          {prediction ? (
            <div className="space-y-6">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                <h3 className="text-lg font-medium text-primary-800">Recommended Crop</h3>
                <p className="text-3xl font-bold text-primary-600 mt-2">{prediction.recommendedCrop}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Top 5 Crop Probabilities</h3>
                <div className="space-y-3">
                  {Object.entries(prediction.probabilities).map(([crop, probability]) => (
                    <div key={crop} className="flex items-center">
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{crop}</span>
                          <span className="text-sm font-medium text-gray-700">{Math.round(probability * 100)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="bg-primary-600 h-2.5 rounded-full" 
                            style={{ width: `${probability * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Sun className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No prediction yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Enter your soil and environmental data to get crop recommendations.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default CropPrediction 