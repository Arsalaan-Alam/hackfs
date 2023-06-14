import express from "express";
import cors from 'cors'
import { invokeCmd, invokeJob } from "./utils.js";

const app = express()
app.use(cors())
const port = 8080

app.get('/', (req, res) => {
    res.send('OK!')
})

app.get('/job', async(req, res) => {
    if (!req.query.q) {
        return res.status(400).send('No cmd sent...')
    } else {
        let cmd = req.query.q
        cmd = cmd.replace(/\"/g, '')
        console.log(cmd)
        try {
            const result = await invokeJob(cmd)
            if ( String(result).includes("/bin/sh: 1: Syntax error:")){
                res.send({
                    status: 'Error',
                    data: result
                })    
            } else {
                res.send({
                    status: 'Success',
                    data: result
                })
            }            
        } catch (e) {
            console.error("Error " + e.name + " " + e.message)
            res.send({status: 'Error'})
        }
    }
})

app.get('/cmd', async(req, res) => {
    if (!req.query.q) {
        return res.status(400).send('No cmd sent...')
    } else {
        let cmd = req.query.q
        cmd = cmd.replace(/\"/g, '')
        console.log(cmd)
        try {
            const result = await invokeCmd(cmd)
            if ( String(result).includes("/bin/sh: 1: Syntax error:")){
                res.send({
                    status: 'Error',
                    data: result
                })    
            } else {
                res.send({
                    status: 'Success',
                    data: result
                })
            }            
        } catch (e) {
            console.error("Error " + e.name + " " + e.message)
            res.send({status: 'Error'})
        }
    }
})

app.listen(port, console.log(`App running on port ${port}...`));