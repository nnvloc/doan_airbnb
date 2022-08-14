import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import S3, { REGION } from './s3';

const DEFAULT_BUCKET = 'nncs3';

class FileStorage {
  constructor() {
    this.storage = S3;
  }

  preparePublicURL({
    bucket = DEFAULT_BUCKET,
    key,
  }) {
    return `https://${bucket}.s3.${REGION}.amazonaws.com/${key}`;
  }

  prepareParams({
    bucket = DEFAULT_BUCKET,
    ACL = 'public-read',
    key,
    body,
  }) {
    return new PutObjectCommand({
      Bucket: bucket,
      ACL,
      Key: key,
      Body: body,
    })
  }

  async upload(obj) {
    return this.storage.send(obj);
  }

  async getObject(key) {
    return this.storage.send(new GetObjectCommand({Key: key, Bucket: 'nncs3'}));
  }
}

export default new FileStorage();
