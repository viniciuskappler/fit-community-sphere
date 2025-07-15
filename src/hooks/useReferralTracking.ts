// Mock hook for referral tracking (simplified)
import { useState } from 'react';

interface ReferralCode {
  id: string;
  code: string;
  type: string;
}

interface Conversion {
  id: string;
  conversion_type: string;
  commission_status: string;
  created_at: string;
  referral_code: ReferralCode;
}

export const useReferralTracking = () => {
  const [referralCodes] = useState<ReferralCode[]>([]);
  const [conversions] = useState<Conversion[]>([]);
  const [loading] = useState(false);

  const generateReferralCode = async (type: string) => {
    return { error: null };
  };

  const getTotalCommissions = () => 0;
  const getPaidCommissions = () => 0;
  const getPendingCommissions = () => 0;

  return {
    referralCodes,
    conversions,
    loading,
    generateReferralCode,
    getTotalCommissions,
    getPaidCommissions,
    getPendingCommissions
  };
};