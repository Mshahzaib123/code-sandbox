import React from 'react';
import { ChevronDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
  icon?: LucideIcon;
  description?: string;
}

interface SelectComponentProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  DefaultIcon?: LucideIcon;
  variant?: 'default' | 'gradient' | 'glass';
  size?: 'sm' | 'md' | 'lg';
}

const SelectComponent: React.FC<SelectComponentProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  className = '',
  DefaultIcon: DefaultIcon,
  variant = 'gradient',
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState<SelectOption | undefined>(
    options.find((opt) => opt.value === value)
  );

  const handleSelect = (optionValue: string) => {
    const selected = options.find((opt) => opt.value === optionValue);
    if (selected) {
      setSelectedOption(selected);
      onChange?.(optionValue);
    }
    setIsOpen(false);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-linear-to-r from-blue-800 to-blue-500 border-primary/20 text-primary-foreground shadow-glow';
      case 'glass':
        return 'bg-background/10 backdrop-blur-xl border-border/50 text-foreground';
      default:
        return 'bg-card border-border text-card-foreground';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-5 py-3 text-sm';
      case 'lg':
        return 'px-5 py-4 text-lg';
      default:
        return 'px-5 py-3 text-base';
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        className={`
          relative w-full flex items-center justify-between gap-3
          ${getSizeClasses()}
          ${getVariantClasses()}
          rounded-xl border font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-all duration-300 ease-smooth
          group
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 flex-1">
          {selectedOption?.icon ? (
            <selectedOption.icon className="w-6 h-6 opacity-70 transition-opacity duration-200" />
          ) : DefaultIcon ? (
            <DefaultIcon className="w-6 h-6 opacity-70 transition-opacity duration-200" />
          ) : ""}
          <div className="flex flex-col items-start">
            <span className={selectedOption ? 'font-semibold' : 'opacity-60'}>
              {selectedOption?.label || placeholder}
            </span>
            {selectedOption?.description && (
              <span className="text-sm opacity-60 font-normal">
                {selectedOption.description}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-6 h-6 transition-transform duration-300 opacity-70 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute z-20 w-full mt-2 bg-popover/95 backdrop-blur-xl border border-border rounded-xl shadow-elegant overflow-hidden animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="max-h-80 overflow-y-auto">
              {options.map((option, index) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`
                      relative w-full flex items-center gap-3 px-5 py-3 text-left
                      text-popover-foreground hover:bg-white/10
                      focus:outline-none focus:bg-white/10
                      transition-colors duration-200
                      ${index === 0 ? 'rounded-t-xl' : ''}
                      ${index === options.length - 1 ? 'rounded-b-xl' : ''}
                      ${selectedOption?.value === option.value ? 'bg-white/10' : ''}
                    `}
                    onClick={() => handleSelect(option.value)}
                  >
                    {OptionIcon && (
                      <OptionIcon className="w-5 h-5 opacity-70" />
                    )}
                    <div className="flex flex-col">
                      <span className="font-medium">{option.label}</span>
                      {option.description && (
                        <span className="text-sm opacity-60">{option.description}</span>
                      )}
                    </div>
                    {selectedOption?.value === option.value && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectComponent;