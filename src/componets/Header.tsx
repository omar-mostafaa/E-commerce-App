import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Bars4Icon, ShoppingCartIcon} from 'react-native-heroicons/outline';
import {colors} from '../constants';
import {logo} from '../assets';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
const Header = () => {
    const navigation:any = useNavigation()
    const {productData} = useSelector((state:any) => state?.orebi)
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Pressable onPress={()=>navigation.openDrawer()}>
          <Bars4Icon
            color={colors.textBlack}
            fill={colors.textBlack}
            size={20}
          />
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

export default Header;
