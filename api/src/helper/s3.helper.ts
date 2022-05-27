import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Credentials } from 'aws-sdk';
const configuration = new Credentials(
  process.env.ACCESS_KEY_ID || '',
  process.env.SECRET_ACCESS_KEY || ''
);

const s3Client = new S3Client({
  region: process.env.REGION,
  apiVersion: '2006-03-01',
  credentials: configuration,
});

export const getUrl = async (bucket: string, key: string) => {
  // check that bucket and key are not empty
  if (bucket === '' || key === '') {
    throw new Error('bucket and key must not be empty');
  }
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  try {
    //check file exists in bucket
    const exists = await s3Client.send(command);

    if (exists.$metadata.httpStatusCode === 200) {
      //if file exists, return signed url
      const url = await getSignedUrl(s3Client, command);
      return url;
    } else {
      //if file does not exist, return null
      return null;
    }
  } catch (error) {
    console.log('getUrl: error: ', error);
    return null;
  }
};
