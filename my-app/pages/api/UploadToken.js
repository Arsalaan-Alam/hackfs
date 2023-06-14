
const { SpheronClient, ProtocolEnum } = require("@spheron/storage");
const SPHERON_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIzZDkwYTE5MmViODJiM2M1ZDc3NGY3YThmN2I5MDVjYWIxODIyZWM0ZmI5ZTNkNWIyYmZkODZhMDJhMDdhZTJkZmVkMzU4OGRhYjFjOTQ5MDkzMzQwYWNkNTQ5ZWE5ZjNlMzg3MTcyNGEzN2ExOTM0MDRmNDAwZDY3YWIzOWM3ZCIsImlhdCI6MTY4MzcwMzAyOCwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.tM3jYqDwrcj215NjWpyUXgtCJXysv29kJMw3VpXdXR4"
export default async function handler(req, res) {

    try {
        const bucketName = "example-browser-upload";
        const protocol = ProtocolEnum.FILECOIN;
    
        const client = new SpheronClient({
          token: SPHERON_TOKEN,
        });
    
        const { uploadToken } = await client.createSingleUploadToken({
          name: bucketName,
          protocol,
        });
    
        res.status(200).json({
          uploadToken,
        });
      } catch (error) {
        console.error(error);
       
      }


  }