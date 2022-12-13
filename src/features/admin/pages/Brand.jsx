import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loadState } from '../../../helpers/handleState.js';

import Loading from '../../../shared/Loading/index.jsx';
import { deleteBrandAsync, getBrandsAsync } from '../adminSlice.js';
import CRUD from '../partials/actions/CRUD.jsx';

const columns = [
  {
    name: 'Tên',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Đường dẫn gốc',
    selector: row => row.link,
    sortable: true,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Số bản ghi trong 1 page',
  rangeSeparatorText: 'đến',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function Brand() {
  const { brands } = useSelector(store => store.admin)
  const [selectedBrands, setSelectedBrands] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getBrandsAsync({}))

  }, [])

  const handleViewDetail = () => {
    if (selectedBrands.length === 1) {
      const { _id: id } = selectedBrands[0]
      navigate(`/admin/brand/${id}`)
    }
  }
  const handleCreate = () => {
    navigate(`/admin/brand/create`)
  }
  const handleUpdate = () => {
    if (selectedBrands.length === 1) {
      const { _id: id } = selectedBrands[0]
      navigate(`/admin/brand/${id}/e`)
    }
  }
  const handleDelete = useCallback(() => {
    if (selectedBrands.length === 1) {
      const { _id: id } = selectedBrands[0]
      const willDelete = window.confirm('Bạn có chắc muốn xóa chứ?')
      if (!willDelete) return

      const brands = loadState('adBrands').adBrands
      if (!brands) {
        return
      }

      if (brands.findIndex(item => item._id === id) === -1) {
        return
      }

      dispatch(deleteBrandAsync({ id }))
    }
  })

  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedBrands(selectedRows)
  })

  return (
    <div className="tablet:ml-60">
      {/* Navigation */}
      <div className="p-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/brand">Thương hiệu</NavLink>
        </span>
      </div>
      <h1 className="text-center text-lg font-bold pb-2">Quản lý thương hiệu</h1>
      {(brands.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          tilte={'Quản lý thương hiệu'}

          columns={columns}
          data={brands}
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
