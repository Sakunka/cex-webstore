import { PutObjectCommand } from "@aws-sdk/client-s3";
import { r2Client } from "./cloudflareClient";

interface file {
  size: number;
  type: string;
  name: string;
  lastModified: string;
}

export default async function uploadImage(
  file: file,
  itemName: string,
  entityName: string
) {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(`Invalid file type: ${file.type}`);
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File too large");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const sanitizedItemName = (itemName || "item")
    .replace(/[^a-zA-Z0-9]/g, "-")
    .toLowerCase();

  const type = entityName.toLowerCase();
  const fileName = `${type}/${sanitizedItemName}-${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: file.type,
    ContentLength: buffer.length,
    Metadata: {
      originalName: file.name,
      itemName: itemName,
      category: entityName,
      uploadedAt: new Date().toISOString(),
    },
  });

  await r2Client.send(command);

  return `https://pub-cfcf2b050cb6495faf0f722c45644932.r2.dev/${fileName}`;
}
