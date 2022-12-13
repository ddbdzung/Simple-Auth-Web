import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import formatCurrencyVND from '../../../helpers/formatCurrencyVND.js';
import { loadState } from '../../../helpers/handleState.js';

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
    selector: row => row.brandId?.name,
    sortable: true,
  },
  {
    name: 'Danh mục',
    selector: row => row.catalogId?.name,
    sortable: true,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Số bản ghi trong 1 page',
  rangeSeparatorText: 'đến',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function Product() {
  const { products } = useSelector(store => store.admin)
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
  const handleDelete = useCallback(() => {
    if (selectedProducts.length === 1) {
      const { _id: id } = selectedProducts[0]
      const willDelete = window.confirm('Bạn có chắc muốn xóa chứ?')
      if (!willDelete) return

      const products = loadState('adProducts').adProducts
      if (!products) {
        return
      }

      if (products.findIndex(item => item._id === id) === -1) {
        return
      }

      dispatch(deleteProductAsync({ id }))
    }
  })

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
      <h1 className="text-center text-lg font-bold pb-2">Quản lý sản phẩm</h1>
      {(products.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          tilte={'Quản lý sản phẩm'}

          columns={columns}
          data={products}
          selectableRows
          selectableRowsSingle
          onSelectedRowsChange={handleChange}

          pagination
          paginationComponentOptions={paginationComponentOptions}

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
