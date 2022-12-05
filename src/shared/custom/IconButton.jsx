import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

IconButton.propTypes = {
  icon: PropTypes.object.isRequired,
  linkTo: PropTypes.string,
  description: PropTypes.string,
  containerStyle: PropTypes.string,
}

function IconButton(props) {
  const { containerStyle, handleClick, description, ...iconProps } = props
  const handleOnClick = (typeof (handleClick) !== 'function') ? () => { } : e => handleClick()

  return (
    <div className={`w-full h-full ${containerStyle ?? ''}`}>
      <button onClick={handleOnClick} className="w-full h-full flex flex-col justify-center items-center">
        {/* Icon goes here */}
        <div className="w-fit h-fit p-0.5">
          <FontAwesomeIcon {...iconProps} />
        </div>
        {/* Description of icon goes here */}
        {description &&
          <span className="hidden tablet:inline-block laptop:inline-block">
            {description}
          </span>
        }
      </button>
    </div>
  )
}

export default IconButton
