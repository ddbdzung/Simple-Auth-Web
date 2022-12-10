import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import formatCurrencyVND from '../../../helpers/formatCurrencyVND.js';

import Loading from '../../../shared/Loading/index.jsx';
import { deleteProductAsync, getProductsAsync } from '../adminSlice.js';
import CRUD from '../partials/actions/CRUD.jsx';

const columns = [
  {
    name: 'Tên',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Giá tiền',
    selector: row => formatCurrencyVND(row.price),
    sortable: true,
  },
  {
    name: 'Giảm giá (%)',
    selector: row => row.discount,
    sortable: true,
  },
  {
    name: 'Số lượng',
    selector: row => row.quantity,
    sortable: true,
  },
  {
    name: 'Hãng sản xuất',
    selector: row => row.brandId.name,
    sortable: true,
  },
  {
    name: 'Danh mục',
    selector: row => row.catalogId.name,
    sortable: true,
  },
];

export default function Product() {
  const { products, formStatus } = useSelector(store => store.admin)
  const [selectedProducts, setSelectedProducts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getProductsAsync({}))
  }, [])


  const handleViewDetail = () => {
    if (selectedProducts.length === 1) {
      const { _id: id } = selectedProducts[0]
      navigate(`/admin/product/${id}`)
    }
  }
  const handleCreate = () => {
    navigate(`/admin/product/create`)
  }
  const handleUpdate = () => {
    if (selectedProducts.length === 1) {
      const { _id: id } = selectedProducts[0]
      navigate(`/admin/product/${id}/e`)
    }
  }
  const handleDelete = () => {
    if (selectedProducts.length === 1) {
      const { _id: id } = selectedProducts[0]
      dispatch(deleteProductAsync({ id: id }))
      window.location.reload()
    }
  }

  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedProducts(selectedRows)
  })
  return (
    <div className="tablet:ml-60">
      {/* Navigation */}
      <div className="p-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/product">Sản phẩm</NavLink>
        </span>
      </div>
      {(products.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          columns={columns}
          data={products}
          selectableRows
          onSelectedRowsChange={handleChange}
          progressPending={(formStatus === 'ready') ? false : true}
        />
      }
      {/* CRUD Buttons */}
      <CRUD containerStyle="my-4 justify-end"
        handleViewDetail={handleViewDetail}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
    </div>
  )
}
