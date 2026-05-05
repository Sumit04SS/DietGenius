import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Colors from './shared/Colors';

export default function DateSelectionCard({ setSelectedDate }) {
  const [dataList, setDataList] = useState([]);
  const [selectedData, setSelectedData_] = useState(null);

  useEffect(() => {
    GenerateDates();
  }, []);

  const GenerateDates = () => {
    const result = [];
    for (let i = 0; i < 4; i++) {
      const nextDate = moment().add(i, 'days').format('DD/MM/YYYY');
      result.push(nextDate);
    }
    setDataList(result);
  };

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>
        Select Date
      </Text>

      <FlatList
        data={dataList}
        horizontal
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedDate(item);
              setSelectedData_(item);
            }}
            style={{
              alignItems: 'center',
              padding: 7,
              borderWidth: 1,
              borderRadius: 10,
              margin: 5,
              backgroundColor:
                selectedData === item
                  ? Colors.SECONDARY
                  : Colors.WHITE,
              borderColor:
                selectedData === item
                  ? Colors.PRIMARY
                  : Colors.GRAY,
            }}
          >
            <Text>{moment(item, 'DD/MM/YYYY').format('ddd')}</Text>

            <Text style={{ fontWeight: 'bold' }}>
              {moment(item, 'DD/MM/YYYY').format('DD')}
            </Text>

            <Text>{moment(item, 'DD/MM/YYYY').format('MMM')}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}