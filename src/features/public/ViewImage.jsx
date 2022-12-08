import axios from "axios"
import { useState, useEffect } from "react"
import { API_ENTRY, BASE_DOMAIN } from "../../constants"

export default function ViewImage() {
  let imageList = []

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_DOMAIN}${API_ENTRY}/test/getImageList`)
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    }
    fetchData()

    return () => { }
  }, [])

  return (
    <>
      <div className="my-12">

      </div>
    </>
  )
}
