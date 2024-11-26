/* eslint-disable react-native/no-inline-styles */
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../componets/Header';
import {colors} from '../constants';
import {Item} from '../../typs';
import Carousel from 'react-native-reanimated-carousel';
import {bannerOne, bannerThree, bannerTwo} from '../assets';
import {useNavigation} from '@react-navigation/native';
import { ShoppingCartIcon } from 'react-native-heroicons/outline';
import IsNewBadge from '../componets/IsNewBadge';
import Loader from '../componets/Loader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/orebiSlices';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');

const Home = () => {
  const navigation: any = useNavigation();
  const [productsArray, setProductArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://jsonserver.reactbd.com/amazonpro');

      const json = await response.json();
      console.log('json', json);
      setProductArray(json);
      setIsLoading(false);
    } catch (error) {
      console.log('Error', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const images = [bannerOne, bannerTwo, bannerThree];

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({item}: Item) => {
   
    return (
      <TouchableOpacity
        style={styles.productView}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            _id: item?._id,
          })
        }>
        <Image
          source={{uri: item?.image}}
          alt="product-image"
          style={styles.img}
        />

        <View style={styles.textView}>
          <Text>{item?.title}</Text>
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 5,
            }}>
          <View>
          <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                fontWeight: '600',
                color: colors.textBlack,
                fontSize: 12,
              }}>
              ${item?.price}
            </Text>
            <Text style={{fontSize: 12, textDecorationLine: 'line-through'}}>
              ${item?.previousPrice}
            </Text>
          </View>

<TouchableOpacity
onPress={()=>{dispatch(addToCart(item),Toast.show({type:'success',text1:`${item?.title} added successfully`}))}}
style={{
  backgroundColor: colors.designColor,
  paddingHorizontal:10,
  paddingVertical:7,
  borderRadius:6
}}>
<ShoppingCartIcon size={20} color={colors.textBlack}/>
</TouchableOpacity>

          </View>
        </View>
        {item?.isNew && <IsNewBadge/>}
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header />
      <View>
        {isLoading ? (

          <Loader title='Product is Loading...' />
          // <View style={styles.loadingContainer}>
          //   <ActivityIndicator size="large" color={colors.lightText} />
          //   <Text style={styles.loadingText}>Loading, please wait...</Text>
          // </View>
        ) : (
          <FlatList
            data={productsArray}
            contentContainerStyle={styles.container}
            keyExtractor={(item: any) => item?.id}
            renderItem={RenderItem}
            refreshing={refreshing}
            onRefresh={() => {
              getData();
            }}
            numColumns={2}
            ListHeaderComponent={
              <View>
                <Carousel
                  loop
                  width={width}
                  style={{height: 210}}
                  autoPlay={true}
                  data={images}
                  scrollAnimationDuration={2000}
                  renderItem={({item}) => {
                    return (
                      <View>
                        <Image
                          source={item}
                          style={{
                            width: '100%',
                            height: 270,
                            resizeMode: 'cover',
                          }}
                        />
                      </View>
                    );
                  }}
                />
              </View>
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.defaultWhite,
    paddingBottom: 200,
  },
  productView: {
    flex: 1,
    height: height / 3,
    borderWidth: 0.5,
    borderColor: colors.lightText,
    margin: 5,
    borderRadius: 6,
    // marginHorizontal:10,
    overflow: 'hidden',
    position: 'relative',
  },
  img: {
    flex: 1,
    resizeMode: 'cover',
  },
  // loadingContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: 50,
  // },
  // loadingText: {
  //   marginTop: 10,
  //   fontSize: 16,
  //   color: colors.textBlack,
  // },
  textView: {
    padding: 10,
  },
});

export default Home;
