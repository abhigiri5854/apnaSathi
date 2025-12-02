import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const otpInputRefs = useRef([]);

  const generateOTP = () => {
    // Generate a random 6-digit OTP
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOTP = () => {
    if (phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }
    
    // Generate and store OTP (in production, this would be sent via SMS)
    const generatedOTP = generateOTP();
    console.log('Generated OTP:', generatedOTP); // For testing purposes
    
    setOtpSent(true);
    setShowOtp(true);
    Alert.alert('OTP Sent', `OTP has been sent to ${phoneNumber}`);
  };

  const handleOtpChange = (value, index) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      Alert.alert('Error', 'Please enter complete OTP');
      return;
    }
    
    // In production, verify OTP with backend
    Alert.alert('Success', 'Login successful!', [
      {
        text: 'OK',
        onPress: () => navigation.replace('HomeTabs'),
      },
    ]);
  };

  const formatPhoneNumber = (text) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    // Format as XXXX XXXX
    if (limited.length > 5) {
      return `${limited.slice(0, 5)} ${limited.slice(5)}`;
    }
    return limited;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        {/* Status Bar */}
        <View style={styles.statusBar}>
          <Text style={styles.time}>4:30</Text>
          <View style={styles.statusIcons}>
            <Ionicons name="signal" size={16} color={colors.textDark} />
            <Ionicons name="battery-full" size={16} color={colors.textDark} />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Login or Sign Up</Text>
          <Text style={styles.instruction}>Enter your phone number to get started</Text>

          {/* Phone Number Input */}
          <View style={styles.phoneContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <TextInput
              style={styles.phoneInput}
              placeholder="88888 88888"
              placeholderTextColor={colors.gray}
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(formatPhoneNumber(text))}
              maxLength={11} // 5 digits + space + 5 digits
              editable={!otpSent}
            />
          </View>

          {/* OTP Section */}
          {showOtp && (
            <View style={styles.otpSection}>
              <Text style={styles.otpTitle}>Enter OTP</Text>
              <Text style={styles.otpInstruction}>
                A 6-digit code sent to {phoneNumber.replace(/\s/g, '')}
              </Text>
              
              <View style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <TextInput
                    key={index}
                    ref={(ref) => (otpInputRefs.current[index] = ref)}
                    style={styles.otpInput}
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onKeyPress={(e) => handleOtpKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    selectTextOnFocus
                  />
                ))}
              </View>

              <TouchableOpacity
                style={styles.resendButton}
                onPress={() => {
                  handleSendOTP();
                  setOtp(['', '', '', '', '', '']);
                }}
              >
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity
            style={[
              styles.actionButton,
              (!phoneNumber || phoneNumber.length < 10) && styles.actionButtonDisabled,
            ]}
            onPress={showOtp ? handleVerify : handleSendOTP}
            disabled={!phoneNumber || phoneNumber.length < 10}
          >
            <Text style={styles.actionButtonText}>
              {showOtp ? 'Verify' : 'Send OTP'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightCream,
  },
  keyboardView: {
    flex: 1,
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
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography.h1,
    fontSize: 28,
    color: colors.textDark,
    marginBottom: spacing.sm,
  },
  instruction: {
    ...typography.body,
    color: colors.textDark,
    marginBottom: spacing.xl,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  countryCode: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRightWidth: 0,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: colors.white,
  },
  countryCodeText: {
    ...typography.body,
    color: colors.textDark,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    backgroundColor: colors.white,
    ...typography.body,
    color: colors.textDark,
  },
  otpSection: {
    marginTop: spacing.xl,
  },
  otpTitle: {
    ...typography.h3,
    color: colors.textDark,
    marginBottom: spacing.xs,
  },
  otpInstruction: {
    ...typography.caption,
    color: colors.textDark,
    marginBottom: spacing.md,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textDark,
    backgroundColor: colors.white,
  },
  resendButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  resendText: {
    ...typography.caption,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  actionButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  actionButtonDisabled: {
    backgroundColor: colors.gray,
    opacity: 0.5,
  },
  actionButtonText: {
    ...typography.h3,
    color: colors.white,
  },
});

