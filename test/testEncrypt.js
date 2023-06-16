import { encryptAndUpload , decryptAndUpload } from '../my-app/encrypt/encrypt.js'

async function main () {

    try {
        const file = './testfile.txt'
        const result = await encryptAndUpload(file)
        console.log(result)
    } catch (e) {
        console.error(e)
    }
}

//main()