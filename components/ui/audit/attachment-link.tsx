import React, { useEffect, useState } from "react"
import { Attachment } from "@prisma/client"

type AttachmentProps = {
  attachment: Attachment
}

const AttachmentLink: React.FC<AttachmentProps> = ({ attachment }) => {
  const { name, mimeType, data, id } = attachment
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    const fetchPdf = async () => {
      const pdf = await fetch(`/api/pdf/${id}`)
      console.log("pdf", pdf)
      setUrl(url)
    }

    fetchPdf()
  }, [data, mimeType])

  if (!url) return <p>Loading attachment...</p>

  return (
    <a href={url} download={name}>
      Download {mimeType}
    </a>
  )
}

export default AttachmentLink
