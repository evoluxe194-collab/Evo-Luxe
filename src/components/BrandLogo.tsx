import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStar?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showStar = true,
  className = '',
  onClick,
}) => {
  // Color combinations
  const colors = {
    dark: {
      star: '#C9A45C',
      nine: '#063B2B',
      by: '#786851',
      evoluxe: '#17140F',
    },
    light: {
      star: '#C9A45C',
      nine: '#FAF7F2',
      by: '#D8CDBD',
      evoluxe: '#F5EFE4',
    },
    gold: {
      star: '#DFBF7A',
      nine: '#C9A45C',
      by: '#DFBF7A',
      evoluxe: '#C9A45C',
    },
    monochrome: {
      star: 'currentColor',
      nine: 'currentColor',
      by: 'currentColor',
      evoluxe: 'currentColor',
    },
  }[variant];

  // Size scalers
  const scales = {
    sm: {
      starSize: 10,
      nineText: 'text-xl tracking-[0.18em]',
      byText: 'text-[11px] -mx-1',
      evoluxeText: 'text-[7px] tracking-[0.38em]',
      gap: 'gap-0.5',
    },
    md: {
      starSize: 13,
      nineText: 'text-2xl sm:text-[28px] tracking-[0.22em]',
      byText: 'text-[13px] -mx-1',
      evoluxeText: 'text-[8.5px] sm:text-[9.5px] tracking-[0.42em]',
      gap: 'gap-0.5',
    },
    lg: {
      starSize: 18,
      nineText: 'text-3xl sm:text-4xl tracking-[0.24em]',
      byText: 'text-base -mx-1',
      evoluxeText: 'text-[10.5px] sm:text-xs tracking-[0.46em]',
      gap: 'gap-1',
    },
    xl: {
      starSize: 24,
      nineText: 'text-5xl sm:text-6xl tracking-[0.26em]',
      byText: 'text-xl -mx-1.5',
      evoluxeText: 'text-sm sm:text-base tracking-[0.52em]',
      gap: 'gap-1.5',
    },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex flex-col items-center justify-center select-none text-center ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
      role="banner"
      aria-label="NINE by EVOLUXE Logo"
    >
      {/* Four-point diamond / star symbol */}
      {showStar && (
        <svg
          width={scales.starSize}
          height={scales.starSize}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mb-1 transition-transform duration-500 ease-out group-hover:scale-110"
          aria-hidden="true"
        >
          {/* Architectural four-point diamond star */}
          <path
            d="M12 0L14.2 9.8L24 12L14.2 14.2L12 24L9.8 14.2L0 12L9.8 9.8L12 0Z"
            fill={colors.star}
          />
          <circle cx="12" cy="12" r="1.5" fill="#FAF7F2" opacity="0.6" />
        </svg>
      )}

      {/* Main Lockup: NINE by */}
      <div className="flex items-baseline justify-center leading-none">
        <span
          className={`font-serif font-semibold uppercase ${scales.nineText} transition-colors duration-300`}
          style={{ color: colors.nine }}
        >
          NINE
        </span>
        <span
          className={`font-script italic lowercase font-normal ${scales.byText} opacity-85 px-1`}
          style={{ color: colors.by }}
        >
          by
        </span>
      </div>

      {/* Sub-lockup: EVOLUXE */}
      <div
        className={`font-sans font-medium uppercase mt-0.5 leading-none pl-1 ${scales.evoluxeText} transition-opacity duration-300 opacity-90`}
        style={{ color: colors.evoluxe }}
      >
        EVOLUXE
      </div>
    </div>
  );
};
