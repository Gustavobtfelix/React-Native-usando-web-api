import api from "../api"

//em componentes as funcoes começam com letra maiuscula, como essa nao e uma pagina nem um componente, ela e uma funcao, entao ela começa com letra minuscula
export async function buscaUsuario(){
    // api.get('/users?login=nataliakt').then(
    //     response => {
    //         console.log(response.data);
    //         }
    //     ).catch(error => {
    //         console.log(error);
    //     })
    try{ //await so funciona dentro de uma funcao async, ele espera a resposta da api e depois executa o codigo
        const resultado  = await api.get('/users?login=nataliakt');
        return resultado.data[0]
    }
    catch(error){
        console.log(error)
        return {}
    }
 }
