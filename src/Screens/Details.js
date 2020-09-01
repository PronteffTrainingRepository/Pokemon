import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Axios from "axios";
import Constants from "expo-constants";

const wd = Dimensions.get("window").width;
const ht = Dimensions.get("window").height;

function Details({ route }) {
  const [isLoading, setLoading] = useState(true);
  const { pname, url } = route.params;
  const [data, setData] = useState({});
  let [imgurl, setImgurl] = useState("");

  useEffect(() => {
    Axios.get(url)
      .then(({ data }) => {
        setData(data);
        setImgurl((imgurl = data.sprites.front_shiny));
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../assets/poco.png")}
        style={{ width: wd, height: ht, paddingBottom: ht * 0.08 }}
      >
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View>
              <View style={styles.bodyview}>
                <View style={styles.view}>
                  <Text style={styles.name}>{pname}</Text>
                </View>
                <View style={styles.view}>
                  <Image
                    source={{ uri: imgurl }}
                    style={{
                      height: ht * 0.3,
                      width: ht * 0.3,
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  />
                </View>

                <View
                  style={{
                    margin: ht * 0.02,
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: ht * 0.03,
                        color: "blue",
                        fontWeight: "bold",
                      }}
                    >
                      Abilities
                    </Text>
                  </View>

                  {data.abilities.map((item, i) => (
                    <View key={i} style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          flex: 1,
                          fontSize: ht * 0.03,
                          textTransform: "capitalize",
                        }}
                      >
                        " {item.ability.name} ",
                      </Text>
                    </View>
                  ))}
                </View>

                <View
                  style={{
                    flex: 1,
                    margin: ht * 0.02,
                    justifyContent: "flex-start",
                    flexDirection: "row",
                  }}
                >
                  <Text style={{ flex: 1, fontSize: ht * 0.03 }}>
                    Experience
                  </Text>
                  <Text style={{ fontSize: ht * 0.03 }}>
                    {data.base_experience}
                  </Text>
                </View>

                <View
                  style={{
                    margin: ht * 0.02,

                    flexDirection: "row",
                  }}
                >
                  <Text style={{ flex: 1, fontSize: ht * 0.03 }}>Height</Text>
                  <Text style={{ fontSize: ht * 0.03 }}>
                    {data.height} Inches
                  </Text>
                </View>

                <View
                  style={{
                    margin: ht * 0.02,

                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={{ flex: 1, fontSize: ht * 0.03 }}>
                    Species Name
                  </Text>
                  <Text
                    style={{
                      fontSize: ht * 0.03,
                      alignSelf: "flex-start",
                      textTransform: "capitalize",
                      color: "rgb(5, 12, 61)",
                    }}
                  >
                    {data.species.name}
                  </Text>
                </View>

                <View
                  style={{
                    margin: ht * 0.02,

                    flexDirection: "row",
                  }}
                >
                  <Text style={{ flex: 1, fontSize: ht * 0.03 }}>Weight</Text>
                  <Text
                    style={{
                      fontSize: ht * 0.03,
                    }}
                  >
                    {data.weight}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Details;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  bodyview: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    backgroundColor: "grey",
    elevation: 5,
    margin: ht * 0.02,
    opacity: 0.5,
    borderRadius: ht * 0.02,
  },
  name: {
    color: "red",
    fontSize: ht * 0.03,
    textAlign: "center",
    textTransform: "uppercase",
  },
  url: {
    color: "blue",
    fontSize: ht * 0.02,
    alignSelf: "center",
  },
  view: {
    margin: ht * 0.02,
  },
});
