import { useField } from 'formik'

const RadioBox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'radio' })
  const { className, ...props2 } = props
  return (
    <>
      <div className={className}>
        <label className="flex flex-row">
          <input type="radio" className="inline" {...field} {...props2} />
          {children}
        </label>
      </div>
      {meta.touched && meta.error
        ? <span className="text-red-500 pl-2">{meta.error}</span>
        : null
      }
    </>
  )
}

export default RadioBox
