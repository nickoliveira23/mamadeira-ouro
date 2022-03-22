import React, { useEffect, useState } from "react";
import { Alert, Linking, Text, View } from "react-native";
import MapView, {
  Callout,
  Marker,
  PROVIDER_GOOGLE,
  Region,
} from "react-native-maps";
import { FontAwesome } from "@expo/vector-icons";
import { RectButton, TextInput } from "react-native-gesture-handler";
import * as Location from "expo-location";
import styles from "./styles";
import { fetchUserGithub, fetchLocalMapBox } from "../../services/apiMaps";

const initialRegion = {
  latitude: -23.518530010608856,
  longitude: -46.19206019975018,
  latitudeDelta: 100,
  longitudeDelta: 100,
};

export default function Maps() {
  const [username, setUsername] = useState("");
  const [region, setRegion] = useState<Region>();

  const getCurrentPosition = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Ops!", "Permissão de acesso a localização negada.");
    }

    let {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync();

    setRegion({ latitude, longitude, latitudeDelta: 100, longitudeDelta: 100 });
  };

  // ERRATA
  // https://stackoverflow.com/questions/32106849/getcurrentposition-and-watchposition-are-deprecated-on-insecure-origins
  // const getCurrentPosition_deprecated = () => {
  //   try {
  //     navigator.geolocation.getCurrentPosition(
  //       (position: any) => {
  //         console.log(position);
  //         const region = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //           latitudeDelta: 100,
  //           longitudeDelta: 100,
  //         };
  //         setRegion(region);
  //       },
  //       (error: any) => {
  //         if (error.code === 1) {
  //           Alert.alert("Ei!", "Dê permissão para acessar a sua localização!");
  //         } else {
  //           Alert.alert("Ops x(", "Erro ao detectar a localização.");
  //         }
  //       }
  //     );
  //   } catch (e) {
  //     Alert.alert(e.message || "");
  //   }
  // };

  useEffect(() => {
    getCurrentPosition();
    console.log(initialRegion)
    console.log(region)
  }, []);

  async function handleSearchUser() {
    // let dev: Dev;

    // if (!username) return;

    // const githubUser = await fetchUserGithub(username);

    // if (!githubUser || !githubUser.location) {
    //   Alert.alert(
    //     "Ops!",
    //     "Usuário não encontrado ou não tem a localização definida no Github"
    //   );
    //   return;
    // }

    // const localMapBox = await fetchLocalMapBox(githubUser.location);

    // if (!localMapBox || !localMapBox.features[0].center) {
    //   Alert.alert(
    //     "Ops!",
    //     "Erro ao converter a localidade do usuário em coordenadas geográficas!"
    //   );
    //   return;
    // }

    // const [longitude, latitude] = localMapBox.features[0].center;

    // dev = {
    //   ...githubUser,
    //   latitude,
    //   longitude,
    // };

    // setRegion({
    //   latitude,
    //   longitude,
    //   latitudeDelta: 3,
    //   longitudeDelta: 3,
    // });

    // const devAlreadyExists = dev && devs.find((user) => user.id === dev.id);

    // if (devAlreadyExists) return;

    // setDevs([...devs, dev]);
    // setUsername("");
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        initialRegion={initialRegion}
      >
      </MapView>

      <View style={styles.footer}>
        <TextInput
          placeholder={`Dev's encontrados`}
          style={styles.footerText}
          onChangeText={setUsername}
          value={username}
        />

        <RectButton style={styles.searchUserButton} onPress={handleSearchUser}>
          <FontAwesome name="github" size={24} color="#fff" />
        </RectButton>
      </View>
    </View>
  );
}