import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

const services = [
  { id: 1, name: 'Cook', icon: 'restaurant' },
  { id: 2, name: 'Maid', icon: 'home' },
  { id: 3, name: 'Cleaner', icon: 'brush' },
  { id: 4, name: 'Babysitter', icon: 'happy' },
  { id: 5, name: 'Electrician', icon: 'flash' },
  { id: 6, name: 'Plumber', icon: 'water' },
  { id: 7, name: 'Painter', icon: 'color-palette' },
  { id: 8, name: 'Car Wash', icon: 'car' },
  { id: 9, name: 'Laundry', icon: 'shirt' },
];

export default function HomeScreen({ navigation }) {
  const handleServicePress = (service) => {
    navigation.navigate('Book', { service: service.name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>4:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="signal" size={16} color={colors.black} />
            <Ionicons name="battery-full" size={16} color={colors.black} />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <Ionicons name="menu" size={24} color={colors.black} />
          <Text style={styles.appTitle}>GharSaathi</Text>
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
            <Ionicons name="person-circle" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray} />
          <Text style={styles.searchPlaceholder}>Search for Cook</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Promotional Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerContent}>
            <Text style={styles.bannerTitle}>Hire Verified Workers</Text>
            <Text style={styles.bannerSubtitle}>Find instead professionals nor you</Text>
          </View>
          <View style={styles.bannerIcon}>
            <Ionicons name="thumbs-up" size={60} color={colors.darkBlue} />
          </View>
        </View>

        {/* Service Categories */}
        <View style={styles.servicesGrid}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => handleServicePress(service)}
            >
              <View style={styles.serviceIcon}>
                <Ionicons name={service.icon} size={28} color={colors.primary} />
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.black,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: colors.white,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  appTitle: {
    ...typography.h2,
    color: colors.black,
  },
  placeholder: {
    width: 24,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  searchPlaceholder: {
    color: colors.gray,
    fontSize: 14,
  },
  content: {
    flex: 1,
  },
  banner: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 140,
  },
  bannerContent: {
    flex: 1,
  },
  bannerTitle: {
    ...typography.h1,
    color: colors.white,
    marginBottom: spacing.sm,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.white,
    opacity: 0.9,
  },
  bannerIcon: {
    marginLeft: spacing.md,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceName: {
    ...typography.caption,
    color: colors.textDark,
    textAlign: 'center',
  },
});

