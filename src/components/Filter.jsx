import { useState } from "react"
import PropTypes from 'prop-types';

Filter.propTypes = {
  handleFilter: PropTypes.func,
};

export default function Filter(props) {
  const [filterOpt, setFilterOpt] = useState('')
  return (
    <div className="mb-2 flex justify-end items-center" >
      <div className="bg-slate-300 text-sm">
        <select onChange={e => { setFilterOpt(e.target.value) }} defaultChecked={'defaultFilter'} id="small" className="inline-block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="defaultFilter">Sắp xếp</option>
          <option value="ascPrice">Giá từ thấp đến cao</option>
          <option value="descPrice">Giá từ cao đến thấp</option>
        </select>
      </div>
    </div >
  )
}
