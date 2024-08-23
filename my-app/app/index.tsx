import React, { useEffect, useState } from 'react';
import { Text, View,StatusBar, ScrollView, SafeAreaView, Image, Dimensions, StyleSheet, } from "react-native";
import { Link } from 'expo-router';
import api from "./services";

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

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await api.get('discover/tv', {
          params: {
            api_key: '9f4ef628222f7685f32fc1a8eecaae0b',
            language: 'pt-BR'
          }
        });
        setLoading(false)
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);



  const destaque = movies.slice(0, 1); 
  if(loading){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'white'}}>Carregando...</Text>
      </View>
    )
  }
  return (
    
    <SafeAreaView style={styles.container2}>
      <StatusBar  barStyle={'light-content'}  />
      <ScrollView style={{top:0}}>
        <View style={styles.container}>
          {destaque.map((movie) => (
  
            <View  style={styles.imageContainer2}>
                        <Link key={movie.id} style={styles.link} href={`user/:${movie.id}`}>
              <Image
              
                style={styles.image2}
                source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
              />
              </Link>
            </View>
           
          ))}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {movies.map((movie) => (
              <View key={movie.id} style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
                />
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
    
    zIndex: 1,
  },
  container2: {
    flex: 1,
    backgroundColor: 'rgb(0, 63, 82)',
    zIndex: 1,
  },
  horizontalScroll: {
    marginTop: 80,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: width * 0.3,
    height: 150,
    borderRadius: 8,
  },
  imageContainer2: {
    flex:1,
    position: 'relative',
    top: 0,
    height: 660,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image2: {
    top:0,
    position: 'absolute',
    width: width * 0.85,
    height: 436,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 3, 3, 0.5)',
  },
  link:{
    flex:1,
   
    
  },
});
