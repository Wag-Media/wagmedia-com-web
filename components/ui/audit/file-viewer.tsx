type FileViewerProps = {
  mimeType: string
  byteArray: string | null
  children: React.ReactNode
}

const FileViewer: React.FC<FileViewerProps> = ({
  mimeType,
  byteArray,
  children,
}) => {
  const base64ToBlob = (base64: string, mimeType: string) => {
    const binary = Buffer.from(base64, "base64").toString("binary")
    const length = binary.length
    const bytes = new Uint8Array(length)
    for (let i = 0; i < length; i++) {
      bytes[i] = binary.charCodeAt(i)
    }
    return new Blob([bytes], { type: mimeType })
  }

  const b = byteArray as string

  // Create a URL from the byteArray
  const blob = base64ToBlob(b, mimeType)
  const fileUrl = URL.createObjectURL(blob)

  const handleButtonClick = () => {
    // Open the generated file URL in a new tab
    window.open(fileUrl, "_blank")
  }

  return (
    <div>
      <button onClick={handleButtonClick}>{children}</button>
    </div>
  )
}

export default FileViewer
