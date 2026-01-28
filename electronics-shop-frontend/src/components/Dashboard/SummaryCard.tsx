import React from 'react';

interface SummaryCardProps {
  icon: string;
  title: string;
  value: string | number;
  subtitle?: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  color = 'blue',
}) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
  };

  return (
    <div className="summary-card">
      <div className={`card-icon-wrapper ${colorClasses[color]}`}>
        <span className="card-icon">{icon}</span>
      </div>
      <div className="card-content">
        <p className="card-title">{title}</p>
        <h3 className="card-value">{value}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};
