import { useDispatch, useSelector } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { afterCreatedItem, createUserAsync } from "../../adminSlice.js";
import { useNavigate } from "react-router-dom";
import SelectOption from "../../../../shared/custom/SelectOption.jsx";
import Textarea from "../../../../shared/custom/Textarea.jsx";

export default function CustomerCreation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCreatedItem } = useSelector(store => store.admin)

  useEffect(() => {
    if (isCreatedItem === true) {
      navigate('/admin/customer')
    }

    return () => {
      if (isCreatedItem === true) {
        dispatch(afterCreatedItem())
      }
    }
  }, [isCreatedItem])

  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values

    dispatch(createUserAsync(data))
  }, 3000, { trailing: false })

  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/customer">Khách hàng</NavLink>
        </span>
      </div>
      <Formik
        initialValues={{
          username: '',
          email: '',
          phoneNumber: '',
          password: '',
          gender: 'male',
          address: '',
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required('Yêu cầu không được bỏ trống'),
          email: Yup.string()
            .required('Yêu cầu không được bỏ trống')
            .email('Phải có dạng email hợp lệ'),
          password: Yup.string()
            .required('Yêu cầu không được bỏ trống')
            .min(8, 'Tối thiểu 8 kí tự'),
          phoneNumber: Yup.string(),
          address: Yup.string(),
          gender: Yup.string().oneOf(['male', 'female', 'other']),
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
              <label htmlFor="username">Họ tên</label>
              <TextInput2 type="text" id="username" name="username" />
            </div>
            <div>
              <label htmlFor="email">Địa chỉ email</label>
              <TextInput2 type="text" id="email" name="email" />
            </div>
            <div>
              <label htmlFor="password">Mật khẩu</label>
              <TextInput2 type="text" id="password" name="password" />
            </div>
            <div>
              <label htmlFor="phoneNumber">Số điện thoại</label>
              <TextInput2 type="text" id="phoneNumber" name="phoneNumber" />
            </div>
          </div >
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
            <div>
              <label htmlFor="address">Địa chỉ người nhận</label>
              <Textarea type="text" id="address" name="address" />
            </div>
            <div>
              <SelectOption label="Giới tính" id="gender" name="gender">
                <option className="p-2" value="male">Nam</option>
                <option className="p-2" value="female">Nữ</option>
                <option className="p-2" value="other">Khác</option>
              </SelectOption>
            </div>
          </div>
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
