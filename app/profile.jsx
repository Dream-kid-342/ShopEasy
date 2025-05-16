import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, User, Mail, Phone, MapPin, CreditCard as Edit2 } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '@/contexts/AuthContext';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, updateProfile, logout } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, New York, NY 10001',
    profileImage: user?.profileImage || null
  });
  
  const handleBack = () => {
    router.back();
  };
  
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  const handleChange = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };
  
  const handleSave = async () => {
    try {
      await updateProfile(profileData);
      setEditMode(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };
  
  const handleLogout = () => {
    logout();
    router.replace('/');
  };
  
  const handleSelectImage = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert('Permission Required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setProfileData({
        ...profileData,
        profileImage: selectedImage
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#212121" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profile</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleToggleEditMode}>
          {editMode ? (
            <Text style={styles.editButtonText}>Cancel</Text>
          ) : (
            <Edit2 size={20} color="#00BFA5" />
          )}
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.profileImageContainer}>
          {profileData.profileImage ? (
            <Image 
              source={{ uri: profileData.profileImage }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={styles.profilePlaceholder}>
              <User size={60} color="#BDBDBD" />
            </View>
          )}
          
          {editMode && (
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={handleSelectImage}
            >
              <Camera size={20} color="white" />
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.profileName}>{user?.name || "User"}</Text>
        
        <Card style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          {editMode ? (
            <View style={styles.editForm}>
              <Input
                label="Full Name"
                value={profileData.name}
                onChangeText={(text) => handleChange('name', text)}
                leftIcon={<User size={20} color="#757575" />}
              />
              
              <Input
                label="Email"
                value={profileData.email}
                onChangeText={(text) => handleChange('email', text)}
                keyboardType="email-address"
                leftIcon={<Mail size={20} color="#757575" />}
                disabled={true}
              />
              
              <Input
                label="Phone"
                value={profileData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                keyboardType="phone-pad"
                leftIcon={<Phone size={20} color="#757575" />}
              />
              
              <Input
                label="Address"
                value={profileData.address}
                onChangeText={(text) => handleChange('address', text)}
                leftIcon={<MapPin size={20} color="#757575" />}
              />
              
              <Button
                title="Save Changes"
                onPress={handleSave}
                style={styles.saveButton}
              />
            </View>
          ) : (
            <>
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <User size={20} color="#00BFA5" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Full Name</Text>
                  <Text style={styles.infoValue}>{profileData.name}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Mail size={20} color="#00BFA5" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profileData.email}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Phone size={20} color="#00BFA5" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{profileData.phone}</Text>
                </View>
              </View>
              
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <MapPin size={20} color="#00BFA5" />
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Address</Text>
                  <Text style={styles.infoValue}>{profileData.address}</Text>
                </View>
              </View>
            </>
          )}
        </Card>
        
        {user?.isAdmin && !editMode && (
          <Card style={styles.adminCard}>
            <Text style={styles.adminTitle}>Admin Status</Text>
            <Text style={styles.adminText}>
              You have admin privileges. You can access the admin dashboard and manage products, orders, and users.
            </Text>
            <Button
              title="Go to Admin Dashboard"
              onPress={() => router.push('/admin')}
              style={styles.adminButton}
            />
          </Card>
        )}
        
        {!editMode && (
          <Button
            title="Logout"
            variant="outline"
            onPress={handleLogout}
            style={styles.logoutButton}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: '#00BFA5',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: '35%',
    backgroundColor: '#00BFA5',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  profileName: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  profileCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
    justifyContent: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  editForm: {},
  saveButton: {
    marginTop: 16,
  },
  adminCard: {
    marginBottom: 16,
    backgroundColor: '#E0F2F1',
  },
  adminTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#00796B',
  },
  adminText: {
    marginBottom: 16,
    color: '#00796B',
  },
  adminButton: {
    backgroundColor: '#00796B',
  },
  logoutButton: {
    marginBottom: 32,
  },
});