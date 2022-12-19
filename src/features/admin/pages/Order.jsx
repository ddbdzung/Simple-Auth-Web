import { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon'

import formatCurrencyVND from '../../../helpers/formatCurrencyVND.js';

import Loading from '../../../shared/Loading/index.jsx';
import { getOrdersAsync } from '../adminSlice.js';
import CRUD from '../partials/actions/CRUD.jsx';

const columns = [
  {
    name: 'Người mua',
    selector: row => row.username,
    sortable: true,
  },
  {
    name: 'Địa chỉ email',
    selector: row => row.userEmail,
    sortable: true,
  },
  {
    name: 'Số điện thoại',
    selector: row => row.userPhone,
    sortable: true,
  },
  {
    name: 'Trạng thái',
    selector: row => {
      if (row.status === '-1') {
        return 'Đã hủy ❌'
      } else if (row.status === '0') {
        return 'Chưa paid 🤑'
      } else if (row.status === '1') {
        return 'Đã paid ✅'
      }
    },
    sortable: true,
  },
  {
    name: 'Tổng tiền',
    selector: row => formatCurrencyVND(row.totalAmount),
    sortable: true,
  },
  {
    name: 'Thời gian tạo',
    selector: row => {
      const dateTime = DateTime.fromMillis(Date.parse(row.createdAt))
        .setLocale('vi')
        .toFormat('dd/LL/yyyy-hh:mm:ss')
      return dateTime
    },
    sortable: true,
  },
];

const paginationComponentOptions = {
  rowsPerPageText: 'Số bản ghi trong 1 trang',
  rangeSeparatorText: 'đến',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Tất cả',
};

export default function Order() {
  const { orders } = useSelector(store => store.admin)
  const [selectedOrders, setSelectedOrders] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getOrdersAsync({}))

  }, [])

  const handleViewDetail = () => {
    if (selectedOrders.length === 1) {
      const { _id: id } = selectedOrders[0]
      navigate(`/admin/order/${id}`)
    }
  }
  const handleCreate = () => {
    return
  }
  const handleUpdate = () => {
    if (selectedOrders.length === 1) {
      const { _id: id } = selectedOrders[0]
      navigate(`/admin/order/${id}/e`)
    }
  }
  const handleDelete = useCallback(() => {
    return
  })

  const handleChange = useCallback(({ selectedRows }) => {
    setSelectedOrders(selectedRows)
  })

  return (
    <div className="tablet:ml-60">
      {/* Navigation */}
      <div className="p-2">
        <span className="text-black font-medium text-sm">
          <NavLink to="/admin">Trang chủ</NavLink>
          {' / '}
          <NavLink to="/admin/order">Đơn hàng</NavLink>
        </span>
      </div>
      <h1 className="text-center text-lg font-bold pb-2">Quản lý đơn hàng</h1>
      {(orders.length <= 0)
        ?
        <Loading />
        :
        <DataTable
          tilte={'Quản lý đơn hàng'}

          columns={columns}
          data={orders}
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
        deleteDisable={true}
        createDisable={true}
      />
    </div>
  )
}
