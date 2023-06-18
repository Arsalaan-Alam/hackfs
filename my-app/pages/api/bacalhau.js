const axios = require('axios')

export default async function triggerJob(req, res) {
    const { input_cid, cmd } = req.query
    const uri = `https://worker-6k6gsdlfoa-em.a.run.app/job?q="docker run --wait --wait-timeout-secs 100 --id-only -i ipfs://${input_cid}:/input_images ${cmd} -path /outputs '/input_images/*.jpg'"`
    
    //const cmd = 'dpokidov/imagemagick:7.1.0-47-ubuntu -- magick mogrify -resize 100x100 -quality 100'
    //const input_cid = 'QmeZRGhe4PmjctYVSVHuEiA9oSXnqmYa4kQubSHgWbjv72'
    
    try {        
        const result = await axios.get(uri)
        if ( result.data.status === 'Success') {
            console.log(result.data.data)
            res.status(200).json(result.data.data)
        }
    } catch (e) {
        console.error(e)
        res.status(500).json({error: 'An error occurred'})
    }
}
   