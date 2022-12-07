import { useState } from "react"

import Sub1 from '../assets/images/products/sub-default-1.jpg'
import Sub2 from '../assets/images/products/sub-default-2.jpg'
import Sub3 from '../assets/images/products/sub-default-3.jpg'
import Sub4 from '../assets/images/products/sub-default-4.jpg'
import Sub5 from '../assets/images/products/sub-default-5.jpg'
import Sub6 from '../assets/images/products/sub-default-6.jpg'
import Sub7 from '../assets/images/products/sub-default-7.jpg'

export default function Slider(props) {
  // TODO in prod will uncomment
  // const { subImg } = props
  const [subImage, setSubImage] = useState(0)
  const subImgs = [Sub1, Sub2, Sub3, Sub4, Sub5, Sub6, Sub7]

  return (
    <>
      {/* Carousel wrapper */}
      <div className="relative h-56 overflow-hidden rounded-lg tablet:w-1/3">
        {subImgs.length > 0 && (<>
          {subImgs.map((slideSrc, idx) => (
            <div key={idx} className={`${(subImage === idx ? '' : 'hidden')} duration-700 ease-in-out`}>
              <img
                src={slideSrc}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          ))}
        </>)}
        {/* Slider controls */}
        <button
          onClick={e => {
            if (subImage < 0) { setSubImage(subImgs.length - 1) }
            else {
              setSubImage(subImage - 1)
            }
          }}
          type="button"
          className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
            if (subImage === subImgs.length) { setSubImage(0) }
            else {
              setSubImage(prev => prev + 1)
            }
          }}
          type="button"
          className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
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
