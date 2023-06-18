import * as LitJsSdk from "@lit-protocol/lit-node-client";
//import fs from 'fs'


const chain = "ethereum";

const setAccessConditions = async (addr) => {

    const accessControlConditions = [
        {
            contractAddress: "",
            standardContractType: "",
            chain: "ethereum",
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



export const encryptData = async (filePath) => {    

    const litNodeClient = new LitJsSdk.LitNodeClient();
    await litNodeClient.connect()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
    //const file = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' })
    console.log(filePath)
    console.log(typeof filePath)
    if (filePath instanceof Blob || filePath instanceof File) {
        console.log('here',filePath)
        const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile({filePath})
    } else {
        console.error("Invalid file object provided.");
    }    
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });
    
    console.log('key : ',encryptedSymmetricKey)
    return {
        encryptedFile,
        encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
}


export const decryptData = async (encryptedFile, encryptedSymmetricKey) => {

    const litNodeClient = new LitJsSdk.LitNodeClient();
    await litNodeClient.connect()
    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
    const symmetricKey = await litNodeClient.getEncryptionKey({
        accessControlConditions,
        toDecrypt: encryptedSymmetricKey,
        chain,
        authSig,
      });

    const decryptedFile = await LitJsSdk.decryptFile(
        encryptedFile,
        symmetricKey
      );
  
    return { decryptedFile }

}  
