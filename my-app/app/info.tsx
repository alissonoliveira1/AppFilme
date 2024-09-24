import React, { useEffect, useState } from "react";
import { useRef } from "react";


import { useGlobalSearchParams } from "expo-router";
import api from "./services";
import {
    Text,
    View,
    Image,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions,
  } from "react-native";
const { width } = Dimensions.get("window");
export default function Info() {
  const params = useGlobalSearchParams();
  const { id } = params;
  const [seasons, setSeasons] = useState<any>([]);
  const [titleTemp, setTitleTemp] = useState<string | null>(
    seasons.length > 0 ? seasons[0].name : null
  );
  const [epsode, setEpisodes] = useState<any>(null);
  const [idsEps, setIdsEps] = useState<any>(null);
  const API_KEY = "9f4ef628222f7685f32fc1a8eecaae0b";
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [isPressed, setIsPressed] = useState(false);
    const [ano, setAno] = useState<number | null>(null);
    const bottomSheetRef = useRef(null);
  
  const [dados, setDados] = useState<{
    name?: string;
    overview?: string;
    poster_path?: string;
    backdrop_path?: string;
    genres?: [{ id: number; name: string }];
    seasons?: [{ season_number: number; name: string }];
    number_of_seasons?: number;
    first_air_date?: number;
  }>({});
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const [dadosResponse, logoResponse] = await Promise.all([
          api.get(`tv/${id}`, {
            params: { api_key: API_KEY, language: "pt-BR" },
          }),
          api.get(`tv/${id}/images`, { params: { api_key: API_KEY } }),
        ]);
        
        setDados(dadosResponse.data);

        const validSeasons = dadosResponse.data.seasons?.filter(
          (season : any) => season.name !== "Especiais"
        );
        setSeasons(validSeasons);

        const logos = logoResponse.data.logos.filter(
          (logo : any) => logo.iso_639_1 === "pt" || logo.iso_639_1 === "pt-BR"
        );
        if (logos.length > 0) {
          setLogoUrl(`https://image.tmdb.org/t/p/original${logos[0].file_path}`);
        }

        if (validSeasons?.length > 0) {
          setTitleTemp(validSeasons[0].name);
          setSelectedSeason(validSeasons[0].season_number);
        }
        const date = new Date(dadosResponse.data.first_air_date);
       
        setAno(date.getFullYear())
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, [id]);

  

  function toggleStyle() {
    setIsPressed(!isPressed);
    
  }

  useEffect(() => {
    if (selectedSeason === null) return;

    const fetchEpisodes = async () => {
      try {
        const response = await api.get(`tv/${id}/season/${selectedSeason}`, {
          params: { api_key: API_KEY, language: "pt-BR" },
        });
        setEpisodes(response.data.episodes);
        console.log(response.data.episodes);
      } catch (error) {
        console.error("Erro ao buscar episódios:", error);
      }
    };
    fetchEpisodes();
  }, [id, selectedSeason]);
  
  const handleSeasonSelect = (season_number: number, name: string) => {
    setIsPressed(true);
    setSelectedSeason(season_number);
    setTitleTemp(name);
    setIsPressed(!isPressed);
  };

  const renderEps = ({ item }: { item: any }) => (
    <TouchableOpacity>
      <View style={styles.containerEpsAll}>
      <View style={styles.viewCapaEps}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${item.still_path}`,
          }}
          style={styles.imageCapaEps}
        />
        <View>
        <Text style={styles.nameEpsAll}>{item.episode_number}. {item.name}</Text>
        <Text style={styles.timeEpsAll}>{item.runtime}m</Text>
        </View>
      </View>
      <View>
      <Text style={styles.sobreEpsAll}>{item.overview}</Text>
      </View>
      
      </View>
     
    </TouchableOpacity>
  );
  const renderSeason = ({ item }: { item: any }) => (
    <TouchableOpacity onPress={() => handleSeasonSelect(item.season_number, item.name)}>
      <View style={styles.temps}>
        <Text style={styles.tempname}>{item.name}</Text>
       
      </View>
    </TouchableOpacity>
  );

  return (
 
   <SafeAreaView style={{backgroundColor: "rgb(0, 63, 82)",}}>
        <ScrollView scrollEnabled={!isPressed}  style={{backgroundColor: "rgb(0, 63, 82)",}}>
     <View style={styles.container}>
  
       <View>
       <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${dados.backdrop_path}`,
          }}
          style={styles.image}
        />
       </View>

       <View style={styles.containerLogo}>
      <View style={styles.VwLogo}>
      {logoUrl ? (
          <Image source={{ uri: logoUrl }} style={styles.logo} />
        ) : (
          <Text style={styles.text}>Carregando logo do filme...</Text>
        )}
      </View>
       </View>
       

        <View style={styles.info}>
        <Text style={styles.textTemps}>{dados.number_of_seasons} temporadas {ano}</Text>
        </View>


       
       {isPressed && (
       
  <View style={styles.containerTemp3}>
  
        <FlatList
          data={seasons}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderSeason}
          ListEmptyComponent={<Text>Nenhuma temporada encontrada.</Text>}
          scrollEnabled={true} // Desative o scroll do FlatList
        />
     
      </View>
   
       )}


        
          <View style={styles.ViewOverVW}>
          <Text style={styles.textOverVW}>{dados.overview}</Text>
        </View>
      <View style={styles.textoEps}><Text style={styles.textEps}>Episodios</Text></View>
        <View style={styles.containerEps}>
          

          <TouchableOpacity onPress={() => toggleStyle()}>
          <View style={styles.button}>
            <Text style={styles.textButton}>{titleTemp}</Text>
          </View>

        </TouchableOpacity>
          <FlatList
            data={epsode}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEps}
            ListEmptyComponent={<Text>Nenhuma temporada encontrada.</Text>}
            scrollEnabled={true}
          />
        </View>
      
       
    </View> 
    </ScrollView>
   </SafeAreaView>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    backgroundColor: "rgb(0, 63, 82)",
  
  },
  info:{
    marginLeft: 10,

    width: width * 0.98,
    flexDirection: "row",
    flex:1,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: "contain",
  },
  containerLogo: {
    flex:1,
    position:"relative",
    top:-45,
    
    width: width,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: 50,

  },
  VwLogo: {
    flex:1,
    marginLeft: 10,
    width: width ,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  
  },
  text: {
    fontSize: 16,
    color: "#ffffff",
  },
  textTemps: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#d4d4d4",
  },
  textOverVW: {
   zIndex: -1,
    fontSize: 14,
    color: "#ffffff",
  },
  ViewOverVW: {
    width: width * 0.98,
    marginLeft:10,
    
  },
  image: {
    width: width,
    height: 300,
    
    resizeMode: "cover",
  },

  containerTemp3: {
    position: "absolute",
    top:0,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "26%",
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.911)",
  },

  button: {
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.98,
    height: 50,
    backgroundColor: "rgb(7, 32, 46)",
    borderRadius: 8,
  },

  textButton: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },

  temps: {
  
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingLeft: 0,
    justifyContent: "center",
  },

  tempname: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },

  barra: {
    width: 300,
    height: 5,
    backgroundColor: "rgb(255, 255, 255)",
  },
  containerEps:{
    zIndex: -1,
    width: width * 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerEpsAll:{
    
  
    alignItems: "flex-start",
    width: width * 0.98,
    height: "auto",
    backgroundColor: "rgb(0, 53, 66)",
    borderRadius: 8,
    marginBottom: 5,
    padding: 10,
  },
  textoEps:{
   zIndex: -1,
   
   
  },
  textEps:{
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 5,
   
    color: "#ffffff",
  },
  viewCapaEps:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap:5,
   
  },
  nameEpsAll:{
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "bold",
    width: 175,
  },
  timeEpsAll:{
    color: "#949494",
    fontSize: 12,
    
  },
  sobreEpsAll:{
    color: "#e4e4e4",
    fontSize: 13,
    marginTop: 5,
  },
  imageCapaEps:{ 
    width: 130,
    height: 80,
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
 
    

  },
});
