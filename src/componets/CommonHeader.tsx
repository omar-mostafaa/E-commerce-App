import {View, Text,Image, StyleSheet, SafeAreaView, Pressable} from 'react-native';
import React from 'react';
import {ArrowLeftIcon} from 'react-native-heroicons/outline';
import {colors} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from '../../typs';
import { logo } from '../assets';
import {ShoppingCartIcon} from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';

const CommonHeader = ({title}: {title: string}) => {
  const navigation: NavigationProps = useNavigation();
  const {productData} = useSelector((state:any) => state?.orebi)

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <ArrowLeftIcon color={colors.textBlack} size={20} />
          <Text  style={{color:colors.textBlack, marginLeft:5,fontWeight:'600'}}>{title}</Text>
        </Pressable>
        <Pressable onPress={()=> navigation.navigate('Home')}>
          <Image source={logo} alt="logo-icon" style={styles.logo} />
        </Pressable>
        <Pressable onPress={()=> navigation.navigate('Cart')} style={styles.cartIcon}>
          <ShoppingCartIcon color={colors.textBlack} size={22} />
          <View style={styles.cartCount}>
            <Text style={styles.cartText}>{productData?.length > 0 ? productData.length : 0}</Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBlockColor: 'gray',
  },
  logo: {
    width: 100,
    height: 25,
    objectFit: 'contain',
  },
  cartIcon: {
    position: 'relative',
  },
  cartCount: {
    borderRadius: 50,
    backgroundColor: 'black',
    position: 'absolute',
    right: -4,
    top: -6,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartText: {
    color: colors.defaultWhite,
    fontSize: 10,
    fontWeight: '700',
  },
});
export default CommonHeader;
