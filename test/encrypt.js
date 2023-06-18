import * as LitJsSdk from "@lit-protocol/lit-node-client";
import {SpheronClient, ProtocolEnum} from '@spheron/storage'
import dotenv from 'dotenv'
import { upload } from "@spheron/browser-upload";


const client = new LitJsSdk.LitNodeClient();
const chain = "ethereum";


// Checks if the user has at least 0 ETH
const accessControlConditions = [
  {
    contractAddress: "",
    standardContractType: "",
    chain,
    method: "eth_getBalance",
    parameters: [":userAddress", "latest"],
    returnValueTest: {
      comparator: ">=",
      value: "0",
    },
  },
];

class Lit {
  litNodeClient;

  async connect() {
    await client.connect();
    this.litNodeClient = client;
  }

  toFile = async (blob, fileName) => {
    blob.lastModifiedDate = new Date()
    blob.name = fileName

    return blob
  }

  doUpload = async (file) => {         
    const response = await fetch('/api/UploadToken')
    const responseJson = await response.json();
    const uploadResult = await upload([file], {
      token: responseJson.uploadToken,
    });   
    console.log(uploadResult.protocolLink)  
    return uploadResult.protocolLink
}

  async encryptData(file) {
    if (!this.litNodeClient) {
      await this.connect();
    }
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });    
    const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({ file });

    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions: accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    });
    const encrypted = await this.toFile(encryptedFile, 'encrypted.file')
    console.log(encrypted)
    //const url = URL.createObjectURL(encrypted);
    const ipsfsUrl = await this.doUpload(encrypted)

    return {
      encryptedFile: encryptedFile,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16"),
      url: ipsfsUrl
    };
  }


  async decryptData(encryptedFile, encryptedSymmetricKey) {
    if (!this.litNodeClient) {
      await this.connect();
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain });
    const symmetricKey = await this.litNodeClient.getEncryptionKey({
        accessControlConditions: accessControlConditions,
        toDecrypt: encryptedSymmetricKey,
        chain,
        authSig
    });

    const decryptedFile = await LitJsSdk.decryptFile({
        file: encryptedFile,
        symmetricKey
    });
    return decryptedFile;
  }

}

export default new Lit();
