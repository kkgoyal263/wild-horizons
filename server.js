import http from 'node:http'
import {getDataFromDB} from '/database/db.js'
import {sendJSONResponse} from './utils/sendJSONResponse.js'
import {filterData} from './utils/filterData.js'
import {getDataByQueryParams} from './utils/getDataByQueryParams.js'

const PORT = 8000

const server = http.createServer(async(req, res) => {

    const destinations = await getDataFromDB()

    const urlObj = new URL(req.url, `http://${req.headers.host}`)
    const queryObj = Object.fromEntries(urlObj.searchParams)
    console.log(urlObj)
    console.log(queryObj)

    if(urlObj.pathname === '/api' && req.method === 'GET'){
        let filteredData = getDataByQueryParams(destinations, queryObj)
        
        sendJSONResponse(res, 200, filteredData)
    } 
    else if(req.url.startsWith('/api/continent') && req.method === 'GET'){
        const continent = req.url.split('/').pop()
        const filteredData = filterData(destinations, 'continent', continent)
        sendJSONResponse(res, 200, filteredData)
    }
    else if(req.url.startsWith('/api/country' ) && req.method === 'GET'){
        const country = req.url.split('/').pop()
        const filteredData = filterData(destinations, 'country', country)
        sendJSONResponse(res, 200, filteredData)
    }
    else {
        sendJSONResponse(res, 404, {error: 'not found', message: 'Route not found'})
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})