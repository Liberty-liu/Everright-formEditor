const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
const filetoDataURL = (dataurl) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = dataurl
    image.onload = function () {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)
      const ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase()
      const dataURL = canvas.toDataURL('image/' + ext)
      resolve(dataURL)
    }
  })
}
export {
  dataURLtoFile,
  filetoDataURL
}
