import { submission } from '../my-app/web3db/db.js'

const record = new submission()

const createRecord = async() => {
    try {
        const result = await record.addRecord(
            "12346",
            "0xdfgfvc",
            "0xrtfgt",
            "filename.jpg",
            "https://ipfs.ip/ipfs/dfgthd"
        )
        console.log(result)
    } catch (e) {
        console.error(e)
    }

}

const getRecord = async(addr) => {
    try {
        const result = await record.getByPatient(addr)
        console.log(result)
    } catch (e) {
        console.error(e)
    }

}

const update = async(id, url, file, addr) => {
    try {
        const result = await record.updateRecord(id, url, file, addr) 
        console.log(result)
    } catch (e) {
        console.error(e)
    }

}

update('12346', "https://ipfs.io/ipfs/newurl", "newfile.jpg", "0xnewaddr1")
