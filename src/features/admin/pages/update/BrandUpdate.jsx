import { useDispatch } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { updateBrandAsync } from "../../adminSlice.js";

export default function BrandUpdate() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [brand, setBrand] = useState(null)

  const getBrand = async (mounted) => {
    try {
      const { data } = await authAxios.get(`${API.BRAND.BASE}/${API.BRAND.GET_BRAND}/${id}`)
      if (mounted) {
        setBrand(data.data)
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    let mounted = true
    getBrand(mounted)

    return () => mounted = false
  }, [])

  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values
    data.id = id

    dispatch(updateBrandAsync(data))
  }, 3000, { trailing: false })

  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/brand">Thương hiệu</NavLink>
        </span>
      </div>
      <Formik enableReinitialize={true}
        initialValues={{
          name: brand?.name || '',
          link: brand?.link || '',
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
              Cập nhật
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
