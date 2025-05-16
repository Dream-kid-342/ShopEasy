import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon = null,
  style,
  ...props
}) => {
  const getButtonStyle = () => {
    let buttonStyle = [styles.button];
    
    // Variant styles
    if (variant === 'primary') buttonStyle.push(styles.primaryButton);
    else if (variant === 'secondary') buttonStyle.push(styles.secondaryButton);
    else if (variant === 'outline') buttonStyle.push(styles.outlineButton);
    else if (variant === 'danger') buttonStyle.push(styles.dangerButton);
    
    // Size styles
    if (size === 'small') buttonStyle.push(styles.smallButton);
    else if (size === 'large') buttonStyle.push(styles.largeButton);
    
    // Width style
    if (fullWidth) buttonStyle.push(styles.fullWidth);
    
    // Disabled style
    if (disabled) buttonStyle.push(styles.disabledButton);
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyle = [styles.buttonText];
    
    if (variant === 'outline') textStyle.push(styles.outlineText);
    if (size === 'small') textStyle.push(styles.smallText);
    else if (size === 'large') textStyle.push(styles.largeText);
    if (disabled) textStyle.push(styles.disabledText);
    
    return textStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[...getButtonStyle(), style]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#00BFA5' : 'white'} />
      ) : (
        <>
          {icon && icon}
          <Text style={getTextStyle()}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  primaryButton: {
    backgroundColor: '#00BFA5',
  },
  secondaryButton: {
    backgroundColor: '#757575',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#00BFA5',
  },
  dangerButton: {
    backgroundColor: '#FF5252',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  fullWidth: {
    width: '100%',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  outlineText: {
    color: '#00BFA5',
  },
  smallText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 18,
  },
  disabledText: {
    opacity: 0.8,
  },
});

export default Button;