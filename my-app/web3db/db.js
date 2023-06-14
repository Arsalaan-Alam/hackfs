import { Polybase } from '@polybase/client'

export class submission {

    db = new Polybase({defaultNamespace: "pk/0xb58882a6e20f235ea9eb1cd44368b464cd977780252fc5b9d69992285a253585afa51cd670ba099400e50daa2515ada61344aa84d34be0eed13f6941bf410c07/mdao"})

    constructor () {}

    addRecord = async (id, validator, patient, filename, ipfsurl ) => {
        try {            
            const result = await this.db.collection('submission').create([id, validator, patient, filename, ipfsurl])
            return result.data
        } catch (e) {console.error(e)}
        
    }
    
    getByPatient = async (patientAddr) => {
        try {
            const records = await this.db.collection('submission').where("patient", "==", patientAddr).get()
            const {data} = records
            const dataLen = data.length
            const recordsArray = []
            for ( let i=0; i< dataLen; i++){
                recordsArray.push(data[i].data)
            }
            return recordsArray 
        } catch (e) {
            console.error(e)
        }
    }

    updateRecord = async(id, ipfsurl, filename, validator) => {
        try {
            const result = await this.db.collection('submission').record(id).call("update", [ipfsurl, filename, validator])
            return result.data
        } catch (e) { 
            console.error(e)
        }
    }
}