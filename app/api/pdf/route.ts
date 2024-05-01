// app/routes/api/pdf/[id].ts

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")

  console.log("id", id)

  if (!id) {
    return new Response("Missing attachment ID", { status: 400 })
  }

  const attachment = await prisma.attachment.findUnique({
    where: { id },
    select: {
      name: true,
      mimeType: true,
      data: true,
    },
  })

  if (!attachment || !attachment.data) {
    return new Response("Attachment not found or has no data", { status: 404 })
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename="${encodeURIComponent(
      attachment.name
    )}"`,
  })

  return new Response(attachment.data, { headers })
}
