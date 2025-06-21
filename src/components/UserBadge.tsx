
import React from 'react';

interface UserBadgeProps {
  isBetaTester?: boolean;
  promoCode?: string;
  className?: string;
}

const UserBadge = ({ isBetaTester, promoCode, className = '' }: UserBadgeProps) => {
  if (isBetaTester) {
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 ${className}`}>
        🧪 Beta Tester
      </span>
    );
  }

  if (promoCode === 'SQUAD300') {
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-100 to-orange-100 text-red-800 ${className}`}>
        🏆 SQUAD 300
      </span>
    );
  }

  return null;
};

export default UserBadge;
