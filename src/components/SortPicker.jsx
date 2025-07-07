import { useState } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f2f2f2',
  },
  buttonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    backgroundColor: 'white',
  },
});

const SortPicker = ({ order, setOrder }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ padding: 15 }}>
      <Text style={styles.label}>Sort by:</Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{order === 'Latest' ? 'Latest' : order === 'Highest' ? 'Highest rated' : 'Lowest rated'} repositories</Text>
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Picker
              selectedValue={order}
              onValueChange={(value) => {
                setOrder(value);
                setModalVisible(false);
              }}
            >
              <Picker.Item label="Latest repositories" value="Latest" />
              <Picker.Item label="Highest rated repositories" value="Highest" />
              <Picker.Item label="Lowest rated repositories" value="Lowest" />
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SortPicker;
