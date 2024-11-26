/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonHeader from '../componets/CommonHeader';
import {ProductsProps} from '../../typs';
import Loader from '../componets/Loader';
import DetailsView from '../componets/DetailsView';
import PriceFormat from '../componets/PriceFormat';
import {colors} from '../constants';
import {ArrowRightIcon} from 'react-native-heroicons/outline';
import IsNewBadge from '../componets/IsNewBadge';
import Toast from 'react-native-toast-message';
import { addToCart } from '../redux/orebiSlices';
import { useDispatch } from 'react-redux';

const {width, height} = Dimensions.get('window');

const ProductDetails = ({route}: any) => {
  const _id = route?.params?._id;
  const [productsData, setProductData] = useState<ProductsProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://jsonserver.reactbd.com/amazonpro/${_id}`,
      );

      const json = await response.json();
      console.log('json', json);
      setProductData(json);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [_id]);
  return (
    <View>
      <CommonHeader title="Product Details" />
      {isLoading ? (
        <Loader title="Product Details is Loading" />
      ) : (
        <View style={styles.container}>
          <View style={styles.imgView}>
            {productsData?.image && (
              <Image
                source={{uri: productsData?.image}}
                alt="product-image"
                style={styles.img}
              />
            )}
          </View>
          <DetailsView productData={productsData} />
          <View style={styles.bottomMenu}>
            <View>
              <Text
                style={{
                  color: colors.defaultWhite,
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                <PriceFormat amount={productsData?.price} />
              </Text>
              <Text
                style={{
                  color: colors.defaultWhite,
                  textDecorationLine: 'line-through',
                }}>
                <PriceFormat amount={productsData?.previousPrice} />
              </Text>
            </View>
            <Pressable
            onPress={()=>{dispatch(addToCart(productsData),Toast.show({type:'success',text1:`${productsData?.title} added successfully`}))}}

              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                backgroundColor: colors.designColor,
                paddingHorizontal: 10,
                paddingVertical: 8,
                borderRadius: 6,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  fontSize: 12,
                  fontWeight: '600',
                  marginRight: 5,
                  color: colors.textBlack,
                }}>
                Add to cart
              </Text>
              <ArrowRightIcon size={16} color={colors.textBlack} />
            </Pressable>
          </View>
          {productsData?.isNew && (
            <IsNewBadge
              customStyle={{
                right: 20,
                top: 20,
                paddingHorizontal: 10,
                paddingVertical: 7,
                borderRadius: 6,
              }}
              title="NewArrival"
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: height,
    position: 'relative',
  },
  imgView: {
    width: width,
    height: height / 2,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  bottomMenu: {
    position: 'absolute',
    bottom: 100,
    borderWidth: 1,
    borderColor: 'black',
    width: width - 20,
    alignSelf: 'center',
    borderRadius: 6,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.bgColor,
  },
});

export default ProductDetails;
