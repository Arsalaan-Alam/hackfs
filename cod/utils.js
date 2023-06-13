import { exec } from "child_process";


const execute = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (!error) {                
                resolve(stdout)                
            } else {
                reject(stderr)
            }
        })
    })
}

const getCid = (pattern, text) => {
    const regex = pattern
    let m;
    m = regex.exec(text)
    return m[1]    
}



export const invokeCmd = async (cmd) => {
    try {        
        //const cmnd = `docker run asia-south1-docker.pkg.dev/ecomscraper/images/bacalhau:latest ${cmd}`        
        //const cmnd = `docker run ghcr.io/bacalhau-project/bacalhau:latest ${cmd}`        
        const cmnd = `bacalhau ${cmd}`        
        const result = await execute(cmnd)        
        console.log(result)
        return result
             
    } catch (e) {
        console.error(e)
        return e
    }
}

export const invokeJob = async (cmd) => {
    try {        
        //const cmnd = `docker run asia-south1-docker.pkg.dev/ecomscraper/images/bacalhau:latest ${cmd}`
        //const cmnd = `docker run ghcr.io/bacalhau-project/bacalhau:latest ${cmd}`
        const cmnd = `bacalhau ${cmd}`
        const cidRegex = /PublishedResults:\s+CID:\s+([^\n]+)/gm
        const job = await execute(cmnd) 
        const jobId = String(job).trim()
        console.log(`Job ID : ${jobId}`)
        //const getJobDetails = `docker run asia-south1-docker.pkg.dev/ecomscraper/images/bacalhau:latest describe ${jobId}`
        //const getJobDetails = `docker run ghcr.io/bacalhau-project/bacalhau:latest describe ${jobId}`
        const getJobDetails = `bacalhau describe ${jobId}`
        const result = await execute(getJobDetails)
        console.log(result)
        const cid = await getCid(cidRegex, result)
        console.log(`CID : ${cid}`)
        const resultObj = new Object()
        resultObj.jobId = jobId
        resultObj.cid = cid
        return resultObj
             
    } catch (e) {
        console.error(e)
        return e
    }
}