import React from 'react';
import { View, StyleSheet } from 'react-native';

const Card = ({ children, style, elevation = 2, ...props }) => {
  return (
    <View
      style={[
        styles.card,
        { elevation },
        elevation === 0 && styles.noShadow,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  noShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default Card;