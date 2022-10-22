import { useEffect, useState } from "react";

import bell from '../../assets/images/bell.svg'

const Alert = ({ type, title, contents, id }) => {
  const [content, setContent] = useState(id);
  useEffect(() => {
    if (id) {
      setTimeout(() => {
        // Hide component
        setContent(prev => '')
      }, 3000)
    }

    return () => {
      if (contents) setContent(contents)
    }
  }, [id])

  return (
    <>
      {content ? (
        <div style={{ backgroundColor: type }}
          className={`text-white px-6 py-4 border-0 rounded relative mb-4`}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <div className="w-6 h-6">
              <img className="w-full" src={bell} />
            </div>
          </span>
          <span className="inline-block align-middle mr-8">
            <b className="capitalize mr-2">{title}</b>{contents}
          </span>
        </div>
      ) : null
      }
    </>
  );
};

export default Alert
