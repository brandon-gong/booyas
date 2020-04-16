import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function HomeScreen({ navigation }) {

  let backImgIdx = Math.floor(Math.random() * 33);
  let backImg;
  switch(backImgIdx) {
    case 0: backImg = require('../assets/images/0.jpg'); break;
    case 1: backImg = require('../assets/images/1.jpg'); break;
    case 2: backImg = require('../assets/images/2.jpg'); break;
    case 3: backImg = require('../assets/images/3.jpg'); break;
    case 4: backImg = require('../assets/images/4.jpg'); break;
    case 5: backImg = require('../assets/images/5.jpg'); break;
    case 6: backImg = require('../assets/images/6.jpg'); break;
    case 7: backImg = require('../assets/images/7.jpg'); break;
    case 8: backImg = require('../assets/images/8.jpg'); break;
    case 9: backImg = require('../assets/images/9.jpg'); break;
    case 10: backImg = require('../assets/images/10.jpg'); break;
    case 11: backImg = require('../assets/images/11.jpg'); break;
    case 12: backImg = require('../assets/images/12.jpg'); break;
    case 13: backImg = require('../assets/images/13.jpg'); break;
    case 14: backImg = require('../assets/images/14.jpg'); break;
    case 15: backImg = require('../assets/images/15.jpg'); break;
    case 16: backImg = require('../assets/images/16.jpg'); break;
    case 17: backImg = require('../assets/images/17.jpg'); break;
    case 18: backImg = require('../assets/images/18.jpg'); break;
    case 19: backImg = require('../assets/images/19.jpg'); break;
    case 20: backImg = require('../assets/images/20.jpg'); break;
    case 21: backImg = require('../assets/images/21.jpg'); break;
    case 22: backImg = require('../assets/images/22.jpg'); break;
    case 23: backImg = require('../assets/images/23.jpg'); break;
    case 24: backImg = require('../assets/images/24.jpg'); break;
    case 25: backImg = require('../assets/images/25.jpg'); break;
    case 26: backImg = require('../assets/images/26.jpg'); break;
    case 27: backImg = require('../assets/images/27.jpg'); break;
    case 28: backImg = require('../assets/images/28.jpg'); break;
    case 29: backImg = require('../assets/images/29.jpg'); break;
    case 30: backImg = require('../assets/images/30.jpg'); break;
    case 31: backImg = require('../assets/images/31.jpg'); break;
    case 32: backImg = require('../assets/images/32.jpg'); break;
  }

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={backImg}
          style={styles.welcomeImage}
        />
        <View style={styles.tintOverlay}></View>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Image
          source={require('../assets/images/booyas-outlined.png')}
          style={styles.logo}
        />
        
      </View>
      <TouchableOpacity style={{padding: 10, position: "relative", top: Constants.statusBarHeight, left: 10, zIndex: 4, width: 45, height: 45 + Constants.statusBarHeight}} onPress={() => navigation.navigate("Settings")}>
        <FontAwesome5
          name={"cog"}
          size={25}
          color={"white"}
        />
      </TouchableOpacity>

      <View style={{flex: 1, backgroundColor: "transparent", position: "absolute", top: Dimensions.get('window').height - 180}} contentContainerStyle={styles.contentContainer}>
        <View style={styles.mainContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Order")}>
            <View style={styles.getStartedButton}>
              <Text style={styles.gSBt}>Get Started &nbsp;&nbsp;</Text><FontAwesome5
          name={"angle-right"}
          size={25}
          color={"white"}
        />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Contact")}>
            <View style={styles.contactButton}>
              <Text style={styles.cBt}>Contact us</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  welcomeContainer: {
    zIndex: 0,
    position: "absolute",
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  welcomeImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,
    resizeMode: "cover",
    position: "absolute",
    top: 0
  },
  tintOverlay: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 140,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
    position: "absolute",
    top: 0
  },
  logo: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.34530201342,
    resizeMode: "contain"
  },
  welcomeText: {
    color: "white",
    fontFamily: "roboto-slab",
    fontSize: 20,
    marginBottom: 10
  },
  mainContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 40,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  getStartedButton: {
    width: Dimensions.get('window').width - 80,
    backgroundColor: "#00a24f",
    // paddingTop: 30,
    // paddingBottom: 30,
    padding: 15,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  gSBt: {
    color: "white",
    fontFamily: "roboto-slab-bold",
    textAlign: "center",
    fontSize: 20,
  },
  contactButton: {
    width: Dimensions.get('window').width - 80,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#00a24f",
    marginTop: 10,
    padding: 7,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  cBt: {
    color: "#00a24f",
    fontFamily: "roboto-slab",
    textAlign: "center",
    fontSize: 12,
  }
});
