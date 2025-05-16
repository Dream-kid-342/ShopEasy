import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Badge = ({ 
  label, 
  variant = 'primary', 
  size = 'medium',
  style, 
  textStyle 
}) => {
  const getBadgeStyle = () => {
    const badgeStyles = [styles.badge];
    
    if (variant === 'primary') badgeStyles.push(styles.primary);
    else if (variant === 'secondary') badgeStyles.push(styles.secondary);
    else if (variant === 'success') badgeStyles.push(styles.success);
    else if (variant === 'danger') badgeStyles.push(styles.danger);
    else if (variant === 'warning') badgeStyles.push(styles.warning);
    else if (variant === 'info') badgeStyles.push(styles.info);
    
    if (size === 'small') badgeStyles.push(styles.small);
    else if (size === 'large') badgeStyles.push(styles.large);
    
    return badgeStyles;
  };
  
  const getTextStyle = () => {
    const textStyles = [styles.text];
    
    if (size === 'small') textStyles.push(styles.smallText);
    else if (size === 'large') textStyles.push(styles.largeText);
    
    return textStyles;
  };

  return (
    <View style={[...getBadgeStyle(), style]}>
      <Text style={[...getTextStyle(), textStyle]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: '#E0F2F1',
  },
  secondary: {
    backgroundColor: '#EEEEEE',
  },
  success: {
    backgroundColor: '#E8F5E9',
  },
  danger: {
    backgroundColor: '#FFEBEE',
  },
  warning: {
    backgroundColor: '#FFF8E1',
  },
  info: {
    backgroundColor: '#E3F2FD',
  },
  small: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  large: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
    color: '#00796B',
  },
  smallText: {
    fontSize: 10,
  },
  largeText: {
    fontSize: 14,
  },
});

export default Badge;