const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const hostname = 'localhost'
const port = 5000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())



const cars = [
    {
        id: 1,
        marca: 'Fiat',
        modelo: 'Palio',
        cor: 'Branco',
        anoFabricacao: 2012,
        anoModelo: 2012,
        tipoCambio: 'Manual'
    },
    {
        id: 2,
        marca: 'Fiat',
        modelo: 'Siena',
        cor: 'Prata',
        anoFabricacao: 2014,
        anoModelo: 2015,
        tipoCambio: 'Automático'

    },
    {
        id: 3,
        marca: 'Renault',
        modelo: 'Kwid',
        cor: 'Prata',
        anoFabricacao: 2021,
        anoModelo: 2022,
        tipoCambio: 'Automático'

    }
]


//uris

// Retorna todos os carros sem filtro
app.get('/carros', (req, res) => {
    res.status(200).send(cars)
})


// retorna os carros filtrados pelo tipo: a ( automatico) e m(manual)
app.get('/carros/:tipo', (req, res) => {
    let tipo = req.params.tipo.toUpperCase()
    console.log(tipo)

    let cambio = ''

    if (tipo === 'A') {
        cambio = 'Automático'
    } else if (tipo === 'M') {
        cambio = 'Manual'
    }

    console.log('tipo', cambio)

    let filtered = cars.filter(element => element.tipoCambio === cambio)
    console.log(filtered)

    res.status(200).send(filtered)
})


app.post('/carros', (req, res) => {
    // O body contém a lista que é enviada
    const body = req.body
    console.log('body', body)

    let existsCars = cars.find(element => element.id === body.id)

    console.log(existsCars)

    if (!existsCars) {
        cars.push(body)
        res.status(201).send(body)
    } else {
        // melhorar enviando um jsop com a mensagem e o tipo warning. 
        // Ex:{message: `O carro com o id: ${body.id} já existe.`, tipo: 'WARNING'}
        throw new Error(`O carro com o id: ${body.id} já existe.`)
    }
})


app.delete('/carros/:id', (req, res) => {
    let id = req.params.id

    let index = cars.findIndex(element => element.id === parseInt(id))
    // console.log('index', index)
    cars.splice(index, 1)

    res.status(200).send({ message: `O carro com o id ${id} foi excluído com sucesso` })
})


/* app.patch('/carros/:id', (req, res) => {
    let id = parseInt(req.params.id)


    let book = books.find(obj => obj._id === id)
    console.log('book', book)


    let body = req.body
    console.log('body', body)

    book.title = body.title

    book.autor = body.autor

    res.send(books)
})
 */

app.put('/carros', (req, res) => {
    let { id, marca, modelo, anoFabricacao, anoModelo, tipoCambio } = req.body
    let existsCars = cars.find(element => element.id === parseInt(id))

    if (existsCars) {

        existsCars.marca = marca ? marca : existsCars.marca
        existsCars.modelo = modelo ? modelo : existsCars.modelo
        existsCars.anoFabricacao = anoFabricacao ? anoFabricacao : existsCars.anoFabricacao
        existsCars.anoModelo = anoModelo ? anoModelo : existsCars.anoModelo
        existsCars.tipoCambio = tipoCambio ? tipoCambio : existsCars.tipoCambio

        res.status(201).send(existsCars)
    } else {
        throw new Error(`O carro com o id: ${id} não existe.`)
    }
})

app.listen(port, hostname, () => console.log(`http://${hostname}:${port}`))