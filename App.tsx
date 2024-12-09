import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, TextInput, Button, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';

const data = [
  { label: 'Songs', value: 'Songs' },
  { label: 'Playlists', value: 'Playlists' },
];

export default function App() {
  const [selectedValue, setSelectedValue] = useState("Songs");
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [songTitle, setSongTitle] = useState("");

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, selectedValue === item.value && styles.selectedItem]}
      onPress={() => setSelectedValue(item.value)}
    >
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  const handleButtonPress = () => {
    if (selectedValue === 'Songs') {
      setModalVisible(true);
    }
  };

  const handleFilePathSubmit = () => {
    console.log(`File path entered: ${filePath}`);
    console.log(`Song title entered: ${songTitle}`);
    setModalVisible(false);
    // Verify the path leads to an mp3 file:
    if (filePath.endsWith('.mp3')) {
      // Append to list of songs:
      data.push({ label: songTitle, value: filePath });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Enter Song Title:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter song title"
                  value={songTitle}
                  onChangeText={setSongTitle}
                />
                <Text style={styles.modalText}>Enter File Path:</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter file path"
                  value={filePath}
                  onChangeText={setFilePath}
                />
                <Button title="Submit" onPress={handleFilePathSubmit} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    height: 42,
    top: -240,
    justifyContent: 'center',
  },
  item: {
    width: 90,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: 'lightgray',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: 'honeydew',
  },
  itemText: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Times New Roman',
  },
  button: {
    position: 'absolute',
    top: 20,
    left: 315,
  },
  buttonText: {
    fontSize: 47,
    color: 'black',
    fontFamily: 'Times New Roman',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'lightgray',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  textInput: {
    width: '100%',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});