export default function CRUD(props) {
  const { containerStyle, handleViewDetail, handleCreate, handleUpdate, handleDelete } = props
  return (
    <>
      <div className={`${containerStyle} flex gap-2`}>
        <button
          onClick={handleViewDetail}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
        >
          Chi tiết
        </button>
        <button
          onClick={handleCreate}
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          type="button"
        >
          Thêm
        </button>
        <button
          onClick={handleUpdate}
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          type="button"
        >
          Sửa
        </button>
        <button
          onClick={handleDelete}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          type="button"
        >
          Xóa
        </button>
      </div>
    </>
  )
}
