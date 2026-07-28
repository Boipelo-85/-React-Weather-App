import { useState } from 'react';
import { Text } from '../Text/Text';

interface ForecastTabsProps {
  onTabChange: (tab: string) => void;
}

export const ForecastTabs = ({ onTabChange }: ForecastTabsProps) => {
  const [activeTab, setActiveTab] = useState('hourly');

  const tabs = ['Hourly', 'Daily', 'Weekly'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className='forecast-tabs'>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`forecast-tab ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
          onClick={() => handleTabClick(tab.toLowerCase())}
        >
          <Text variant={'span'}>{tab}</Text>
        </button>
      ))}
    </div>
  );
};
