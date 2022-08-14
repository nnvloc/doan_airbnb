import { S3Client } from "@aws-sdk/client-s3";

const AWS_ACCESS_KEY= process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_KEY= process.env.AWS_SECRET_ACCESS_KEY;

export const REGION = 'ap-southeast-1';

const S3 = new S3Client({
  credentials: {
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
  region: REGION,
});

export default S3;
