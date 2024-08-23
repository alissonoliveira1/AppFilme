import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import api from "../services";

// Ajuste a interface para representar um único filme
interface Filme {
  title: string;
  poster_path: string;
  id: string;
  backdrop_path: string;
}

export default function Filme() {
  const { id } = useLocalSearchParams();
  const [filme, setFilme] = useState<Filme | null>(null); 


  const idRef = (id as string).split(":")[1];

  useEffect(() => {
    const getFilme = async () => {
      try {
        const response = await api.get(`movie/${idRef}`, {
          params: {
            api_key: '9f4ef628222f7685f32fc1a8eecaae0b',
            language: 'pt-BR',
          }
        });
        setFilme(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFilme();
  }, [idRef]);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', height: 400 }}>
      <Text>Filmes</Text>
      <Text>{idRef}</Text>
      {filme ? (
        <View>
          <Text>{filme.title}</Text>
    
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}