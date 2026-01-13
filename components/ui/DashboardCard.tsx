
import React from 'react';

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ 
  children, 
  className = "", 
  bgColor = "bg-white" 
}) => {
  return (
    <div className={`${bgColor} rounded-[32px] p-6 shadow-sm border border-gray-100 ${className}`}>
      {children}
    </div>
  );
};

export default DashboardCard;
