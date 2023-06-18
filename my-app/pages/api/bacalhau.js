const axios = require('axios')

export default async function triggerJob(req, res) {
    const data = JSON.parse(req.body)
    console.log(data)
    // const { input_cid, cmd } = req.body
    // const array = input_cid.split(" ")
    // console.log(array[0])
    const cid = data.input_cid
    console.log(cid)
    const cmd = data.cmd
    console.log(cmd)
    const uri = `https://worker-6k6gsdlfoa-em.a.run.app/job?q="docker run --wait --wait-timeout-secs 100 --id-only -i ipfs://${cid}:/input_images ${cmd} -path /outputs '/input_images/*.jpg'"`
    console.log(uri)
    //const cmd = 'dpokidov/imagemagick:7.1.0-47-ubuntu -- magick mogrify -resize 100x100 -quality 100'
    //const input_cid = 'QmeZRGhe4PmjctYVSVHuEiA9oSXnqmYa4kQubSHgWbjv72'
    // https://worker-6k6gsdlfoa-em.a.run.app/job?q="docker run --wait --wait-timeout-secs 100 --id-only -i  ipfs://bafybeiefrmexsfomrntfgzgtdszelnzajob2utczmpfltav7gs6b4wuzgu:/input_images dpokidov/imagemagick:7.1.0-47-ubuntu -- magick mogrify -resize 100x100 -quality 100 -path /outputs '/input_images/*.jpg'"
    try {        
        const result = await axios.get(uri)
    
            console.log(result)
            res.status(200).json({cid:result.data.data.cid})
        
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'An error occurred'})
    }
}
   