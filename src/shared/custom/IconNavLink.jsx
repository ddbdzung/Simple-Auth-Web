import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

IconNavLink.propTypes = {
  icon: PropTypes.object.isRequired,
  linkTo: PropTypes.string,
  description: PropTypes.string,
  containerStyle: PropTypes.string,
}

function IconNavLink(props) {
  const { containerStyle, description, linkTo, ...iconProps } = props

  return (
    <div className={`w-full h-full ${containerStyle ?? ''}`}>
      <NavLink to={linkTo ?? ''} className="w-full h-full flex flex-col justify-center items-center">
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
      </NavLink>
    </div>
  )
}

export default IconNavLink
