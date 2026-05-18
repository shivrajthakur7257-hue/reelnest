'use client';

import { Toaster as Sonner } from 'sonner';

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-[#1a1a2e] group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-400',
          actionButton:
            'group-[.toast]:bg-gradient-to-r group-[.toast]:from-red-500 group-[.toast]:to-purple-600 group-[.toast]:text-white',
          cancelButton:
            'group-[.toast]:bg-white/5 group-[.toast]:text-gray-400',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
