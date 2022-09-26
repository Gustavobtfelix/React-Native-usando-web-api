import api from "../api";

export async function pegarRepositoriosDoUsuario(id){
    try{                        //get busca dados, post envia dados, put atualiza dados, delete deleta dados
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

export async function salvarRepositoriosDoUsuario(postId, name, data, id){
    try{
        await api.put(`/repos/${id}`, {
            name: name,
            data: data,
            postId: postId,
            id: id
        });
        return 'sucesso';
    }
    catch(error){
        console.log(error);
        return 'erro';
    }
}