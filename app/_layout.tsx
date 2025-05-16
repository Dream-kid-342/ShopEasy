import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ProductProvider } from '@/contexts/ProductContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <View style={styles.container}>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#f9f9f9' }
            }}>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="products/[id]" options={{ headerShown: false, presentation: 'card' }} />
              <Stack.Screen name="checkout" options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name="auth/login" options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name="auth/register" options={{ headerShown: false, presentation: 'modal' }} />
              <Stack.Screen name="orders" options={{ headerShown: false }} />
              <Stack.Screen name="settings" options={{ headerShown: false }} />
              <Stack.Screen name="profile" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
            <StatusBar style="auto" />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});