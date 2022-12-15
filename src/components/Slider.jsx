import { Image } from "cloudinary-react"
import { useEffect, useState } from "react"

export default function Slider(props) {
  const { subImg } = props
  const [subImage, setSubImage] = useState(0)

  return (
    <>
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg tablet:w-1/3">
        {subImg && subImg.length > 0 &&
          subImg.map((slideSrc, idx) => (
            <div key={idx} className={`${(subImage === idx ? '' : 'hidden')} duration-700 ease-in-out`}>
              <Image
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                cloudName="dbbifu1w6"
                publicId={slideSrc}
                crop="scale"
              />
            </div>
          ))}

        {/* Slider controls */}
        <button
          onClick={e => {
            if (subImage < 0) { setSubImage(subImg.length - 1) }
            else {
              setSubImage(subImage - 1)
            }
          }}
          type="button"
          className="absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev=""
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>
        <button
          onClick={e => {
            if (subImage === subImg.length) { setSubImage(0) }
            else {
              setSubImage(prev => prev + 1)
            }
          }}
          type="button"
          className="absolute top-0 right-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next=""
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg
              aria-hidden="true"
              className="w-6 h-6 text-white dark:text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

    </>
  )
}
