import {View, Text} from 'react-native';
import React from 'react';

const PriceFormat = ({
  amount,
  style,
}: {
  amount: number | undefined;
  style?: any;
}) => {
  const formattedAmount = new Number(amount).toLocaleString('en-Us', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 2,
  });
  return <Text style={style}>{formattedAmount}</Text>;
};

export default PriceFormat;
