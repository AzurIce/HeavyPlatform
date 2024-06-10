const express = require('express')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

let chalk
import('chalk').then(module => { chalk = module.default })

const app = express()
const PORT = process.env.PORT || 9998
const DATA_FILE = path.join(__dirname, 'data.json')

app.use(cors())
app.use(bodyParser.json())

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return {}
    }
    const data = fs.readFileSync(DATA_FILE, 'utf8')
    return JSON.parse(data)
}

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

const getTime = () => {
    return chalk.cyan(new Date().toLocaleString())
}

app.post('/set', (req, res) => {
    console.log(chalk.red('Set'), ': ', getTime(), req.body)
    const { key, value } = req.body
    if (!key || value === undefined) {
        return res.status(400).json({ error: 'Key and value are required' })
    }
    const data = readData()
    data[key] = value
    writeData(data)
    res.json({ success: true })
})

app.get('/get/:key', (req, res) => {
    console.log(chalk.red('Get'), ': ', getTime(), req.params)
    const { key } = req.params
    const data = readData()
    console.log('Is key in data: ', key in data)
    if (!(key in data)) {
        return res.status(404).json({ error: 'Key not found' })
    }
    res.json({ key, value: data[key] })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
