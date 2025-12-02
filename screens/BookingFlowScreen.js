import React, { useState } from 'react';
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

const paymentMethods = ['UPI', 'Paytm', 'Debit Card', 'Cash'];

export default function BookingFlowScreen({ navigation, route }) {
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const worker = route?.params?.worker || { name: 'Sunita Devi', service: 'Cleaner' };

  const handleConfirm = () => {
    // Handle booking confirmation
    alert('Booking confirmed!');
    navigation.navigate('HomeTabs');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.statusBar}>
          <Text style={styles.time}>4:41</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="signal" size={16} color={colors.white} />
            <Ionicons name="battery-full" size={16} color={colors.white} />
          </View>
        </View>
        
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Confirm & Pay</Text>
          <View style={styles.placeholder} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service</Text>
          <View style={styles.serviceCard}>
            <View style={styles.serviceIcon}>
              <Ionicons name="brush" size={24} color={colors.primary} />
            </View>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{worker.service || 'Cleaner'}</Text>
              <Text style={styles.serviceTime}>Today, 3:00 PM - 5:00 PM</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </View>
        </View>

        {/* Price Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Total</Text>
            <Text style={styles.priceAmount}>₹800</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment methods</Text>
          <View style={styles.paymentContainer}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method}
                style={[
                  styles.paymentMethod,
                  selectedPayment === method && styles.paymentMethodActive,
                ]}
                onPress={() => setSelectedPayment(method)}
              >
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedPayment === method && styles.paymentMethodTextActive,
                  ]}
                >
                  {method}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Apply Coupon */}
        <TouchableOpacity style={styles.couponSection}>
          <Text style={styles.couponText}>Apply Coupon</Text>
          <Ionicons name="chevron-forward" size={20} color={colors.gray} />
        </TouchableOpacity>
      </ScrollView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
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
    color: colors.white,
  },
  statusIcons: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  title: {
    ...typography.h2,
    color: colors.white,
  },
  placeholder: {
    width: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.md,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    ...typography.h3,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  serviceTime: {
    ...typography.caption,
    color: colors.textLight,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.md,
  },
  priceLabel: {
    ...typography.body,
    color: colors.textDark,
  },
  priceAmount: {
    ...typography.h2,
    color: colors.primary,
  },
  paymentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  paymentMethod: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.lightGray,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  paymentMethodActive: {
    borderColor: colors.primary,
    backgroundColor: colors.white,
  },
  paymentMethodText: {
    ...typography.body,
    color: colors.textDark,
  },
  paymentMethodTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  couponSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  couponText: {
    ...typography.body,
    color: colors.textDark,
  },
  footer: {
    padding: spacing.md,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonText: {
    ...typography.h3,
    color: colors.white,
  },
});

