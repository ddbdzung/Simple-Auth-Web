import ModalImage from "react-modal-image";
import { useDispatch } from "react-redux";
import throttle from 'lodash.throttle'
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import * as Yup from 'yup'
import { Formik, Form } from "formik";

import { authAxios } from "../../../../configs/axios.mjs"
import { API } from "../../../../constants/index.js"
import TextInput2 from "../../../../shared/custom/TextInput2.jsx";
import { updateProductAsync } from "../../adminSlice.js";
import SelectOption from "../../../../shared/custom/SelectOption.jsx";

export default function ProductUpdate() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImageList, setPreviewImageList] = useState([])
  const [catalogues, setCatalogues] = useState([])
  const [brands, setBrands] = useState([])
  const [product, setProduct] = useState(null)

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

  const getProduct = async (mounted) => {
    try {
      const { data } = await authAxios.get(`${API.PRODUCT.BASE}/${API.ADMIN}${API.PRODUCT.GET_PRODUCT}/${id}`)
      if (mounted) {
        setProduct(data.data)
        setPreviewImage(data.data.imageLink)
        if (data.data?.imageList && data.data?.imageList?.length > 0) {
          setPreviewImageList(data.data?.imageList)
        }
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
    getProduct(mounted)

    return () => mounted = false
  }, [])
  const throttleWrapper = throttle(async (values, actions, dispatch) => {
    const data = values
    if (!previewImage) {
      alert('Cần ảnh chính để tiếp tục!')
      return
    }

    data.id = id
    if (previewImage.length > 255) {
      data.image = previewImage
    }
    data.listSubImage = previewImageList || []
    dispatch(updateProductAsync(data))
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
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/product">Sản phẩm</NavLink>
        </span>
      </div>
      <Formik enableReinitialize={true}
        initialValues={{
          name: product?.name || '',
          price: product?.price || '',
          warranty: product?.warranty || '',
          discount: product?.discount || '',
          quantity: product?.quantity || '',

          description: product?.description || '',
          ram: product?.ram || '',
          rom: product?.rom || '',
          battery: product?.battery || '',
          screensize: product?.screensize || '',
          screenType: product?.screenType || '',
          color: product?.color || '',
          cpu: product?.cpu || '',
          gpu: product?.gpu || '',
          release: product?.release || '',
          bonus: product?.bonus || '',
          catalogId: product?.catalogId?._id || '',
          brandId: product?.brandId?._id || '',
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
            Thông tin chung
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-3" >
            <div>
              <label htmlFor="name">Tên sản phẩm</label>
              <TextInput2 type="text" id="name" name="name" />
            </div>
            <div>
              <label htmlFor="price">Giá tiền</label>
              <TextInput2 type="text" id="price" name="price" />
            </div>
            <div>
              <label htmlFor="discount">Giảm giá (%)</label>
              <TextInput2 type="text" id="discount" name="discount" />
            </div>
            <div>
              <label htmlFor="quantity">Số lượng</label>
              <TextInput2 type="text" id="quantity" name="quantity" />
            </div>
            <div>
              <label htmlFor="warranty">Bảo hành (tháng)</label>
              <TextInput2 type="text" id="warranty" name="warranty" />
            </div>
          </div >
          <div className="tablet:ml-60 gap-4 my-4 tablet:grid tablet:grid-cols-3">
            <div>
              <SelectOption label="Hãng sản xuất" id="brandId" name="brandId">
                <option className="p-2" value="">Chọn hãng sản xuất</option>
                {brands && brands.map((brand, idx) => (
                  <option key={idx} value={brand._id}>{brand.name}</option>
                ))}
              </SelectOption>
            </div>
            <div>
              <SelectOption label="Danh mục hàng" id="catalogId" name="catalogId">
                <option className="p-2" value="">Chọn danh mục hàng</option>
                {catalogues && catalogues.map((catalog, idx) => (
                  <option className="p-2" key={idx} value={catalog._id}>{catalog.name}</option>
                ))}
              </SelectOption>
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Thông số
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
              <label htmlFor="battery">Thời lượng pin (mAh)</label>
              <TextInput2 type="text" id="battery" name="battery" />
            </div>
            <div>
              <label htmlFor="screensize">Kích thước màn hình (inch)</label>
              <TextInput2 type="text" id="screensize" name="screensize" />
            </div>
            <div>
              <label htmlFor="screenType">Công nghệ màn hình</label>
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
              <label htmlFor="color">Màu sắc</label>
              <TextInput2 type="text" id="color" name="color" />
            </div>
            <div>
              <label htmlFor="release">Ngày ra mắt</label>
              <TextInput2 type="text" id="release" name="release" />
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Chi tiết
          </div>
          <div className="tablet:ml-60 gap-4 tablet:grid tablet:grid-cols-2">
            <div>
              <label htmlFor="description">Mô tả ngắn</label>
              <TextInput2 type="text" id="description" name="description" />
            </div>
            <div>
              <label htmlFor="bonus">Quà tặng kèm</label>
              <TextInput2 type="text" id="bonus" name="bonus" />
            </div>
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Ảnh chính
          </div>
          <div className="tablet:ml-60">
            <div>
              <input
                type="file"
                onChange={handleSetPreview}
              />
            </div>
            {previewImage && (
              <div>
                <ModalImage
                  small={(previewImage.length > 255) ? previewImage : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/' + previewImage}
                  medium={(previewImage.length > 255) ? previewImage : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/' + previewImage}
                  large={(previewImage.length > 255) ? previewImage : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale,w_1700/v1/' + previewImage}
                  alt="Ảnh chính"
                />
                <button className="bg-black text-white font-bold p-2" onClick={() => setPreviewImage(null)}>Remove</button>
              </div>
            )}
          </div>
          <div className="tablet:ml-60 font-semibold my-4">
            Ảnh phụ
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
                <ModalImage
                  small={(image.length > 255) ? image : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/' + image}
                  medium={(image.length > 255) ? image : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale/v1/' + image}
                  large={(image.length > 255) ? image : 'https://res.cloudinary.com/dbbifu1w6/image/upload/c_scale,w_1700/v1/' + image}
                  alt="Ảnh phụ"
                />
              </div>
            ))}

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
