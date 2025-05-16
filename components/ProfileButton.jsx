import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { CircleUser as UserCircle2, LogOut, Settings, ShoppingBag } from 'lucide-react-native';
import { useAuth } from '@/contexts/AuthContext';

const ProfileButton = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateTo = (route) => {
    setMenuVisible(false);
    router.push(route);
  };

  const handleLogout = () => {
    setMenuVisible(false);
    logout();
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={toggleMenu}
      >
        {user?.profileImage ? (
          <Image 
            source={{ uri: user.profileImage }} 
            style={styles.profileImage} 
          />
        ) : (
          <UserCircle2 size={30} color="#00BFA5" />
        )}
      </TouchableOpacity>

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuContainer}>
            {user ? (
              <>
                <View style={styles.userInfo}>
                  {user.profileImage ? (
                    <Image 
                      source={{ uri: user.profileImage }} 
                      style={styles.menuProfileImage} 
                    />
                  ) : (
                    <UserCircle2 size={50} color="#00BFA5" />
                  )}
                  <View style={styles.userTextInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                  </View>
                </View>
                
                <View style={styles.menuItems}>
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigateTo('/profile')}
                  >
                    <UserCircle2 size={20} color="#212121" />
                    <Text style={styles.menuItemText}>My Profile</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigateTo('/orders')}
                  >
                    <ShoppingBag size={20} color="#212121" />
                    <Text style={styles.menuItemText}>My Orders</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.menuItem}
                    onPress={() => navigateTo('/settings')}
                  >
                    <Settings size={20} color="#212121" />
                    <Text style={styles.menuItemText}>Settings</Text>
                  </TouchableOpacity>
                  
                  {user.isAdmin && (
                    <TouchableOpacity 
                      style={styles.menuItem}
                      onPress={() => navigateTo('/admin')}
                    >
                      <Settings size={20} color="#FF5252" />
                      <Text style={[styles.menuItemText, styles.adminText]}>Admin Panel</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity 
                    style={[styles.menuItem, styles.logoutItem]}
                    onPress={handleLogout}
                  >
                    <LogOut size={20} color="#FF5252" />
                    <Text style={styles.logoutText}>Logout</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={styles.menuItems}>
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigateTo('/auth/login')}
                >
                  <UserCircle2 size={20} color="#212121" />
                  <Text style={styles.menuItemText}>Sign In</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.menuItem}
                  onPress={() => navigateTo('/auth/register')}
                >
                  <UserCircle2 size={20} color="#212121" />
                  <Text style={styles.menuItemText}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F2F1',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    width: 280,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 60,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  menuProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userTextInfo: {
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: 14,
    color: '#757575',
  },
  menuItems: {
    padding: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#212121',
  },
  adminText: {
    color: '#FF5252',
    fontWeight: '500',
  },
  logoutItem: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    marginTop: 8,
    paddingTop: 16,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#FF5252',
  },
});

export default ProfileButton;