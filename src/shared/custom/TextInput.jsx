import { useField } from 'formik'

// Take label as props with the default others attributes of input element
const TextInput = (props) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input/>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  const { classStyle, ...fields } = field
  const inputStyle = 'pl-2 w-full outline-none border-none'

  return (
    <>
      <input className={inputStyle} {...fields} {...props} />
      {meta.touched && meta.error
        ? <span className="text-red-500 pl-2">{meta.error}</span>
        : null
      }
    </>
  )
}

export default TextInput
