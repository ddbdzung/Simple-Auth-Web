import { useDispatch, useSelector } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { createProductAsync, afterCreatedItem } from "../../adminSlice.js";
import SelectOption from "../../../../shared/custom/SelectOption.jsx";
import { useNavigate } from "react-router-dom";

export default function ProductCreation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isCreatedItem } = useSelector(store => store.admin)
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImageList, setPreviewImageList] = useState([])
  const [catalogues, setCatalogues] = useState([])
  const [brands, setBrands] = useState([])

  useEffect(() => {
    if (isCreatedItem === true) {
      navigate('/admin/product')
    }

    return () => {
      if (isCreatedItem === true) {
        dispatch(afterCreatedItem())
      }
    }
  }, [isCreatedItem])

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

  const getBrands = async (mounted) => {
    try {
      const { data } = await authAxios.get(`${API.BRAND.BASE}/${API.BRAND.GET_BRANDS}`)
      if (mounted) {
        setBrands(data.data)
      }
    } catch (err) {
      console.log(err)
      return
    }
  }

  useEffect(() => {
    let mounted = true
    getCatalogues(mounted)
    getBrands(mounted)

    return () => mounted = false
  }, [])
  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values
    if (!previewImage) {
      alert('C???n ???nh ch??nh ????? t???o s???n ph???m m???i!')
      return
    }

    data.image = previewImage
    data.listSubImage = previewImageList || []
    dispatch(createProductAsync(data))
  }, 3000, { trailing: false })

  const handleSetPreview = (event) => {
    const reader = new FileReader()
    if (event.target.files.length > 0) {
      reader.readAsDataURL(event.target.files[0])
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
    }
  }
  const handleSetPreviewList = (event) => {
    const files = event.target.files
    let fileArr = []
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader()
      reader.readAsDataURL(files[i])
      reader.onloadend = () => {
        fileArr.push(reader.result)
      }
    }
    setPreviewImageList(fileArr)
  }

  return (
    <>
      {/* Navigation */}
      <div className="tablet:ml-60 mb-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang ch???</NavLink>
          {' / '}
          <NavLink to="/admin/product">S???n ph???m</NavLink>
        </span>
      </div>
      <Formik
        initialValues={{
          name: '',
          price: 1,
          warranty: 1,
          discount: 0,
          quantity: 0,

          'description': '',
          'ram': '',
          'rom': '',
          'battery': '',
          'screensize': '',
          'screenType': '',
          'color': '',
          'cpu': '',
          'gpu': '',
          'release': '',
          'bonus': '',
          'catalogId': '',
          'brandId': '',
        }}
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Required'),
          price: Yup.number()
            .min(1)
            .required('Required'),
          warranty: Yup.number()
            .min(1)
            .required('Required'),
          discount: Yup.number()
            .min(0)
            .max(100)
            .required('Required'),
          quantity: Yup.number()
            .min(0)
            .required('Required'),
          brandId: Yup.string().required('Required'),
          catalogId: Yup.string().required('Required'),

          description: Yup.string().max(5000),
          ram: Yup.number().min(1),
          rom: Yup.number().min(8),
          battery: Yup.number().min(1),
          screensize: Yup.number().min(4),
          screenType: Yup.string(),
          color: Yup.string(),
          cpu: Yup.string(),
          gpu: Yup.string(),
          release: Yup.date(),
          bonus: Yup.string(),
        })}
        onSubmit={(values, actions) => {
          throttleWrapper(values, actions, dispatch)
        }}
      >
        <Form>
          <div className="tablet:ml-60 font-semibold mb-2">
            Th??ng tin chung
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
            <div>
              <label htmlFor="name">T??n s???n ph???m</label>
              <TextInput2 type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="price">Gi?? ti???n</label>
              <TextInput2 type="text" id="price" name="price" />
            </div>
            <div>
              <label htmlFor="discount">Gi???m gi?? (%)</label>
              <TextInput2 type="text" id="discount" name="discount" />
            </div>
            <div>
              <label htmlFor="quantity">S??? l?????ng</label>
              <TextInput2 type="text" id="quantity" name="quantity" />
            </div>
            <div>
              <label htmlFor="warranty">B???o h??nh (th??ng)</label>
              <TextInput2 type="text" id="warranty" name="warranty" />
            </div>
          </div >
          <div className="tablet:ml-60 gap-4 my-4 tablet:grid tablet:grid-cols-3">
            <div>
              <SelectOption label="H??ng s???n xu???t" id="brandId" name="brandId">
                <option className="p-2" value="">Ch???n h??ng s???n xu???t</option>
                {brands && brands.map((brand, idx) => (
                  <option key={idx} value={brand._id}>{brand.name}</option>
                ))}
              </SelectOption>
            </div>
            <div>
              <SelectOption label="Danh m???c h??ng" id="catalogId" name="catalogId">
                <option className="p-2" value="">Ch???n danh m???c h??ng</option>
                {catalogues && catalogues.map((catalog, idx) => (
                  <option className="p-2" key={idx} value={catalog._id}>{catalog.name}</option>
                ))}
              </SelectOption>
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Th??ng s???
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3">
            <div>
              <label htmlFor="ram">RAM (GB)</label>
              <TextInput2 type="text" id="ram" name="ram" />
            </div>
            <div>
              <label htmlFor="rom">ROM (GB)</label>
              <TextInput2 type="text" id="rom" name="rom" />
            </div>
            <div>
              <label htmlFor="battery">Th???i l?????ng pin (mAh)</label>
              <TextInput2 type="text" id="battery" name="battery" />
            </div>
            <div>
              <label htmlFor="screensize">K??ch th?????c m??n h??nh (inch)</label>
              <TextInput2 type="text" id="screensize" name="screensize" />
            </div>
            <div>
              <label htmlFor="screenType">C??ng ngh??? m??n h??nh</label>
              <TextInput2 type="text" id="screenType" name="screenType" />
            </div>
            <div>
              <label htmlFor="cpu">CPU</label>
              <TextInput2 type="text" id="cpu" name="cpu" />
            </div>
            <div>
              <label htmlFor="gpu">GPU</label>
              <TextInput2 type="text" id="gpu" name="gpu" />
            </div>
            <div>
              <label htmlFor="color">M??u s???c</label>
              <TextInput2 type="text" id="color" name="color" />
            </div>
            <div>
              <label htmlFor="release">Ng??y ra m???t</label>
              <TextInput2 type="text" id="release" name="release" />
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Chi ti???t
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
            <div>
              <label htmlFor="description">M?? t??? ng???n</label>
              <TextInput2 type="text" id="description" name="description" />
            </div>
            <div>
              <label htmlFor="bonus">Qu?? t???ng k??m</label>
              <TextInput2 type="text" id="bonus" name="bonus" />
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            ???nh ch??nh
          </div>
          <div className="tablet:ml-60">
            <div>
              <input
                id="priImg"
                type="file"
                onChange={handleSetPreview}
              />
            </div>
            {previewImage && (
              <div>
                <img alt="not found" width={"250px"} src={previewImage} />
                <br />
                <button className="bg-black text-white font-bold p-2" onClick={() => {
                  document.getElementById('priImg').value = null
                  setPreviewImage(null)
                }}>Remove</button>
              </div>
            )}
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            ???nh ph???
          </div>
          <div className="tablet:ml-60">
            <div>
              <input
                type="file"
                onChange={e => {
                  handleSetPreviewList(e)
                }}
                multiple
              />
            </div>
            {previewImageList?.length > 0 && previewImageList.map((image, idx) => (
              <div key={idx}>
                <img alt="not found" width={"250px"} src={image} />
              </div>
            ))}
          </div>
          <div className="tablet:ml-60 flex justify-end">
            <button type="submit" className="px-4 mr-4 block bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
              T???o
            </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
