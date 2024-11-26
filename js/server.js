const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Para processar JSON no body da requisição

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/quickorder', {
}).then(() => {
    console.log('Conectado ao MongoDB!');
}).catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err);
});

// Definindo o modelo do cliente
const ClienteSchema = new mongoose.Schema({
    numeroMesa: Number,
    nomeCliente: String,
});
const Cliente = mongoose.model('Cliente', ClienteSchema);

// Endpoint para salvar os dados do formulário
app.post('/api/clientes', async (req, res) => {
    const { numeroMesa, nomeCliente } = req.body;

    try {
        const cliente = new Cliente({ numeroMesa, nomeCliente });
        await cliente.save();
        res.status(201).send({ message: 'Cliente salvo com sucesso!' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao salvar cliente' });
    }
});

// Endpoint para buscar o último cliente salvo
app.get('/api/clientes/ultimo', async (req, res) => {
    try {
        const cliente = await Cliente.findOne().sort({ _id: -1 }); // Busca o cliente mais recente
        if (!cliente) {
            return res.status(404).send({ error: 'Nenhum cliente encontrado' });
        }
        res.status(200).send(cliente);
    } catch (error) {
        res.status(500).send({ error: 'Erro ao buscar cliente' });
    }
});

app.post('/notificacao', (req, res) => {
    const { mensagem, nomeCliente, numeroMesa } = req.body;

    console.log('Notificação recebida:');
    console.log(`Mensagem: ${mensagem}`);
    if (nomeCliente) console.log(`Cliente: ${nomeCliente}`);
    if (numeroMesa) console.log(`Mesa: ${numeroMesa}`);

    res.status(200).send({ message: 'Notificação enviada com sucesso!' });
});

// Iniciando o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});