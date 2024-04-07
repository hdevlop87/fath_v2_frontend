import React from 'react';
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Icon } from '@iconify/react';
import { useSpring, animated } from '@react-spring/web';

interface SubmitButtonProps {
  loading: boolean;
  className?: string;
  onClick?: () => void;
  submitText?: string;
  form?: string
  loadingText: string;
  collapsed?: boolean;
  variant?:any
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading = false,
  className,
  onClick,
  submitText,
  loadingText,
  form,
  collapsed,
  variant
}) => {



  const style = useSpring({
    opacity: collapsed ? 0 : 1,
    config: { tension: 210, friction: 20 }
  });

  return (
    <Button form={form} onClick={onClick} type="submit" className={`flex ${className} `} variant={variant} disabled={loading}>
      {
        loading ?
          <>
            <ReloadIcon className="mr-2 h-5 w-5 animate-spin flex-shrink-0" />
            {!collapsed && loadingText}
          </> :
          <>
            <Icon icon='entypo:login' width={20} className='mr-1 flex-shrink-0' />

            <animated.p style={style}>
              {submitText}
            </animated.p>
          </>
      }
    </Button>
  );
};

export default SubmitButton;
