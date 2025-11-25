import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { ReactNode } from 'react';

interface TabItem {
    label: string | ReactNode;
    content: ReactNode;
}

interface TabsProps {
    tabs: TabItem[];
    variant?: 'underline' | 'pills';
    defaultIndex?: number;
}

export function Tabs({ tabs, variant = 'underline', defaultIndex = 0 }: TabsProps) {
    const tabClasses = variant === 'underline'
        ? "py-4 px-1 -mb-px border-b-2 font-medium text-sm transition-colors outline-hidden border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 data-selected:border-blue-600 data-selected:text-blue-600"
        : "px-4 py-2 font-medium text-sm rounded-t-lg transition-colors outline-hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 data-selected:bg-blue-600 data-selected:text-white";

    const tabListClasses = variant === 'underline'
        ? "flex space-x-8 border-b border-gray-200"
        : "flex items-center space-x-2 border-b border-gray-200";

    return (
        <TabGroup defaultIndex={defaultIndex}>
            <TabList className={tabListClasses}>
                {tabs.map((tab, index) => (
                    <Tab key={index} className={tabClasses}>
                        {tab.label}
                    </Tab>
                ))}
            </TabList>

            <TabPanels className="mt-6">
                {tabs.map((tab, index) => (
                    <TabPanel key={index}>
                        {tab.content}
                    </TabPanel>
                ))}
            </TabPanels>
        </TabGroup>
    );
}

