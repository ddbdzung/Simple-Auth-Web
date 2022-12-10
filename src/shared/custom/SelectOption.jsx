import { useField } from 'formik'

// Take label as props with the default others attributes of input element
const SelectOption = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input/>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select className="m-4" {...field} {...props} />
      {meta.touched && meta.error
        ? <span className="text-red-500 ml-2">{meta.error}</span>
        : null
      }
    </div>
  )
}

export default SelectOption
