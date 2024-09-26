import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA2CUNLQGQMIKPLUER',
  secretAccessKey: "g'D0d77&",
  region: 'us-east-1'
});



const s3 = new AWS.S3();

export default s3;