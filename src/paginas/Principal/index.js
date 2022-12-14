import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, Alert, ScrollView, Linking } from 'react-native';
import estilos from './estilos';
import { buscaUsuario } from '../../servicos/Requisicoes/usuarios';

export default function Principal({ navigation }) {
    const [nomeUsuario, setNomeUsuario] = useState('');
    const [usuario, setUsuario] = useState({});

     async function busca(){
        const resultado = await buscaUsuario(nomeUsuario);
        setNomeUsuario('');
        if (resultado){
            setUsuario(resultado);
        }
        else{
            Alert.alert('Usuario nao encontrado');
            setUsuario({});
        }
     }

    return (
        <ScrollView>
            <View style={estilos.container}>
                {
                    usuario?.login && // consicao: se o usuario existe mostra o resto do codigo
                <>
                    <View style={estilos.fundo} />
                    <View style={estilos.imagemArea}>
                        <Image source={{ uri: usuario.avatar_url }} style={estilos.imagem} />
                    </View>
                    <Text style={estilos.textoNome}>{usuario.name}</Text>
                    <Text style={estilos.textoEmail}>{usuario.bio}</Text>
                    <TouchableOpacity style={estilos.textoEmail} onPress={() => Linking.openURL(usuario.html_url)}>
                        <Text style={estilos.textoEmail}>{usuario.html_url}</Text>
                    </TouchableOpacity>
                    <View style={estilos.seguidoresArea}>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.followers}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguidores</Text>
                        </View>
                        <View style={estilos.seguidores}>
                            <Text style={estilos.seguidoresNumero}>{usuario.following}</Text>
                            <Text style={estilos.seguidoresTexto}>Seguindo</Text>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('Repositorios', {id: usuario.login})}>
                        <Text style={estilos.repositorios}>
                            Ver os reposit??rios
                        </Text>
                    </TouchableOpacity>
                </>
    }

                <TextInput /* busca usuarios */
                    placeholder="Busque por um usu??rio"
                    autoCapitalize="none"
                    style={estilos.entrada}
                    value={nomeUsuario}
                    onChangeText={setNomeUsuario}
                />

                <TouchableOpacity style={estilos.botao}
                                  onPress={busca} /* bot??o de busca */>   
                    <Text style={estilos.textoBotao}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
