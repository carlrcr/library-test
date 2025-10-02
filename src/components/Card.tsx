import React from 'react';
import './Card.module.css'; // CSS personalizado del componente

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = ''
}) => {
  return (
    <div className={`custom-card-gradient custom-card-hover rounded-lg shadow-md p-6 border border-gray-200 ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
          )}
        </div>
      )}
      <div className="text-gray-700">
        {children}
      </div>
    </div>
  );
};