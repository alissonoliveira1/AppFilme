import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import api from './services';
const { width } = Dimensions.get('window');

interface TVShow {
  title: string;
  poster_path: string;
  id: string;
  backdrop_path: string;
  results: TVShow[];
}

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<TVShow[]>([]);
  const router = useRouter();
 const destaque = movies.slice(0, 1);
 

  useEffect(() => {
    
    const getMovies = async () => {
      try {
        const response = await api.get('discover/tv', {
          params: {
            api_key: '9f4ef628222f7685f32fc1a8eecaae0b',
            language: 'pt-BR',
            with_genres: 16,
          },
        });
        setLoading(false);
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView >
        <View style={styles.container}>
          {destaque.map((movie) => (
            <View style={styles.imageContainer2} key={movie.id}>
             <TouchableOpacity onPress={() => router.push(`/info?id=${movie.id}`)} >
                
                  <Image
                  id='img'
                    style={styles.image2}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
                  />
              
                </TouchableOpacity>
            </View>
          ))}
        </View>

        <View>
          <Text style={styles.text}>Destaques</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
         
            {movies.map((movie) => (
              <View  key={movie.id} style={styles.imageContainer}>
                <TouchableOpacity onPress={() => router.push(`/info?id=${movie.id}`)} >
                  <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
                  />
            </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.text}>Filmes de ação</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {movies.map((movie) => (
              <View key={movie.id} style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => router.push(`/info?id=${movie.id}`)} >
                  <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
                  />
            </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.text}>Filmes de terror</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {movies.map((movie) => (
              <View key={movie.id} style={styles.imageContainer}>
                    <TouchableOpacity onPress={() => router.push(`/info?id=${movie.id}`)} >
                  <Image
                    style={styles.image}
                    source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
                  />
            </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,

  },
  container2: {
    flex: 1,
    backgroundColor: "#002d37",
  },
  horizontalScroll: {
    marginTop: 10,
  },
  imageContainer: {
    marginLeft: 10,
    marginRight: 3,
  },
  image: {
    width: width * 0.3,
    height: 150,
    borderRadius: 8,
  },
  imageContainer2: {
    top: 0,
    height: 436,
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image2: {
    width: width * 0.85,
    height: 436,
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: 'rgb(112, 112, 112)',
    borderWidth: 2,
  },
  link: {
    flex: 1,
  },
  text: {
    color: 'white',
    marginTop: 10,
    marginLeft: 10,
   
  },
});