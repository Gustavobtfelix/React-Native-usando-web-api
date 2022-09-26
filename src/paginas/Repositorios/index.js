import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import estilos from './estilos';
import { pegarRepositoriosDoUsuario } from '../../servicos/Requisicoes/repositorios';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused(); //verifica se a tela está em foco

    useEffect(async () => {
        const resultados = await pegarRepositoriosDoUsuario(route.params.id);
        setRepo(resultados);

    }, [estaNaTela]) //executa 1 vez quando a tela está em foco

    return (
        <View style={estilos.container}>
                <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
                <TouchableOpacity 
                    style={estilos.botao}
                    onPress={() => navigation.navigate('CriarRepositorio')}
                >
                    <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>

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
        </View>
    );
}
