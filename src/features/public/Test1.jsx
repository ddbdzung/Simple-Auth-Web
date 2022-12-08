import { Image } from 'cloudinary-react'
import { useState } from "react"
import { API_ENTRY, BASE_DOMAIN } from "../../constants"
import { customAxios } from "../../helpers/customAxios"

export default function Test1() {
  const [previewImage, setPreviewImage] = useState(null)

  const handleUploadFile = async (e) => {
    e.preventDefault()
    if (!previewImage) {
      alert('Select a file before submitting!')
      return
    }

    try {
      const result = await customAxios.post(
        '/test/uploadfile',
        {},
        { image: previewImage },
        { headers: { "Content-Type": "multipart/form-data" } })
      console.log(result)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <div>
        <h1>Upload and Display Image usign React Hook's</h1>
        {previewImage && (
          <div>
            <img alt="not found" width={"250px"} src={previewImage} />
            <br />
            <button className="bg-black text-white font-bold p-2" onClick={() => setPreviewImage(null)}>Remove</button>
          </div>
        )}
        <br />

        <br />
        <input
          type="file"
          onChange={(event) => {
            const reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onloadend = () => {
              setPreviewImage(reader.result)
            }
          }}
        />
      </div>
      <button onClick={e => handleUploadFile(e)}
        type="submit" className="bg-black text-white font-bold p-2">
        Upload
      </button>
      <Image
        cloudName="dbbifu1w6"
        publicId="products/i7ifvtdg8ybpnm4kngsq"
        width="300"
        crop="scale"
      />
    </>
  )
}
