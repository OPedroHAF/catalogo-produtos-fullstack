import express from 'express';
import cors from 'cors';
import { initialProducts } from '../src/data/product.js';
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())


let produtos = [...initialProducts];
app.get("/produtos", (req, res) =>
    res.json(produtos)
)
app.get("/produtos/:id", (req, res) =>{
    const id = Number(req.params.id);
    const produto = produtos.find((p) => p.id === id)

    if(!produto){
        return res.status(404).json({erro: 'Produto não encontrado!'})
    }
    res.json(produto)
})
app.post("/produtos", (req, res) =>{
    const {nome, preco, categoria, descricao} = req.body;
    const novoProduto = {
        id: produtos.length > 0? produtos[produtos.length - 1].id + 1 : 1,
        nome,
        preco,
        categoria,
        descricao
    }
    produtos.push(novoProduto)
    res.status(201).json(novoProduto);
})
app.put("/produtos/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = produtos.findIndex((p) => p.id === id)
    if(index === -1){
        return res.status(404).json({erro:"Produto não encontrado!"})
    }
    const {nome, preco, categoria, descricao} = req.body;
    produtos[index] = {id, nome, preco, categoria, descricao}
    res.status(201).json(produtos[index]);
})
app.delete("/produtos/:id", (req, res) => {
    const id = Number(req.params.id)
    const exist = produtos.some((p) => p.id === id)
    if(!exist){
        return res.status(404).json({erro:"Produto não encontrado!"})
    }
    produtos = produtos.filter((p) => p.id !== id)
    res.status(204).send()
})

app.listen(port, () =>{
    console.log("Esta funcionando na portinha 3000")
})