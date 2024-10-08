import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { BoxShadow } from 'react-native-shadow';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services";
const { width } = Dimensions.get("window");

interface TVShow {
  title: string;
  poster_path: string;
  id: string;
  backdrop_path: string;
  results: TVShow[];
  name: string; // Added name property
}

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<TVShow[]>([]);
  const[movieAcaoAventura, setMovieAcaoAventura] = useState<TVShow[]>([]);
  const[movieTerror, setMovieTerror] = useState<TVShow[]>([]);
  const router = useRouter();
  const destaque = movies.slice(0, 1);
  const id = destaque.map((movie) => movie.id);
  
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const API_KEY = "9f4ef628222f7685f32fc1a8eecaae0b";
  const shadowOpt = {
    width: width * 0.90,
    height: 400,
    color: "#181c44",
    border: 100,
    radius: 10,
    opacity: 1,
    
    x: 0,
    y: 0,
  };
  useEffect(() => {
    const getMovies = async () => {
      try {
        const [desenhoResponse,acaoeAvenResponse,terrorResponse, logoResponse] = await Promise.all([
          api.get("discover/tv", {
            params: {
              api_key: API_KEY,
              language: "pt-BR",
              with_genres: 16,
            },
          }),
          api.get("discover/tv", {
            params: {
              api_key: API_KEY,
              language: "pt-BR",
              with_genres: 10759,
            },
          }),
          api.get("discover/tv", {
            params: {
              api_key: API_KEY,
              language: "pt-BR",
              with_genres: 10765,
            },
          }),
          api.get(`tv/${456}/images`, { params: { api_key: API_KEY} }),
        ])
       
        setLoading(false);
      
        setMovies(desenhoResponse.data.results);
        setMovieAcaoAventura(acaoeAvenResponse.data.results);
        setMovieTerror(terrorResponse.data.results);
         const logos = logoResponse.data.logos.filter(
          (logo: any) => logo.iso_639_1 === "pt" || logo.iso_639_1 === "pt-BR"
        );
        if (logos.length > 0) {
          setLogoUrl(
            `https://image.tmdb.org/t/p/original${logos[0].file_path}`
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "white" }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView >
        <View style={styles.container}>
          {destaque.map((movie) => (
            <View style={styles.imageContainer2} key={movie.id}>
              <BoxShadow setting={shadowOpt}> 
                <Image
                  id="img"
                  style={styles.image2}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                  }}
                />
                </BoxShadow>
                 <View style={styles.containerButtonPrincipal}>
                 <View >
            <View style={styles.vwImg}>
              {logoUrl !== null ? (
                <Image source={{ uri: logoUrl }} style={styles.imgLogo} />
              ) : (
                <Text style={styles.text}>{movie.name}</Text>
              )}
            </View>
            <View><Text></Text></View>
          </View>
                  <View style={styles.containerbutton2}>
                  <View style={styles.buttoninfo}>
                    <Text style={styles.buttontext2}>Assistir</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push(`/info?id=${movie.id}`)}
                  >
                    <View style={styles.buttoninfo2}>
                      <Text style={styles.buttontext}>Informações</Text>
                    </View>
                  </TouchableOpacity>
                  </View>
                </View>
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
              <View key={movie.id} style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => router.push(`/info?id=${movie.id}`)}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={styles.text}>Filmes de ação e Aventura</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {movieAcaoAventura.map((movie) => (
              <View key={movie.id} style={styles.imageContainer}>
                <TouchableOpacity
                    onPress={() => router.push(`/info?id=${movie.id}`)}
                  >
                <Image
                  style={styles.image}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                  }}
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
            {movieTerror.map((movie) => (
              <View key={movie.id} style={styles.imageContainer}>
                <TouchableOpacity
                  onPress={() => router.push(`/info?id=${movie.id}`)}
                >
                  <Image
                    style={styles.image}
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
                    }}
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
    backgroundColor: "#010318",
  },
  horizontalScroll: {
    marginTop: 10,
  },
  imageContainer: {
    position: "relative",
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
   
    height: 400,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image2: {
    width: width * 0.90,
    height: 400,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: "rgb(112, 112, 112)",
    borderWidth: 2,
    zIndex: 1,
    resizeMode: "cover",
  },
  link: {
    flex: 1,
  },
  text: {
    color: "white",
    marginTop: 10,
    marginLeft: 10,
  },
  containerButtonPrincipal: {
    position: "absolute",
    justifyContent: "flex-end",
    bottom: 0,
    alignItems: "center",
    width: width * 0.90,
    height: 400,
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.171)",
  },
  containerbutton2:{
    width: width * 0.90,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  buttoninfo:{
    width: width * 0.40,
    height: 40,
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  buttoninfo2:{
    width: width * 0.40,
    height: 40,
    backgroundColor: "rgba(75, 75, 75, 0.753)",
    borderRadius: 3,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  buttontext:{
    color: "white",
    fontSize:17,
    fontWeight: "bold",
  },
  buttontext2:{
    color: "black",
    fontSize:17,
    fontWeight: "bold",
  },
  vwImg:{
    width: width * 0.90,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  imgLogo:{
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
});
