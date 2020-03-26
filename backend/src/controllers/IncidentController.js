const connection = require('../database/connection'); 

module.exports = {  
async index(request, response){
    //visualizar todos os casos da ong
    const [count] = await connection('incidents').count();
    console.log(count);
    response.header('X-Total-Count', count['count(*)']);
    
    //visualizar casos 5 a 5 por paginação
    const { page = 1 } = request.query;

    const incidents = await connection('incidents')
    .join('ongs', 'ong_id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
        "incidents.*", 
        'ongs.name',
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
    ]);

    return response.json(incidents);

},



async create (request, response){
    const { title, description, value } = request.body;
    
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
        ong_id,
        title,
        description, 
        value,
    });

return response.json({ id })

},

async list(request, response){
        const incidents = await connection('incidents').select('*');
        return response.json(incidents);
},

async delete(request, response){
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first();

    if(incident.ong_id !== ong_id){
            return response
                .status(401)
                .json({ error: 'Operation not permited' });

     }

    await connection('incidents')
        .where('id',  id)
        .delete();

    return response.status(204).send();    
    }
}