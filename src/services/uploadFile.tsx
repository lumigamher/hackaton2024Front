import s3 from '../api/awsConfig';

const uploadFile = (file: { name: string; type: string; }) => {
  const params = {
    Bucket: 'chronix-almacenamiento',
    Key: file.name,
    Body: file,
    ContentType: file.type,
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err: any, data: { Location: string; }) {
      if (err) {
        console.log('Error uploading file:', err);
        reject(err); // Rechaza la Promesa en caso de error
      } else {
        console.log('File uploaded successfully:', data.Location);
        resolve(data.Location); // Resuelve la Promesa con la ubicación del archivo
      }
    });
  });
};

export default uploadFile;
