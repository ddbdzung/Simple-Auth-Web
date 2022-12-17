import { useField } from 'formik'

const Textarea = (props) => {
  const [field, meta] = useField(props)
  const { classStyle, ...fields } = field
  const inputStyle = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'

  return (
    <>
      <textarea className={inputStyle} {...fields} {...props}></textarea>
      {meta.touched && meta.error
        ? <span className="text-red-500 pl-2">{meta.error}</span>
        : null
      }
    </>
  )
}

export default Textarea
