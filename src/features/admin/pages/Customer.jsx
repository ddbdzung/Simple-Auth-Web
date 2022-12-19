import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, NavLink } from 'react-router-dom';
import { DateTime } from 'luxon'

import { loadState } from '../../../helpers/handleState.js';
import Loading from '../../../shared/Loading/index.jsx';
import { deleteUserAsync, getUserAsync } from '../adminSlice.js';
import CRUD from '../partials/actions/CRUD.jsx';

const columns = [
  {
    name: 'Họ tên',
    selector: row => row?.username,
    sortable: true,
  },
  {
    name: 'Địa chỉ email',
    selector: row => row?.email,
    sortable: true,
  },
  {
    name: 'Trạng thái',
    selector: row => row?.status,
    sortable: true,
  },
  {
    name: 'Thời điểm tạo',
    selector: row => DateTime.fromMillis(Date.parse(row?.createdAt))
      .setLocale('vi')
      .toFormat('dd/LL/yyyy-hh:mm:ss'),
    sortable: true,
  },
  {
    name: 'Cập nhật lúc',
    selector: row => DateTime.fromMillis(Date.parse(row.updatedAt))
      .setLocale('vi')
      .toFormat('dd/LL/yyyy-hh:mm:ss'),
    sortable: true,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Số bản ghi trong 1 page',
  rangeSeparatorText: 'đến',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

export default function Customer() {
  const { users } = useSelector(store => store.admin)
  const [selectedUsers, setSelectedUsers] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserAsync({}))

  }, [])

  const handleViewDetail = () => {
    if (selectedUsers.length === 1) {
      const { _id: id } = selectedUsers[0]
      navigate(`/admin/customer/${id}`)
    }
  }
  const handleCreate = () => {
    navigate(`/admin/customer/create`)
  }
  const handleUpdate = () => {
    // if (selectedUsers.length === 1) {
    //   const { _id: id } = selectedUsers[0]
    //   navigate(`/admin/customer/${id}/e`)
    // }
    return
  }
  const handleDelete = useCallback(() => {
    if (selectedUsers.length === 1) {
      const { _id: id } = selectedUsers[0]
      const willDelete = window.confirm('Bạn có chắc muốn xóa chứ?')
      if (!willDelete) return

      const users = loadState('adUsers').adUsers
      if (!users) {
        return
      }

      if (users.findIndex(item => item._id === id) === -1) {
        return
      }

      dispatch(deleteUserAsync({ id }))
    }
  })

  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedUsers(selectedRows)
  })

  return (
    <div className="tablet:ml-60">
      {/* Navigation */}
      <div className="p-2">
        <span classNa me="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/customer">Khách hàng</NavLink>
        </span>
      </div>
      <h1 className="text-center text-lg font-bold pb-2">Quản lý khách hàng</h1>
      {(users.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          tilte={'Quản lý danh mục'}

          columns={columns}
          data={users}
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
