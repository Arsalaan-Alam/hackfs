import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import { LitNodeClient, LitJsSdk } from "@lit-protocol/lit-node-client";
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
const token = process.env.SPHERON_TOKEN
const chain = "ethereum"
  
const spheron = new SpheronClient({
    token: token,
});

const setAccessConditions = async () => {
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
    return accessControlConditions
}


export const encryptAndUpload = async (filePath) => {

    const litClient = new LitNodeClient({
        litNetwork: 'serrano',
        debug: false,
    });
    await litClient.connect();
    
    const bucketName = 'fvm_bucket'      
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: chain });
    const uploadResponse = await spheron.encryptUpload({      
        authSig,
        accessControlConditions: await setAccessConditions(),
        chain,
        filePath,
        litNodeClient: litClient,
        configuration: {
            name: bucketName,
        },
    });  
    console.log(uploadResponse);
}

export const decryptAndUpload = async (filePath, cid) => {
        
    const decryptedData = await spheron.decryptUpload({      
      ipfsCid: cid,
      litNodeClient: client,
    });  
    fs.promises.writeFile(filePath, Buffer.from(decryptedData));
};

