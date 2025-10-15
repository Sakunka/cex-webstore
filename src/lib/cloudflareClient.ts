import { S3Client } from "@aws-sdk/client-s3";

const getR2Endpoint = () => {
  const accountId = process.env.R2_ACCOUNT_ID;
  if (!accountId) {
    throw new Error("R2_ACCOUNT_ID is not set in environment variables");
  }
  return `https://${accountId}.r2.cloudflarestorage.com`;
};

export const r2Client = new S3Client({
  region: "auto",
  endpoint: getR2Endpoint(),
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const R2_CONFIG = {
  bucketName: process.env.R2_BUCKET_NAME || "",
  publicUrl: process.env.R2_PUBLIC_URL || "",
  maxFileSize: 10 * 1024 * 1024,
  allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
  presignedUrlExpiry: 300,
};
