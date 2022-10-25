import { Link } from "react-router-dom";

export default function ForbiddenPage() {

  return (
    <section className="flex items-center min-h-screen h-full p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-md text-center">
          <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
            <span className="sr-only">Error</span>403
          </h2>
          <p className="text-2xl font-semibold md:text-3xl mb-8">FORBIDDEN</p>
          <Link rel="noopener noreferrer"
            to='/auth/identify'
            className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">
            Back
          </Link>
        </div>
      </div>
    </section>
  )
}
