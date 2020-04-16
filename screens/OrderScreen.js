import * as React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, Alert } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function OrderScreen({ navigation }) {

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <Image
        source={require('../assets/images/chalk.png')}
        style={styles.backImg}
      />
      <View style={styles.upperFlex}>
        <TouchableOpacity onPress={() => warnCancel(navigation)}>
          <FontAwesome5
            name={"angle-left"}
            size={(Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight) * 0.15}
            color={"white"}
          />
        </TouchableOpacity>
        <Image
          source={require('../assets/images/booyas-outlined.png')}
          style={styles.logo}
        />
        <TouchableOpacity>
          <FontAwesome5
            name={"shopping-cart"}
            size={(Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight) * 0.15}
            color={"white"}
          />
        </TouchableOpacity>
      </View>
      <OrderController />
    </View>
  );
}

function warnCancel(n) {
  Alert.alert(
    'Cancel order?',
    'Are you sure you want to go back?  Your order will not be saved.',
    [
      {
        text: 'No, keep going',
        onPress: () => {},
        style: 'cancel',
      },
      { text: 'Yes, cancel the order', onPress: () => commitCancel(n) },
    ],
    { cancelable: false }
  );
}

function commitCancel(n) {
  console.log("commitCancel");
  n.navigate("Home");
  
}

class OrderController extends React.Component {

  orderInfo = { family: "", genus: "", species: "" };
  thumbnails = [];
  menu = {};

  constructor(props) {
    super(props);
    this.state = { currentStep: 0 };
    this.menu = require("../menu");
    this.thumbnails = [
      require("../assets/images/0.jpg"),
      require("../assets/images/1.jpg"),
      require("../assets/images/2.jpg"),
      require("../assets/images/3.jpg"),
      require("../assets/images/4.jpg"),
      require("../assets/images/5.jpg"),
      require("../assets/images/6.jpg"),
      require("../assets/images/7.jpg"),
      require("../assets/images/8.jpg"),
      require("../assets/images/9.jpg"),
      require("../assets/images/10.jpg"),
      require("../assets/images/11.jpg"),
      require("../assets/images/12.jpg"),
      require("../assets/images/13.jpg"),
      require("../assets/images/14.jpg"),
      require("../assets/images/15.jpg"),
      require("../assets/images/16.jpg"),
      require("../assets/images/17.jpg"),
      require("../assets/images/18.jpg"),
      require("../assets/images/19.jpg"),
      require("../assets/images/20.jpg"),
      require("../assets/images/21.jpg"),
      require("../assets/images/22.jpg"),
      require("../assets/images/23.jpg"),
      require("../assets/images/24.jpg"),
      require("../assets/images/25.jpg"),
      require("../assets/images/26.jpg"),
      require("../assets/images/27.jpg"),
      require("../assets/images/28.jpg"),
      require("../assets/images/29.jpg"),
      require("../assets/images/30.jpg"),
      require("../assets/images/31.jpg"),
      require("../assets/images/32.jpg")
    ];
  }

  render() {
    if(this.state.currentStep === 0) {
      return this.renderClassScreen();
    } else if(this.state.currentStep === 1) {
      return this.renderSubclassScreen();
    } else if(this.state.currentStep === 2) {
      return this.renderCustomizationScreen();
    }
  }

  renderClassScreen() {
    let innerHTML = null;
    let hboxes = [];
    let entreeNames = Object.keys(this.menu).filter((name) => name[0] !== "_");
    for(let i = 0; i < entreeNames.length; i+=2) {
      let hboxChildren = [null, null];
      for(let j = 0; j < 2; j++) {
        if(this.menu[entreeNames[i+j]]["_thumbnail"] !== undefined) {
          hboxChildren[j] = React.createElement(TouchableOpacity, {
            onPress: () => {
              this.setState({
                currentStep: 1
              });
              this.orderInfo.family = entreeNames[i+j];
            }
          }, React.createElement(ImageBackground, {
            source: this.thumbnails[this.menu[entreeNames[i+j]]["_thumbnail"]],
            style: styles.hboxButton,
            imageStyle: {
              borderRadius: 15
            }
          }, React.createElement(View, {
            style: styles.innerTint
          }, React.createElement(Text, {
            style: styles.buttonText
          }, entreeNames[i+j]))));
        } else {
          hboxChildren[j] = React.createElement(TouchableOpacity, {
            onPress: () => {
              this.setState({
                currentStep: 1
              });
              this.orderInfo.family = entreeNames[i+j];
            }
          }, React.createElement(ImageBackground, {
            source: this.thumbnails[0],
            style: styles.hboxButton,
            imageStyle: {
              borderRadius: 15,
              tintColor: "black"
            }
          }, React.createElement(View, {
            style: styles.innerTint
          }, React.createElement(Text, {
            style: styles.buttonText
          }, entreeNames[i+j]))));
        }
      }
      hboxes.push(React.createElement(View, { style: styles.hbox }, hboxChildren));
    }
    innerHTML = React.createElement(ScrollView, { style: {marginBottom: 40} }, hboxes);

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select an entrée.</Text>
        <Text style={{marginTop: 15, marginBottom: 15}}>Don't worry – you'll be able to go through this again if you want to order something else.</Text>
        {innerHTML}
        <ProgressIndicator stage={0} />
      </View>
    );
  }

  renderSubclassScreen() {
    let innerHTML = null;
    let children = [];
    if(this.menu[this.orderInfo.family]["_note"] !== undefined) {
      children.push(<View style={styles.centerH}><Text style={styles.subH}>{this.menu[this.orderInfo.family]["_note"]}</Text></View>);
    }
    for(let subEntreeName of Object.keys(this.menu[this.orderInfo.family]).filter((name) => name[0] !== "_")) {
      if(typeof(this.menu[this.orderInfo.family][subEntreeName]) === "number") {
        let priceTag = this.menu[this.orderInfo.family][subEntreeName].toString();
        if(priceTag.split("\.")[1].length === 1) priceTag += "0";
        priceTag = "$" + priceTag;
        children.push(React.createElement(TouchableOpacity, {
          style: {
            display: "flex",
            paddingTop: 10,
            paddingBottom: 10,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#00a24f",
            marginBottom: 10
          },
          onPress: () => {this.orderInfo.genus = subEntreeName; this.orderInfo.species = ""; this.setState({ currentStep: 2 })}
        }, React.createElement(Text, {
          style: styles.hboh1
        }, subEntreeName), React.createElement(Text, {
          style: styles.hboh2
        }, priceTag)));
      } else {
        // TODO this could be a group of orders, or it could be an order with exclude/include instructions
        // only handling the group of orders case for now...
        let subSubEntrees = Object.keys(this.menu[this.orderInfo.family][subEntreeName]).filter((name) => name[0] !== "_");
        let hboxes = [];
        for(let i = 0; i < subSubEntrees.length; i+=2) {
          let hboxChildren = [null, null];
          for(let j = 0; j < 2; j++) {
            if(typeof(this.menu[this.orderInfo.family][subEntreeName][subSubEntrees[i+j]]) === "number") {
              if(this.menu[this.orderInfo.family][subEntreeName][subSubEntrees[i+j]] === -1) {
                hboxChildren[j] = React.createElement(View, {
                  style: styles.disabledhboptionButton
                }, React.createElement(Text, {
                  style: styles.disabledhboh1
                }, " "), React.createElement(Text, {
                  style: styles.disabledhboh2
                }, " "));
              } else {
                let priceTag = this.menu[this.orderInfo.family][subEntreeName][subSubEntrees[i+j]].toString();
                if(priceTag.split("\.")[1].length === 1) priceTag += "0";
                priceTag = "$" + priceTag;
                hboxChildren[j] = React.createElement(TouchableOpacity, {
                  style: styles.hboptionButton,
                  onPress: () => {
                    this.orderInfo.genus = subEntreeName;
                    this.orderInfo.species = subSubEntrees[i+j];
                    this.setState({ currentStep: 2 })
                  }
                }, React.createElement(Text, {
                  style: styles.hboh1
                }, subSubEntrees[i+j]), React.createElement(Text, {
                  style: styles.hboh2
                }, priceTag));
              }
            } else {
              // TODO
            }
          }
          hboxes.push(React.createElement(View, { style: styles.hbox }, hboxChildren));
        }
        children.push(<View style={styles.centerH}><Text style={styles.subH}>{subEntreeName}</Text></View>);
        children.push(...hboxes);
        children.push(<View style={styles.divLineContainer}><View style={styles.divLine}></View></View>);
      }
    }
    
    innerHTML = React.createElement(ScrollView, { style: {marginBottom: 40} }, children);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({currentStep: 0})}
            style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <FontAwesome5
            name={"angle-left"}
            size={10}
            color={"#00a24f"}
            style={{marginRight: 3}}
          />
          <Text style={{fontSize: 12, color: "#00a24f"}}>Go back to previous step</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{this.orderInfo.family}</Text>
        <View style={{height: 10}}></View>

        {innerHTML}

        <ProgressIndicator stage={0} />
      </View>
    );
  }

  renderCustomizationScreen() {

    // menujson: 0 is out of stock, 1 is boolean (include or no), 2 is 4 valued input (no include, include normal amount, include extra, include lots)

    // prepare order name
    let orderName = this.orderInfo.species + " " + this.orderInfo.genus;
    if(!["Burgers", "Kids Menu", "Fries"].includes(this.orderInfo.family)) {
      if(this.orderInfo.species !== "Two" &&
         this.orderInfo.species !== "Extra" &&
         this.orderInfo.family !== "Nachos")
        orderName += " " + this.orderInfo.family.substring(0, this.orderInfo.family.length - 1);
      else orderName += " " + this.orderInfo.family;
    }
    if(this.orderInfo.family !== "Burgers" && this.orderInfo.family !== "Kids Menu") {
      orderName = orderName[0].toUpperCase() + orderName.slice(1).toLowerCase();
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({currentStep: 1})}
            style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <FontAwesome5
            name={"angle-left"}
            size={10}
            color={"#00a24f"}
            style={{marginRight: 3}}
          />
          <Text style={{fontSize: 12, color: "#00a24f"}}>Go back to previous step</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Customize your order</Text>
        <View style={{height: 10}}></View>
        <Text>{orderName}</Text>

        <ProgressIndicator stage={1} />
      </View>
    );
  }

}



/*
class OrderController extends React.Component {
  state = { currentStep: 0 };
  orderInfo = { classIdx: 0, subclassIdx: 0 };

  classes = ["Quesadillas", "Nachos", "Tacos", "Burgers", "Burritos", "Salads", "Kids Menu", "Fries"];

  // 0 -> pick entree (quesadillas)
  // 1 -> pick specific type of entree (cheese quesadillas)
  // 2 -> customize toppings (cheese quesadillas w/ mushroom, etc), other settings such as type of fish etc.
  // 3 -> Confirm, offer to change (decrement state)
  // 4 -> check mark & ask if order more (setstate back to 0)
  // 5 -> stripe?
  // 6 -> order placed svg/gif animation maybe, option to return back to state 0, cart empty
  render() {
    if(this.state.currentStep === 0) {
      return this.renderClassScreen();
    } else if(this.state.currentStep === 1) {
      return this.renderSubclassScreen();
    } else if(this.state.currentStep === 3) {
      return this.renderCustomizationScreen();
    }
  }
  renderClassScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Select an entrée.</Text>
        <Text style={{marginTop: 15, marginBottom: 15}}>Don't worry – you'll be able to go through this again if you want to order something else.</Text>
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.hbox}>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 0}}>
              <ImageBackground source={require('../assets/images/19.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[0]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 1}}>
              <ImageBackground source={require('../assets/images/18.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[1]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 2}}>
              <ImageBackground source={require('../assets/images/23.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[2]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 3}}>
              <ImageBackground source={require('../assets/images/10.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[3]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 4}}>
              <ImageBackground source={require('../assets/images/30.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[4]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 5}}>
              <ImageBackground source={require('../assets/images/24.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[5]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
          <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 7}}>
              <ImageBackground source={require('../assets/images/20.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15 }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[7]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.setState({currentStep: 1}); this.orderInfo.classIdx = 6}}>
              <ImageBackground source={require('../assets/images/30.jpg')} style={styles.hboxButton} imageStyle={{ borderRadius: 15, tintColor: "black" }}>
                <View style={styles.innerTint}>
                  <Text style={styles.buttonText}>{this.classes[6]}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={{position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width, padding: 15, backgroundColor: "white", zIndex: 3, bottom: 0}}>
          <View style={styles.pedestalIconActive}>
            <FontAwesome5
              name={"file-alt"}
              size={25}
              color={"white"}
            />
          </View>
          <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
          <View style={styles.pedestalIcon}>
            <FontAwesome5
              name={"edit"}
              size={25}
              color={"white"}
            />
          </View>
          <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
          <View style={styles.pedestalIcon}>
            <FontAwesome5
              name={"shipping-fast"}
              size={25}
              color={"white"}
            />
          </View>
        </View>
      </View>
    );
  }

  renderSubclassScreen() {
    let innerHTML;
    if(this.orderInfo.classIdx === 0) { // Quesadillas
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Custom with meat</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$8.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divLineContainer}>
            <View style={styles.divLine}></View>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Cheese Only</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$6.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$7.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Veggie</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$7.95</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.40</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Chipotle Shrimp</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$10.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Surf & Turf</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$11.50</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 1) { // Nachos
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Custom with meat</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$8.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Cheese Only</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$6.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$7.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Veggie</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$7.95</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.40</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Chipotle Shrimp</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$10.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Surf & Turf</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$11.50</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 2) { // Taco
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Custom with meat</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>One</Text>
              <Text style={styles.hboh2}>$3.95</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Two</Text>
              <Text style={styles.hboh2}>$6.95</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Extra</Text>
              <Text style={styles.hboh2}>+$1.95 each</Text>
            </TouchableOpacity>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Meat and cheese only</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>One</Text>
              <Text style={styles.hboh2}>$3.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Two</Text>
              <Text style={styles.hboh2}>$5.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Extra</Text>
              <Text style={styles.hboh2}>+$1.75 each</Text>
            </TouchableOpacity>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Chipotle Shrimp</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Two</Text>
              <Text style={styles.hboh2}>$8.95</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Veggie</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>One</Text>
              <Text style={styles.hboh2}>$3.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Two</Text>
              <Text style={styles.hboh2}>$5.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Extra</Text>
              <Text style={styles.hboh2}>+$1.75 each</Text>
            </TouchableOpacity>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Fish</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>One</Text>
              <Text style={styles.hboh2}>$4.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Two</Text>
              <Text style={styles.hboh2}>$7.95</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Extra</Text>
              <Text style={styles.hboh2}>+$3.75 each</Text>
            </TouchableOpacity>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
          </View>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 3) { // burger
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Options</Text></View>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Booya's Burger and Fries</Text>
            <Text style={styles.hboh2}>$8.50 (+$2.00 for double)</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Grilled Chicken Sandwich</Text>
            <Text style={styles.hboh2}>$9.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Baby Booya Burger</Text>
            <Text style={styles.hboh2}>$6.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Blackened Chicken Sandwich</Text>
            <Text style={styles.hboh2}>$9.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Veggie Burger</Text>
            <Text style={styles.hboh2}>$8.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Turkey Burger</Text>
            <Text style={styles.hboh2}>$8.50</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 4) { // Burrito
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Custom with meat</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$8.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Chipotle Shrimp</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Fish</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$8.95</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$9.95</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Veggie</Text></View>
          <View style={styles.hbox}>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Small</Text>
              <Text style={styles.hboh2}>$7.50</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$8.50</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.centerH}><Text style={styles.subH}>Surf & Turf</Text></View>
          <View style={styles.hbox}>
            <View style={styles.disabledhboptionButton}>
              <Text style={styles.disabledhboh1}> </Text>
              <Text style={styles.disabledhboh2}> </Text>
            </View>
            <TouchableOpacity style={styles.hboptionButton}>
              <Text style={styles.hboh1}>Large</Text>
              <Text style={styles.hboh2}>$10.50</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 5) { // Salad
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Options</Text></View>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Custom veggie</Text>
            <Text style={styles.hboh2}>$7.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Custom with meat</Text>
            <Text style={styles.hboh2}>$8.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Chipotle Shrimp</Text>
            <Text style={styles.hboh2}>$9.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Surf & Turf</Text>
            <Text style={styles.hboh2}>$10.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Fish</Text>
            <Text style={styles.hboh2}>$9.95</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 6) { // Kids Menu
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Comes with chips, salsa, and drink</Text></View>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Taco</Text>
            <Text style={styles.hboh2}>$3.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Ground Beef Burrito</Text>
            <Text style={styles.hboh2}>$4.25</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Cheese Quesadilla</Text>
            <Text style={styles.hboh2}>$3.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Cheese Nacho</Text>
            <Text style={styles.hboh2}>$3.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Custom Meal</Text>
            <Text style={styles.hboh2}>$5.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Kid Fries</Text>
            <Text style={styles.hboh2}>$1.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Chicken Fingers</Text>
            <Text style={styles.hboh2}>$4.50</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    } else if(this.orderInfo.classIdx === 7) { // Fries Menu
      innerHTML = (
        <ScrollView style={{marginBottom: 40}}>
          <View style={styles.centerH}><Text style={styles.subH}>Options</Text></View>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Small Fries</Text>
            <Text style={styles.hboh2}>$2.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Large Fries</Text>
            <Text style={styles.hboh2}>$3.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Cheese Fries</Text>
            <Text style={styles.hboh2}>$6.95</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{display: "flex", paddingTop: 10, paddingBottom: 10, borderRadius: 15, alignItems: "center", justifyContent: "center", backgroundColor: "#00a24f", marginBottom: 10}}>
            <Text style={styles.hboh1}>Chili Cheese Fries</Text>
            <Text style={styles.hboh2}>$8.95</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => this.setState({currentStep: 0})}
            style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
          <FontAwesome5
            name={"angle-left"}
            size={10}
            color={"#00a24f"}
            style={{marginRight: 3}}
          />
          <Text style={{fontSize: 12, color: "#00a24f"}}>Go back to previous step</Text>
        </TouchableOpacity>
        <Text style={styles.header}>{this.classes[this.orderInfo.classIdx]}</Text>
        <View style={{height: 10}}></View>

        {innerHTML}

        <View style={{position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width, padding: 15, backgroundColor: "white", zIndex: 3, bottom: 0}}>
          <View style={styles.pedestalIcon}>
            <FontAwesome5
              name={"file-alt"}
              size={25}
              color={"white"}
            />
          </View>
          <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
          <View style={styles.pedestalIconActive}>
            <FontAwesome5
              name={"edit"}
              size={25}
              color={"white"}
            />
          </View>
          <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
          <View style={styles.pedestalIcon}>
            <FontAwesome5
              name={"shipping-fast"}
              size={25}
              color={"white"}
            />
          </View>
        </View>
      </View>
    );
  }
  renderCustomizationScreen() {
    
  }
}
*/

class ProgressIndicator extends React.Component {
  render() {
    return (
      <View style={{position: "absolute", flexDirection: "row", alignItems: "center", justifyContent: "center", width: Dimensions.get('window').width, padding: 15, backgroundColor: "white", zIndex: 3, bottom: 0}}>
        <View style={(this.props.stage === 0) ? styles.pedestalIconActive : styles.pedestalIcon}>
          <FontAwesome5
            name={"file-alt"}
            size={25}
            color={"white"}
          />
        </View>
        <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
        <View style={(this.props.stage === 1) ? styles.pedestalIconActive : styles.pedestalIcon}>
          <FontAwesome5
            name={"edit"}
            size={25}
            color={"white"}
          />
        </View>
        <View style={{backgroundColor: "#6bc999", height: 7, width: 60}}></View>
        <View style={(this.props.stage === 2) ? styles.pedestalIconActive : styles.pedestalIcon}>
          <FontAwesome5
            name={"shipping-fast"}
            size={25}
            color={"white"}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backImg: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight,
    resizeMode: 'cover',
  },
  tint: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight,
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.25)",
  },
  upperFlex: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    position: "absolute",
    top: Constants.statusBarHeight,
    height: Dimensions.get('window').height * 0.166666666667,
    width: Dimensions.get('window').width,
    paddingLeft: 20,
    paddingRight: 20
  },
  logo: {
    height: (Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight) * 0.5,
    width: (Dimensions.get('window').height * 0.166666666667 + 40 + Constants.statusBarHeight) * 0.5 * 596/343,
    resizeMode: "contain",
  },
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    padding: 40,
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    fontFamily: "roboto-slab-bold",
    fontSize: 30
  },
  pedestalIcon: {
    height: 50,
    width: 50,
    backgroundColor: "#6bc999",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 2,
    paddingLeft: 2,
    borderWidth: 5,
    borderColor: "#6bc999",
  },
  pedestalIconActive: {
    height: 50,
    width: 50,
    backgroundColor: "#00a24f",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 2,
    paddingLeft: 2,
    borderWidth: 5,
    borderColor: "#6bc999",
  },
  hbox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  hboxButton: {
    display: "flex",
    width: (Dimensions.get('window').width - 80) / 2 - 5,
    height: ((Dimensions.get('window').width - 80) / 2 - 5) * 3/4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  innerTint: {
    display: "flex",
    width: (Dimensions.get('window').width - 80) / 2 - 5,
    height: ((Dimensions.get('window').width - 80) / 2 - 5) * 3/4,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  buttonText: {
    color: "white",
    fontFamily: "roboto-slab",
    fontSize: 20
  },
  centerH: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    marginBottom: 7
  },
  subH: {
    fontFamily: 'roboto-slab',
    fontSize: 18,
    textAlign: "center"
  },
  hboptionButton: {
    display: "flex",
    width: (Dimensions.get('window').width - 80) / 2 - 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a24f",
  },
  hboh1: {
    fontSize: 20,
    color: "white"
  },
  hboh2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: "white"
  },
  disabledhboptionButton: {
    display: "flex",
    width: (Dimensions.get('window').width - 80) / 2 - 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eee",
  },
  disabledhboh1: {
    fontSize: 20,
    color: "#eee"
  },
  disabledhboh2: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#eee"
  },
  divLineContainer: {
    display: "flex",
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  divLine: {
    width: 50,
    height: 2,
    backgroundColor: "#aaa"
  }
});

