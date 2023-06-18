import { SpheronClient, ProtocolEnum } from "@spheron/storage";
//import { LitNodeClient, LitJsSdk } from "@lit-protocol/lit-node-client";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
//const token = process.env.SPHERON_TOKEN
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiI0ZTQ5ZTFhNDYzZjY1N2ZlYjhjOTA4ZjQ5YjI4OTJlMzRmOTY1YTAxOTdjMzFjYzBjZTA0ODQ0ODhlOTcyZjZmMDE0NTBhYjc5NjUzOTE1YmFmMTc4Mjk3Y2MwMDliYTcwZDk5ODdmODIxODg4NWM5MDAwMjMwOWE0MmYzZDQyOCIsImlhdCI6MTY4NDQzNTU2OSwiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.QCs4q1SiDomS_4CYZ-lN-5gf018MB7ktF-0Q3hQ3tRw'
const chain = "ethereum"

    const accessControlConditions = [
        {
            contractAddress: "",
            standardContractType: "",
            chain: chain,
            method: "eth_getBalance",
            parameters: [":userAddress", "latest"],
            returnValueTest: {
                comparator: ">=",
                value: "0", // anybody can do
            },
        },
    ];


export const encryptAndUpload = async (filePath) => {
    /*
    const litClient = new LitNodeClient({
        litNetwork: 'serrano',
        debug: false,
    });
    await litClient.connect();
    */
    try {
        const litClient = new LitJsSdk.LitNodeClient({
            litNetwork: 'serrano',
            debug: false,
        })
        await litClient.connect()

        const spheron = new SpheronClient({
            token: token,
        });

        console.log(filePath)
        const bucketName = 'fvm_bucket'      
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain });

        console.log( authSig )
        console.log(accessControlConditions)
        console.log(chain)
        console.log(filePath)
        console.log(litClient)
        console.log(token)
        //console.log(configuration)
        let currentlyUploaded = 0;
        const uploadResponse = await spheron.encryptUpload({      
            authSig,
            accessControlConditions,
            chain,
            filePath,
            litNodeClient: litClient,
            configuration: {
                name: bucketName,
                onUploadInitiated: (uploadId) => {
                  console.log(`Upload with id ${uploadId} started...`);
                },
                onChunkUploaded: (uploadedSize, totalSize) => {
                  currentlyUploaded += uploadedSize;
                  console.log(`Uploaded ${currentlyUploaded} of ${totalSize} Bytes.`);
                },
              },
        });          
        console.log('Upload Response : ',uploadResponse);
        return uploadResponse
    } catch (e) {
        console.error('Error: ', e)
    }
    
}

export const decryptAndUpload = async (filePath, cid) => {
        
    const decryptedData = await spheron.decryptUpload({      
      ipfsCid: cid,
      litNodeClient: client,
    });  
    fs.promises.writeFile(filePath, Buffer.from(decryptedData));
};

