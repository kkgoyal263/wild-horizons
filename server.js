// console.log('We have a package.json!')
import http from 'node:http'
import {getDataFromDB} from '/database/db.js'

const PORT = 8000

const server = http.createServer(async(req, res) => {

    const destinations = await getDataFromDB()
    if(req.url === '/api' && req.method === 'GET'){

        res.setHeader('Content-Type', 'application/json')
        res.statusCode = 200
        res.end(JSON.stringify(destinations))
    } 
    else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
        const continent = req.url.split('/').pop()
        console.log(continent)
    }
    else {
        res.setHeader('Content-Type', 'application/jso')
        res.statusCode = 404
        res.end(JSON.stringify({error:'not found', message: 'Route not found'}))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})