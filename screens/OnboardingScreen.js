import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen({ navigation }) {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: 'Welcome to GharSaathi',
      subtitle: 'Hire expert professionals for your household needs',
      illustration: 'construct',
      description: 'Find trusted workers for all your home service needs',
    },
    {
      title: 'Hire Verified Workers',
      subtitle: 'Choose from Various Services',
      services: [
        { name: 'Cooker', icon: 'restaurant' },
        { name: 'Cleaner', icon: 'brush' },
        { name: 'Electrician', icon: 'flash' },
      ],
      features: [
        { text: 'Book at Your Convenience', icon: 'calendar' },
      ],
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      navigation.replace('Login');
    }
  };

  const handleSkip = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>4:30</Text>
        <View style={styles.statusIcons}>
          <Ionicons name="signal" size={16} color={colors.textDark} />
          <Ionicons name="battery-full" size={16} color={colors.textDark} />
        </View>
      </View>

      <View style={styles.pageContainer}>
        {/* Page 1: Welcome */}
        {currentPage === 0 && (
          <View style={styles.page}>
            <Text style={styles.title}>{onboardingData[0].title}</Text>
            <Text style={styles.subtitle}>{onboardingData[0].subtitle}</Text>
            
            <View style={styles.illustrationContainer}>
              <View style={styles.illustrationCircle}>
                <Ionicons name={onboardingData[0].illustration} size={120} color={colors.primary} />
              </View>
            </View>
          </View>
        )}

        {/* Page 2: Services */}
        {currentPage === 1 && (
          <View style={styles.page}>
            <Text style={styles.title}>{onboardingData[1].title}</Text>
            <Text style={styles.subtitle}>{onboardingData[1].subtitle}</Text>
            
            <View style={styles.servicesContainer}>
              <View style={styles.mainServiceCard}>
                <View style={styles.mainServiceIcon}>
                  <Ionicons name="person" size={40} color={colors.primary} />
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={24} color={colors.green} />
                  </View>
                </View>
              </View>
              
              <View style={styles.serviceRow}>
                {onboardingData[1].services.map((service, index) => (
                  <View key={index} style={styles.serviceCard}>
                    <View style={styles.serviceIcon}>
                      <Ionicons name={service.icon} size={32} color={colors.darkBlue} />
                    </View>
                    <Text style={styles.serviceName}>{service.name}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={onboardingData[1].features[0].icon} size={32} color={colors.darkBlue} />
                </View>
                <Text style={styles.featureText}>{onboardingData[1].features[0].text}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentPage === index && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        {currentPage < onboardingData.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
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
  pageContainer: {
    flex: 1,
  },
  page: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    flex: 1,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    fontSize: 16,
    color: colors.textDark,
    marginBottom: spacing.xl,
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  illustrationCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  servicesContainer: {
    flex: 1,
    marginTop: spacing.lg,
  },
  mainServiceCard: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  mainServiceIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  checkmark: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  serviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
  },
  serviceCard: {
    alignItems: 'center',
  },
  serviceIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  serviceName: {
    ...typography.caption,
    color: colors.textDark,
    textAlign: 'center',
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureText: {
    ...typography.body,
    color: colors.textDark,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray,
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.textDark,
  },
  buttonContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  nextButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    ...typography.h3,
    color: colors.white,
  },
});

