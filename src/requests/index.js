const API_URL = 'http://itbootcamp.westeurope.cloudapp.azure.com';

const find = async (entity, skip = 0) => {
    try{
        const result = await fetch(`${API_URL}/${entity}?$limit=20&$skip=${skip}`);
        return await result.json();
    } catch(err){
        console.log(err);
    }
}

const get = async (entity, id) => {
    try{
        const result = await fetch(`${API_URL}/${entity}/${id}`);
        return await result.json();
    } catch (err){
        console.log(err);
    }
}

const create = async (entity, body) => {
    try{
        const result = await fetch(`${API_URL}/${entity}`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        return await result.json();
    } catch (err){
        console.log(err);
    }
}

const update = async (entity, body, id) => {
    try{
        const result = await fetch(`${API_URL}/${entity}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        return await result.json();
    } catch (err){
        console.log(err);
    }
}

const remove = async (entity, id) => {
    try{
        const result = await fetch(`${API_URL}/${entity}/${id}`, {
            method: 'DELETE'
        });
        return await result.json();
    } catch (err){
        console.log(err);
    }
}

export{
    find,
    get,
    create,
    update,
    remove
}