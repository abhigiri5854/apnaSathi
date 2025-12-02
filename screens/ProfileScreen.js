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

const skills = ['North Indian', 'South Indian food', 'Chinese cooking', 'Baking'];

const availability = [
  { day: 'Tu', date: '14' },
  { day: 'We', date: '5' },
  { day: 'Tu', date: '14' },
  { day: 'Fr', date: '16' },
  { day: 'Su', date: '19' },
  { day: 'Su', date: '19' },
];

export default function ProfileScreen({ navigation, route }) {
  const [selectedDate, setSelectedDate] = useState('14');
  const worker = route?.params?.worker || {
    name: 'Sunita Devi',
    image: 'https://i.pravatar.cc/150?img=47',
    verified: true,
    rating: 4,
    reviews: 29,
    projects: 63,
  };

  const handleBook = () => {
    navigation.navigate('BookingFlow', { worker });
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
          <Text style={styles.title}>Profile</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.profileSection}>
          <Image source={{ uri: worker.image }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.profileName}>{worker.name}</Text>
              <View style={styles.verifiedBadge}>
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            </View>
            <View style={styles.verifiedCheck}>
              <Ionicons name="checkmark-circle" size={20} color={colors.green} />
              <Text style={styles.verifiedLabel}>Verified</Text>
            </View>
          </View>
        </View>

        {/* Rating */}
        <View style={styles.ratingSection}>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name={star <= worker.rating ? 'star' : 'star-outline'}
                size={20}
                color={colors.primary}
              />
            ))}
          </View>
          <Text style={styles.reviewText}>
            {worker.reviews} reviews • {worker.projects} projects
          </Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Verification & Language */}
        <View style={styles.section}>
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.green} />
            <Text style={styles.checkText}>Police verified</Text>
          </View>
          <View style={styles.checkRow}>
            <Ionicons name="checkmark-circle" size={20} color={colors.green} />
            <Text style={styles.checkText}>Hindi</Text>
          </View>
        </View>

        {/* Availability */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Availability</Text>
          <View style={styles.availabilityContainer}>
            {availability.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.availabilityItem,
                  selectedDate === item.date && styles.availabilityItemActive,
                ]}
                onPress={() => setSelectedDate(item.date)}
              >
                <Text
                  style={[
                    styles.availabilityDay,
                    selectedDate === item.date && styles.availabilityDayActive,
                  ]}
                >
                  {item.day}
                </Text>
                <Text
                  style={[
                    styles.availabilityDate,
                    selectedDate === item.date && styles.availabilityDateActive,
                  ]}
                >
                  {item.date}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Book Button */}
        <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  profileInfo: {
    alignItems: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  profileName: {
    ...typography.h1,
    color: colors.textDark,
    marginRight: spacing.sm,
  },
  verifiedBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 12,
  },
  verifiedText: {
    ...typography.small,
    color: colors.white,
    fontWeight: '600',
  },
  verifiedCheck: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  verifiedLabel: {
    ...typography.caption,
    color: colors.textDark,
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  stars: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  reviewText: {
    ...typography.caption,
    color: colors.textLight,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  skillTag: {
    backgroundColor: colors.lightOrange,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  skillText: {
    ...typography.caption,
    color: colors.white,
  },
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  checkText: {
    ...typography.body,
    color: colors.textDark,
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  availabilityItem: {
    width: 50,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availabilityItemActive: {
    backgroundColor: colors.primary,
  },
  availabilityDay: {
    ...typography.caption,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  availabilityDayActive: {
    color: colors.white,
  },
  availabilityDate: {
    ...typography.body,
    color: colors.textDark,
    fontWeight: '600',
  },
  availabilityDateActive: {
    color: colors.white,
  },
  bookButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  bookButtonText: {
    ...typography.h3,
    color: colors.white,
  },
});

