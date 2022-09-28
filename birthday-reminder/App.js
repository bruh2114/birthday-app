import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import moment from 'moment';

export default function App() {
  const [birthday, setBirthday] = useState('');

  const utcDateToString = (momentInUTC) => {
    let s = moment.utc(momentInUTC).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return s;
  };

  function addBirthdayToCalendar(title, startDateUTC) {
    const eventConfig = {
      title: birthday,
      startDate: utcDateToString(startDateUTC),
      endDate: utcDateToString(moment.utc(startDateUTC).add(1, 'hours')),
      notes: 'Default Birthday Description',
    };

    AddCalendarEvent.presentEventCreatingDialog(eventConfig)
      .then((eventInfo) => {
        alert(JSON.stringify(eventInfo));
      })
      .catch((error) => {
        alert('Error ', error);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add Birthday to device's Calendar from React Native App
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Enter a someone's birthday:</Text>
        <TextInput
          style={styles.input}
          value={birthday}
          onChangeText={(text) => setBirthday(text)}
        />
       
      </View>
      <TouchableOpacity style={styles.button} onPress={addBirthdayToCalendar}>
        <Text style={[styles.text, { color: 'white' }]}>
          Add this birthday to the calendar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f2',
    paddingTop: 60,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  input: {
    fontSize: 14,
    marginVertical: 10,
    padding: 5,
    backgroundColor: '#ebebeb',
    borderColor: '#333',
    borderRadius: 4,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'purple',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
});
