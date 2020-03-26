const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();  

app.use(cors);
app.use(express.json());
app.use(routes);

/* 
    Rota / Recurso
*/

/* 
METODOS HTTP
GET: Buscar/listar informações no back-end
POST: Criar informações no back-end
PUT: Alterar informações no back-end
DELETE: Deletar informações no back-end
*/

/* 
Query Params: parametros nomeados enviados na rota após "?" (Filtros, paginação => /users?page=2&aluno=Diego&...)
Route Params: parametros usados para identificar recursos (traz apenas um recurso => /users/1)
Request Body: corpo da requisição, utilizado para criar ou alterar recursos
*/

app.listen(2222);