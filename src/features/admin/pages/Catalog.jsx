import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { loadState } from '../../../helpers/handleState.js';

import Loading from '../../../shared/Loading/index.jsx';
import { deleteCatalogAsync, getCataloguesAsync } from '../adminSlice.js';
import CRUD from '../partials/actions/CRUD.jsx';

const columns = [
  {
    name: 'Tên',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Danh mục cha',
    selector: row => row.parentId?.name ?? undefined,
    sortable: true,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Số bản ghi trong 1 page',
  rangeSeparatorText: 'đến',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function Catalog() {
  const { catalogues } = useSelector(store => store.admin)
  const [selectedCatalogues, setSelectedCatalogues] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getCataloguesAsync({}))

  }, [])

  const handleViewDetail = () => {
    if (selectedCatalogues.length === 1) {
      const { _id: id } = selectedCatalogues[0]
      navigate(`/admin/catalog/${id}`)
    }
  }
  const handleCreate = () => {
    navigate(`/admin/catalog/create`)
  }
  const handleUpdate = () => {
    if (selectedCatalogues.length === 1) {
      const { _id: id } = selectedCatalogues[0]
      navigate(`/admin/catalog/${id}/e`)
    }
  }
  const handleDelete = useCallback(() => {
    if (selectedCatalogues.length === 1) {
      const { _id: id } = selectedCatalogues[0]
      const willDelete = window.confirm('Bạn có chắc muốn xóa chứ?')
      if (!willDelete) return

      const catalogues = loadState('adCatalogues').adCatalogues
      if (!catalogues) {
        return
      }

      if (catalogues.findIndex(item => item._id === id) === -1) {
        return
      }

      dispatch(deleteCatalogAsync({ id }))
    }
  })

  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedCatalogues(selectedRows)
  })

  return (
    <div className="tablet:ml-60">
      {/* Navigation */}
      <div className="p-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/catalog">Danh mục</NavLink>
        </span>
      </div>
      <h1 className="text-center text-lg font-bold pb-2">Quản lý danh mục</h1>
      {(catalogues.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          tilte={'Quản lý danh mục'}

          columns={columns}
          data={catalogues}
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
