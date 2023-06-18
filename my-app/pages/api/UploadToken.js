
const { SpheronClient, ProtocolEnum } = require("@spheron/storage");
const SPHERON_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiJmMmYzNjhlMzRiZGRhYmQxMWVlOWU0NGIyMmFhNTYwM2VlODk4ZGU2M2ZiMDkxZDFmMGFkYzFjMTkzY2ZlMWNjM2EwMWIyNWI0Yjg3MDQ1ZjEzMTY4NGM0ZTNlYmJiMjQ3MDQxMzJkYmIyZDllMTNmY2M1NDI5NmY1OGIxOGMxMCIsImlhdCI6MTY4NzA3NzIzMiwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.ZTEHoDeV1oA3jNzmD2_mu0EXz_6r9yX_Qjtw8PCnRSI"
export default async function handler(req, res) {

    try {
        const bucketName = "fvm_bucket";
        const protocol = ProtocolEnum.IPFS;
    
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