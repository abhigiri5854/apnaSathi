import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

export default function UserProfileScreen({ navigation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: 'Sunita Devi',
    phone: '+91 98765 43210',
    email: '',
    gender: 'Female',
    walletBalance: 1250,
    bookings: 2,
    favorites: 5,
  });

  const [savedAddresses] = useState([
    {
      id: 1,
      label: 'Work',
      address: '15-319 Avenua Apartment, Pune - 411990',
    },
    {
      id: 2,
      label: 'Home',
      address: '28 Gotaga Negar, Pune - 411998',
    },
  ]);

  const menuItems = [
    { id: 1, icon: 'location', label: 'Saved Addresses', count: savedAddresses.length },
    { id: 2, icon: 'wallet', label: 'Wallet', amount: `₹ ${userData.walletBalance}` },
    { id: 3, icon: 'briefcase', label: 'My Bookings', count: userData.bookings },
    { id: 4, icon: 'heart', label: 'Favorites', count: userData.favorites },
    { id: 5, icon: 'headset', label: 'Help & Support' },
    { id: 6, icon: 'settings', label: 'Settings' },
  ];

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleGenderSelect = (gender) => {
    setUserData({ ...userData, gender });
  };

  const handleMenuPress = (item) => {
    if (item.label === 'My Bookings') {
      navigation.navigate('Bookings');
    } else if (item.label === 'Favorites') {
      navigation.navigate('Favorites');
    } else if (item.label === 'Wallet') {
      Alert.alert('Wallet', `Your wallet balance is ₹${userData.walletBalance}`);
    } else if (item.label === 'Saved Addresses') {
      setIsEditing(true);
    } else {
      Alert.alert(item.label, 'Feature coming soon!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>4:30</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="signal" size={16} color={colors.textDark} />
            <Ionicons name="battery-full" size={16} color={colors.textDark} />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.textDark} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=47' }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profilePhone}>{userData.phone}</Text>
          
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="pencil" size={16} color={colors.white} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Wallet Card */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => Alert.alert('Wallet', `Your wallet balance is ₹${userData.walletBalance}`)}
          activeOpacity={0.7}
        >
          <View style={styles.walletCard}>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet" size={32} color={colors.primary} />
            </View>
            <View style={styles.walletInfo}>
              <Text style={styles.walletLabel}>Wallet</Text>
              <Text style={styles.walletAmount}>₹ {userData.walletBalance}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.card}>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Bookings')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="calendar" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Bookings')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="camera" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Favorites')}
            >
              <View style={styles.quickActionIcon}>
                <Ionicons name="heart" size={24} color={colors.primary} />
              </View>
              <Text style={styles.quickActionText}>Favorites</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Details */}
        {isEditing ? (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Profile Details</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => setUserData({ ...userData, name: text })}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Gender</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    userData.gender === 'Male' && styles.genderButtonActive,
                  ]}
                  onPress={() => handleGenderSelect('Male')}
                >
                  <Ionicons
                    name="male"
                    size={20}
                    color={userData.gender === 'Male' ? colors.white : colors.textDark}
                  />
                  <Text
                    style={[
                      styles.genderButtonText,
                      userData.gender === 'Male' && styles.genderButtonTextActive,
                    ]}
                  >
                    Male
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.genderButton,
                    userData.gender === 'Female' && styles.genderButtonActive,
                  ]}
                  onPress={() => handleGenderSelect('Female')}
                >
                  <Ionicons
                    name="female"
                    size={20}
                    color={userData.gender === 'Female' ? colors.white : colors.textDark}
                  />
                  <Text
                    style={[
                      styles.genderButtonText,
                      userData.gender === 'Female' && styles.genderButtonTextActive,
                    ]}
                  >
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Phone</Text>
              <View style={styles.phoneInputContainer}>
                <Text style={styles.phoneInput}>{userData.phone}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.gray} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                value={userData.email}
                onChangeText={(text) => setUserData({ ...userData, email: text })}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Saved Addresses */}
        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Addresses</Text>
            {isEditing && (
              <TouchableOpacity onPress={() => Alert.alert('Edit Addresses', 'Address editing feature coming soon!')}>
                <Text style={styles.editLink}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {savedAddresses.map((address, index) => (
            <TouchableOpacity
              key={address.id}
              style={[
                styles.addressItem,
                index === savedAddresses.length - 1 && styles.addressItemLast,
              ]}
              onPress={() => Alert.alert(address.label, address.address)}
              activeOpacity={0.7}
            >
              <View style={styles.addressContent}>
                <View style={styles.addressIcon}>
                  <Ionicons name="location" size={20} color={colors.primary} />
                </View>
                <View style={styles.addressInfo}>
                  <Text style={styles.addressLabel}>{address.label}</Text>
                  <Text style={styles.addressText}>{address.address}</Text>
                </View>
              </View>
              {isEditing ? (
                <TouchableOpacity onPress={() => Alert.alert('Edit', `Edit ${address.label} address`)}>
                  <Text style={styles.editLink}>Edit</Text>
                </TouchableOpacity>
              ) : (
                <Ionicons name="chevron-forward" size={20} color={colors.gray} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.card}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={() => handleMenuPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <View style={styles.menuItemRight}>
                {item.count && (
                  <Text style={styles.menuCount}>{item.count}</Text>
                )}
                {item.amount && (
                  <Text style={styles.menuAmount}>{item.amount}</Text>
                )}
                <Ionicons name="chevron-forward" size={20} color={colors.gray} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightCream,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textDark,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.lightCream,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.textDark,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  profileImageContainer: {
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: colors.primary,
  },
  profileName: {
    ...typography.h1,
    fontSize: 22,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  profilePhone: {
    ...typography.body,
    color: colors.textLight,
    marginBottom: spacing.md,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    gap: spacing.xs,
  },
  editButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  walletCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  walletInfo: {
    flex: 1,
  },
  walletLabel: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  walletAmount: {
    ...typography.h1,
    fontSize: 28,
    color: colors.textDark,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionButton: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  quickActionText: {
    ...typography.caption,
    color: colors.textDark,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  genderButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    gap: spacing.xs,
  },
  genderButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  genderButtonText: {
    ...typography.body,
    color: colors.textDark,
  },
  genderButtonTextActive: {
    color: colors.white,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  phoneInput: {
    ...typography.body,
    color: colors.textDark,
    flex: 1,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  saveButtonText: {
    ...typography.h3,
    color: colors.white,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  addressItemLast: {
    borderBottomWidth: 0,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  addressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  addressInfo: {
    flex: 1,
  },
  addressLabel: {
    ...typography.body,
    fontWeight: '600',
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  addressText: {
    ...typography.caption,
    color: colors.textLight,
  },
  editLink: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: '600',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.textDark,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  menuCount: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  menuAmount: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  bottomSpacing: {
    height: spacing.xl,
  },
});

