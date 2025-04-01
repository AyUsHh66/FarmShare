import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

const NotFound: FC = () => {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-600">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
        <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          <Home className="h-5 w-5 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound 