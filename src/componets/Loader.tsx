import {View, Text, Dimensions, StyleSheet,ActivityIndicator} from 'react-native';
import React from 'react';
import {colors} from '../constants';

const {height} = Dimensions.get('window');

const Loader = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop:-100}}>
        <Text
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            textAlign: 'center',
            marginBottom: 10,
            color: colors.defaultWhite,
            fontSize:16
          }}>
          {title ? title : 'Loading is running'}
        </Text>
        <ActivityIndicator size="large" color={colors.designColor} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height - 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000080',
  },
});

export default Loader;
