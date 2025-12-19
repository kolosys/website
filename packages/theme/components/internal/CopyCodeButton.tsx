"use client";

import { cn } from '../../tools';
import { useState } from 'react';
import { Button } from '../Button';
import { Icon } from '../Icon';

type CopyCodeButtonProps = {
  code: string;
}

export function CopyCodeButton({ code }: CopyCodeButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      className={cn(copied ? 'text-green-400' : 'text-gray-200 hover:text-gray-800')}
      size="sm"
      aria-label={copied ? 'Copied!' : 'Copy code'}
      title={copied ? 'Copied!' : 'Copy code'}
    >
      <Icon name={copied ? "check" : "copy"} size='xs' className='h-4 w-4' />
      <span>{copied ? "Copied!" : "Copy"}</span>
    </Button>
  );
}
