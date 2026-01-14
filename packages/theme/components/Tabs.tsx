import React, { ReactNode } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { cn } from '../tools';

export interface TabItem {
  label: string | ReactNode;
  content: ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  variant?: 'underline' | 'pills';
  defaultIndex?: number;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, variant = 'underline', defaultIndex = 0 }, ref) => {
    const tabClasses =
      variant === 'underline'
        ? 'py-4 px-1 -mb-px border-b-2 font-medium text-sm transition-colors outline-hidden border-transparent text-caption hover:text-body hover:border-border data-selected:border-primary-600 data-selected:text-primary-600'
        : 'px-4 py-2 font-medium text-sm rounded-t-lg transition-colors outline-hidden text-body hover:text-foreground hover:bg-neutral-100 data-selected:bg-primary-600 data-selected:text-white';

    const tabListClasses =
      variant === 'underline'
        ? 'flex space-x-8 border-b border-border'
        : 'flex items-center space-x-2 border-b border-border';

    return (
      <TabGroup defaultIndex={defaultIndex} ref={ref}>
        <TabList className={tabListClasses}>
          {tabs.map((tab, index) => (
            <Tab key={index} className={tabClasses}>
              {tab.label}
            </Tab>
          ))}
        </TabList>

        <TabPanels className="mt-6">
          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    );
  }
);

Tabs.displayName = 'Tabs';
