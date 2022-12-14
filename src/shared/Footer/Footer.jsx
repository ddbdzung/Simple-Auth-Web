import { faSquarePhone } from '@fortawesome/free-solid-svg-icons'
import { faMessage, faEnvelope, faCircleQuestion } from '@fortawesome/free-regular-svg-icons'
import PropTypes from 'prop-types';
import formatPhoneNumber from '../../helpers/formatPhoneNumber';

import IconNavLink from "../custom/IconNavLink";

Footer.propTypes = {
  phoneNumber: PropTypes.string,
};

export default function Footer(props) {
  const { phoneNumber } = props

  return (
    <footer className="absolute w-full bottom-0 h-[5.75rem] bg-black flex px-4 tablet:px-8 py-2 tablet:py-4 text-white font-medium justify-between">
      <div className="flex flex-col justify-between">
        <span>Hỗ trợ & Bán hàng 24/7</span>
        <div className="flex flex-row justify-start gap-4">
          <IconNavLink containerStyle="basis-1/6" icon={faSquarePhone} />
          <span className="font-bold">{phoneNumber && formatPhoneNumber(phoneNumber) || formatPhoneNumber('0987654321')}</span>
        </div>
      </div>
      <div className="flex gap-4">
        <IconNavLink icon={faMessage} />
        <IconNavLink icon={faEnvelope} />
        <IconNavLink icon={faCircleQuestion} />
      </div>
    </footer>
  )
}
