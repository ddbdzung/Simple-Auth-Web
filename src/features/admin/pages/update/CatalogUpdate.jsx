import { useDispatch } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { updateCatalogAsync } from "../../adminSlice.js";
import SelectOption from "../../../../shared/custom/SelectOption.jsx";

export default function CatalogUpdate() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [catalog, setCatalog] = useState(null)
  const [catalogues, setCatalogues] = useState([])

  const getCatalogues = async (mounted) => {
    try {
      const { data } = await authAxios.get(`${API.CATALOG.BASE}/${API.CATALOG.GET_CATALOGUES}`)
      if (mounted) {
        setCatalogues(data.data)
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  const getCatalog = async (mounted) => {
    try {
      const { data } = await authAxios.get(`${API.CATALOG.BASE}/${API.CATALOG.GET_CATALOG}/${id}`)
      if (mounted) {
        setCatalog(data.data)
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    let mounted = true
    getCatalog(mounted)
    getCatalogues(mounted)

    return () => mounted = false
  }, [])

  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values
    data.id = id

    dispatch(updateCatalogAsync(data))
  }, 3000, { trailing: false })

  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/catalog">Danh mục</NavLink>
        </span>
      </div>
      <Formik enableReinitialize={true}
        initialValues={{
          name: catalog?.name || '',
          parentId: catalog?.parentId?._id ?? '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          parentId: Yup.string(),
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
              <label htmlFor="name">Tên danh mục</label>
              <TextInput2 type="text" id="name" name="name" />
            </div>
          </div >
          <div className="tablet:ml-60 gap-4 my-4 tablet:grid tablet:grid-cols-3">
            <div>
              <SelectOption label="Danh mục cha" id="parentId" name="parentId">
                <option className="p-2"></option>
                {catalogues && catalogues.map((catalog, idx) => (
                  <option className="p-2" key={idx} value={catalog._id}>{catalog.name}</option>
                ))}
              </SelectOption>
            </div>
          </div>
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
