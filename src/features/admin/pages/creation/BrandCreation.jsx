import { useDispatch, useSelector } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { afterCreatedItem, createBrandAsync } from "../../adminSlice.js";
import { useNavigate } from "react-router-dom";

export default function BrandCreation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCreatedItem } = useSelector(store => store.admin)

  useEffect(() => {
    if (isCreatedItem === true) {
      navigate('/admin/brand')
    }

    return () => {
      if (isCreatedItem === true) {
        dispatch(afterCreatedItem())
      }
    }
  }, [isCreatedItem])

  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values

    dispatch(createBrandAsync(data))
  }, 3000, { trailing: false })

  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/brand">Thuơng hiệu</NavLink>
        </span>
      </div>
      <Formik
        initialValues={{
          name: '',
          link: '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          link: Yup.string()
            .required('Required'),

        })}
        onSubmit={(values, actions) => {
          throttleWrapper(values, actions, dispatch)
        }}
      >
        <Form>
          <div className="tablet:ml-60 font-semibold mb-2">
            Thông tin
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
            <div>
              <label htmlFor="name">Tên thương hiệu</label>
              <TextInput2 type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="link">Đường dẫn gốc</label>
              <TextInput2 type="text" id="link" name="link" />
            </div>
          </div >
          <div className="tablet:ml-60 flex justify-end">
            <button type="submit" className="px-4 mr-4 block bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              Tạo
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
