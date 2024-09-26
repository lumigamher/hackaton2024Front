
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: 'us-east-1',
    credentials: {
        accessKeyId: 'AKIA2CUNLQGQFFLBH3GL',
        secretAccessKey: "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"
    }
});

export default s3;