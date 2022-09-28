import React, { useEffect, useState } from 'react';
import {useIsFocused} from '@react-navigation/native';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario, VerificaLista } from '../../servicos/Requisicoes/repositorios';


export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const [buscaRepositorio, setBuscaRepositorio] = useState('');
    const estaNaTela = useIsFocused(); //verifica se a tela está em foco

    useEffect(async () => {
        const resultados = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultados);

    }, [estaNaTela]) //executa 1 vez quando a tela está em foco

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                {
                    repo?.length > 0  &&
                    <>
                    <TextInput /* busca usuarios */
                    placeholder="Busque por um repositório"
                    autoCapitalize="none"
                    style={estilos.repositorio}
                    value={buscaRepositorio}
                    onChangeText={setBuscaRepositorio}
                    />
                    </>
                    
                }
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio', {id: route.params.id})}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                {
                    buscaRepositorio.length === 0 &&
                <FlatList 
                    data={repo}
                    style={{width: '100%'}}
                    keyExtractor={repo => repo.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio', {item})}
                        >
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>{item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
                }
                {
                    buscaRepositorio.length > 0 &&
                    <VerificaLista 
                    nomeRep={buscaRepositorio}
                    repo={repo}
                    navigation={navigation}
                    />
                }
        </View>
    );
}
