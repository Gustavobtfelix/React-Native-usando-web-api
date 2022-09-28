import { FlatList, Linking, Text, TouchableOpacity } from "react-native";
import api from "../api";
import estilos from "../../paginas/Repositorios/estilos";

export async function pegarRepositoriosDoUsuario(login){
    try{                        //get busca dados, post envia dados, put atualiza dados, delete deleta dados
        const resultado = await api.get(`/users/${login}/repos`);
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

export async function criarRepositoriosDoUsuario(postId, name, data){
    try{
        await api.post(`/repos`, {
            name: name,
            data: data,
            postId: postId
        });
        return 'sucesso';
    }
    catch(error){
        console.log(error);
        return 'erro';
    }
}

export async function deletarRepositoriosDoUsuario(id){
    try{
        await api.delete(`/repos/${id}`);
        return 'sucesso';
    }
    catch(error){
        console.log(error);
        return 'erro';
    }
}


//Consulta valores que já foram retornados pela API
export function VerificaLista({nomeRep, repo, navigation}) {
    const lista = []
    
    for (const value of repo) {
        if (value.name.includes(nomeRep)) {
            lista.push(value)
        }
    }
    if (lista.length === 0) {
        return <Text style={estilos.textoVazio}>
                Nenhum repositório encontrado
            </Text>   
    }
    else {
        return (
            <FlatList
                data={lista}
                keyExtractor={lista => lista.id}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={estilos.repositorio}
                        onPress={() => Linking.openURL(item.html_url)}
                    >
                        <Text style={estilos.repositorioNome}>{item.name}</Text>
                        <Text style={estilos.repositorioData}>{item.html_url}</Text>
                    </TouchableOpacity>
                )}
            />
        )
    }
}