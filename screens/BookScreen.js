import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

const workers = [
  {
    id: 1,
    name: 'Suresh Kumar',
    service: 'Electrician',
    experience: '4.4 years',
    reviews: 328,
    verified: true,
    badgeColor: colors.primary,
    image: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 2,
    name: 'Jason Pravati',
    service: 'General',
    price: '₹248/visit',
    reviews: 328,
    verified: true,
    badgeColor: colors.darkBlue,
    image: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 3,
    name: 'Sunita Devi',
    service: 'Cook',
    price: '₹149 per visit',
    verified: true,
    badgeColor: colors.primary,
    image: 'https://i.pravatar.cc/150?img=47',
  },
];

export default function BookScreen({ navigation, route }) {
  const [activeFilter, setActiveFilter] = useState('Today');
  const selectedService = route?.params?.service || 'Cook';

  const filters = ['Today', 'Experience', 'Price Range'];

  const handleWorkerPress = (worker) => {
    navigation.navigate('Profile', { worker });
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Book</Text>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.gray} />
          <Text style={styles.searchPlaceholder}>
            Search for Cook. Maid Electrician..
          </Text>
          <Ionicons name="options" size={20} color={colors.gray} style={styles.filterIcon} />
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterTab,
                activeFilter === filter && styles.filterTabActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Worker Listings */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {workers.map((worker) => (
          <TouchableOpacity
            key={worker.id}
            style={styles.workerCard}
            onPress={() => handleWorkerPress(worker)}
          >
            <Image source={{ uri: worker.image }} style={styles.workerImage} />
            <View style={styles.workerInfo}>
              <View style={styles.workerHeader}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <View
                  style={[
                    styles.verifiedBadge,
                    { backgroundColor: worker.badgeColor },
                  ]}
                >
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              </View>
              {worker.service && (
                <Text style={styles.workerService}>{worker.service}</Text>
              )}
              {worker.experience && (
                <Text style={styles.workerDetails}>
                  {worker.experience} • {worker.reviews} reviews
                </Text>
              )}
              {worker.price && (
                <Text style={styles.workerPrice}>{worker.price}</Text>
              )}
              {!worker.experience && worker.reviews && (
                <Text style={styles.workerDetails}>{worker.reviews} reviews</Text>
              )}
            </View>
            <TouchableOpacity
              style={[
                styles.bookButton,
                { backgroundColor: worker.badgeColor },
              ]}
              onPress={() => handleWorkerPress(worker)}
            >
              <Text style={styles.bookButtonText}>Book</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
  title: {
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
    flex: 1,
    color: colors.gray,
    fontSize: 14,
  },
  filterIcon: {
    marginLeft: 'auto',
  },
  filterContainer: {
    flexDirection: 'row',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
  },
  filterTabActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    ...typography.caption,
    color: colors.textDark,
  },
  filterTextActive: {
    color: colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  workerCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.md,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: spacing.md,
  },
  workerInfo: {
    flex: 1,
  },
  workerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    flexWrap: 'wrap',
  },
  workerName: {
    ...typography.h3,
    color: colors.textDark,
    marginRight: spacing.sm,
  },
  verifiedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  workerService: {
    ...typography.body,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  workerDetails: {
    ...typography.caption,
    color: colors.textLight,
    marginBottom: spacing.xs,
  },
  workerPrice: {
    ...typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  bookButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    justifyContent: 'center',
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  bookButtonText: {
    ...typography.body,
    color: colors.white,
    fontWeight: '600',
  },
});

