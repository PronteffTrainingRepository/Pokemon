import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Home from "./src/Screens/Home";
import Details from "./src/Screens/Details";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const ht = Dimensions.get("window").height;
const Stack = createStackNavigator();

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isVisible: true,
    };
  }
  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false,
    });
  };

  componentDidMount() {
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 2000);
  }

  render() {
    let Splash_Screen = (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image source={require("./assets/poco.png")} />

          <Text style={{ fontSize: ht * 0.04, color: "tomato" }}>
            This is the app to know about all the Pokemons
          </Text>
        </View>
      </View>
    );
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={Home}
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: {
              backgroundColor: "red",
            },
            headerTitleStyle: {
              color: "white",
              fontWeight: "bold",
              fontSize: ht * 0.03,
            },
          }}
        >
          <Stack.Screen name="Home" component={Home} />

          <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
        {this.state.isVisible === true ? Splash_Screen : null}
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,

    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    flex: 1,
  },
});
