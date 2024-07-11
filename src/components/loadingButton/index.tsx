import React from 'react';
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icon } from '@iconify/react';
import { useSpring, animated } from '@react-spring/web';

interface LoadingButtonProps {
  loading: boolean;
  className?: string;
  onClick?: () => void;
  submitText?: string;
  form?: string;
  loadingText: string;
  collapsed?: boolean;
  variant?: any;
  Licon?: string;
  disabled?: boolean; // Add disabled prop
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading = false,
  className,
  onClick,
  submitText,
  loadingText,
  form,
  collapsed,
  variant,
  Licon,
  disabled = false, // Default value for disabled prop
}) => {
  const style = useSpring({
    opacity: collapsed ? 0 : 1,
    config: { tension: 210, friction: 20 }
  });

  return (
    <Button
      form={form}
      onClick={onClick}
      type="submit"
      className={`flex ${className}`}
      variant={variant}
      disabled={loading || disabled} // Disable button if loading or disabled is true
    >
      {loading ? (
        <>
          <ReloadIcon className="mr-2 h-5 w-5 animate-spin flex-shrink-0" />
          {!collapsed && loadingText}
        </>
      ) : (
        <>
          <Icon icon={Licon || 'entypo:login'} width={20} className='mr-1 flex-shrink-0' />
          <animated.p style={style}>
            {submitText}
          </animated.p>
        </>
      )}
    </Button>
  );
};

export default LoadingButton;
