/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import { Radio, CheckBox, Content } from "native-base";
import DatePicker from "react-native-datepicker";
import ImagePicker from "react-native-image-picker";

const options = {
  title: "Select Foto Keterangan Dokter",
  storageOptions: {
    skipBackup: true,
    path: "images"
  }
};

const instructions = Platform.select({
  ios: "Contoh form dinamis",
  android: "Contoh form dinamis"
});

type Props = {};
export default class App extends Component<Props> {
  state = {
    layanan_id: 1,
    urai: "Akta Kelahiran",
    deskripsi: "anu, kalo mau buat akte ",
    berkas_pendukung: [
      {
        id: 1,
        deskripsi: "Ini loh md incognito baru Chrome, tapi dah lama\n",
        id_berkas: "906b42b0-5431-11e9-8c9d-9f0a9da0ac60",
        berkas: {
          id: "906b42b0-5431-11e9-8c9d-9f0a9da0ac60",
          file_name: "SPEC-incognito-NTP.png",
          file_type: "image/png"
        }
      }
    ],
    persyaratan: [
      {
        key: "5VijFpPWR4wXqs6WVvtoEq",
        label: "Surat Keterangan Dokter",
        jenis: "image",
        default: "",
        hint: "",
        required: 0,
        opsi: []
      },
      {
        key: "cdUpSazetSgmLJDyaow5KH",
        label: "Nama Pemilik Akte",
        jenis: "text",
        default: "abc",
        hint: "abcdefg",
        required: 0,
        opsi: []
      },
      {
        key: "hyNSYFaRcCARxMyiyLcc8i",
        label: "Tanggal Kelahiran",
        jenis: "date",
        default: "2019-02-12",
        hint: "2",
        required: 0,
        opsi: []
      },
      {
        key: "uSP2WTtsCFUh1u4mC3j7MT",
        label: "jenis kelamin",
        jenis: "radio",
        default: false,
        hint: "Isikan Nilai Default",
        required: 0,
        opsi: ["lakilaki", "perempuan", "2", "3", "4", "5"]
      }
    ]
  };

  onPressImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data }

        const result = this.changeValueArrayState("image", response.uri);
        this.setState({
          persyaratan: result
        });
      }
    });
  };

  changeValueArrayState = (key, value) => {
    const { persyaratan } = this.state;
    const persyaratanTemporary = persyaratan.map(item => {
      if (item.jenis === key) {
        return {
          ...item,
          default: value
        };
      }
      return item;
    });

    return persyaratanTemporary;
  };

  renderImage = item => {
    return (
      <TouchableOpacity
        onPress={this.onPressImage}
        style={{
          height: 150,
          width: 150,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {item.default === "" ? (
          <Text>Press Here</Text>
        ) : (
          <Image
            style={{ height: 150, width: 150 }}
            source={{
              uri: item.default
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  renderText = item => {
    return (
      <View>
        <TextInput
          style={{
            borderWidth: 1,
            height: 50,
            borderColor: "grey",
            paddingLeft: 20
          }}
          onChangeText={value => {
            const result = this.changeValueArrayState("text", value);
            this.setState({
              persyaratan: result
            });
          }}
        />
      </View>
    );
  };

  renderDate = item => {
    return (
      <View>
        <DatePicker
          style={{ width: 200 }}
          date={item.default}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate="2019-04-01"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: "absolute",
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 36
            }
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            const result = this.changeValueArrayState("date", date);
            this.setState({
              persyaratan: result
            });
          }}
        />
      </View>
    );
  };

  renderRadio = item => {
    return (
      <CheckBox
        checked={item.default}
        onPress={() => {
          const result = this.changeValueArrayState("radio", !item.default);
          this.setState({
            persyaratan: result
          });
        }}
      />
    );
  };

  renderItem = item => {
    switch (item.jenis) {
      case "image":
        return this.renderImage(item);
      case "text":
        return this.renderText(item);
      case "date":
        return this.renderDate(item);
      case "radio":
        return this.renderRadio(item);
      default:
        return <CheckBox />;
    }
  };

  onPressSubmit = () => {};

  render() {
    const { persyaratan } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <Content>
          <Text style={styles.instructions}>{instructions}</Text>
          <View style={{ marginTop: 30, padding: 20 }}>
            {persyaratan.map((item, i) => (
              <View key={i} style={{ margin: 15 }}>
                <Text style={{ marginBottom: 10 }}>{item.label}</Text>
                {this.renderItem(item)}
              </View>
            ))}
          </View>
          <Button title="SUBMIT" onPress={this.onPressSubmit} />
        </Content>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
