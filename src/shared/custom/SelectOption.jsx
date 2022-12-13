import { useField } from 'formik'

// Take label as props with the default others attributes of input element
const SelectOption = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input/>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <div>
      <label className="mr-2" htmlFor={props.id || props.name}>{label}</label>
      <select className="my-4 tablet:mt-0 py-2" {...field} {...props} />
      {meta.touched && meta.error
        ? <span className="text-red-500 ml-2">{meta.error}</span>
        : null
      }
    </div>
  )
}

export default SelectOption
