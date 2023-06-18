import LitJsSdk from "@lit-protocol/lit-node-client-nodejs";

const client = new LitJsSdk.LitNodeClient();
const chain = "ethereum";
await client.connect()
const litNodeClient = client

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

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "ethereum" });
    const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile(filePath)
    const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
        accessControlConditions,
        symmetricKey,
        authSig,
        chain,
    });
    
    return {
        encryptedFile,
        encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
}


export const decryptData = (encryptedFile, encryptedSymmetricKey) => {

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
