import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  children?: ReactNode;
  showIcon?: boolean;
}

export default function Tooltip({ content, children, showIcon = false }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delayDuration={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <span className="inline-flex items-center gap-1 cursor-help">
            {children}
          </span>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={5}
            className="z-50 overflow-hidden rounded-xl bg-text-dark px-4 py-2 text-xs text-white shadow-xl animate-in fade-in zoom-in-95 duration-200 max-w-[250px] leading-relaxed"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-text-dark" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
