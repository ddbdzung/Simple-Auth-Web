import { useField } from 'formik'
import { useState } from 'react'

const PasswordInput = props => {
  const inputStyle = 'pl-2 w-full outline-none border-none'
  const [field, meta] = useField(props)
  const { classStyle, ...fields } = field
  const [show, setShow] = useState(false)

  const handleShow = () => {
    setShow(prev => !prev)
  }

  return (
    <>
      <input type={show ? 'text' : 'password'} className={inputStyle} {...fields} {...props} />
      <button type="button" onClick={handleShow}
        className="border-b-2 border-r-2 border-t-2 border-2 border-l-slate-100 border-solid rounded-br-md rounded-tr-md rounded-tr-2 p-2 text-lg">
        {show ? 'Show' : 'Hide'}
      </button>
      {meta.touched && meta.error
        ? <span className="text-red-500 pl-2">{meta.error}</span>
        : null
      }
    </>
  )
}

export default PasswordInput
