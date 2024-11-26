/* eslint-disable react-native/no-inline-styles */
import { View, Image,Text } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { colors } from '../constants'
import { Pressable } from 'react-native-gesture-handler'
import {MinusIcon,PlusIcon,TrashIcon} from 'react-native-heroicons/outline';
import { decreaseQuantity } from '../redux/orebiSlices'
import { increaseQuantity } from '../redux/orebiSlices'
import PriceFormat from './PriceFormat'
import { deleteProduct } from '../redux/orebiSlices'

const CartProducts = ({item}:any) => {
    const dispatch = useDispatch()
  return (
    <View style={{
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: colors.defaultWhite,
        marginBottom: 10,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    }}>
     <View style={{flexDirection:'row',alignItems:'center',width:180}}>
        <Image source={{uri:item?.image}} style={{width:80,height:80}}/>
        <View>
            <Text style={{color: colors.textBlack, fontWeight:'800'}}>{item?.title.substring(0,12)}</Text>
            <Text>{item?.brand}</Text>
        </View>
     </View>
     <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderColor: colors.lightText,
    borderRadius: 4,
    width: 70,
    height: 20,
    justifyContent: 'space-between',
    paddingHorizontal: 5,
}}>
        <Pressable onPress={()=> dispatch(decreaseQuantity(item))}>
            <MinusIcon size={16} color={colors.textBlack}/>

        </Pressable>
        <Text>{item?.quantity}</Text>
        <Pressable  onPress={()=> dispatch(increaseQuantity(item))}>
            <PlusIcon size={16} color={colors.textBlack}/>

        </Pressable>
     </View>
     <Text style={{color:colors.textBlack,fontWeight:'600'}}>
        <PriceFormat amount={item?.price * item?.quantity}/>
     </Text>
     <Pressable style={{ position: 'absolute', right: 10, top: 10 }} onPress={() => dispatch(deleteProduct(item?._id))}>
    <TrashIcon size={20} color={colors.textBlack} />
</Pressable>
    </View>
  )
}

export default CartProducts