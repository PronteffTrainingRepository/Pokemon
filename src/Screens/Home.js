import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from "react-native";
import Axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

const ht = Dimensions.get("window").height;
const wd = Dimensions.get("window").width;

function Home({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [nexturl, setnexturl] = useState("");
  const [prevurl, setprevurl] = useState("");
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon?limit=30")
      .then(({ data }) => {
        setnexturl(data.next);
        setprevurl(data.previous);
        setData(data.results);
        setdisabled(true);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const next = async () => {
    setLoading(true);
    Axios.get(nexturl)
      .then(({ data }) => {
        setnexturl(data.next);
        setprevurl(data.previous);
        setData(data.results);
        setdisabled(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  const prev = async () => {
    if (!prevurl) return setdisabled(true);
    setLoading(true);
    Axios.get(prevurl)
      .then(({ data }) => {
        setnexturl(data.next);
        setprevurl(data.previous);
        setData(data.results);
        setdisabled(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView>
      <ImageBackground
        source={require("../../assets/poco.png")}
        style={{ width: wd, height: ht, paddingBottom: ht * 0.066 }}
      >
        <ScrollView>
          {isLoading ? (
            <ActivityIndicator size="large" color="#00ff00" />
          ) : (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  disabled={disabled}
                  onPress={prev}
                >
                  <Text style={styles.btext}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={next}>
                  <Text style={styles.btext}>Next</Text>
                </TouchableOpacity>
              </View>

              {data.map((item, index) => (
                <View key={index} style={styles.bodyview}>
                  <Text style={styles.name}>Pokemon Name :{item.name}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Details", {
                        pname: item.name,
                        url: item.url,
                      });
                    }}
                  >
                    <Text style={styles.url}>
                      Click on Link to Display data
                    </Text>
                    <Text style={styles.url}>{item.url}</Text>
                  </TouchableOpacity>
                </View>
              ))}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.button} onPress={prev}>
                  <Text style={styles.btext}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={next}>
                  <Text style={styles.btext}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  bodyview: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    backgroundColor: "whitesmoke",
    elevation: 5,
    padding: 20,
    margin: ht * 0.006,
    opacity: 0.6,
    borderRadius: ht * 0.02,
  },
  name: {
    color: "tomato",
    fontSize: ht * 0.03,
    paddingBottom: ht * 0.005,
  },
  url: {
    color: "black",
    fontSize: ht * 0.02,
  },
  button: {
    margin: ht * 0.006,
    height: ht * 0.05,
    width: ht * 0.1,
    backgroundColor: "rgb(33, 136, 239)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: ht * 0.01,
  },
  btext: {
    color: "white",
    fontSize: ht * 0.02,
  },
});
