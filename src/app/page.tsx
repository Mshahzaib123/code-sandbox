'use client';

import React, { useState } from "react";
import SelectComponent from "@/components/select-component";
import { User, Settings, Bell, Heart, Star, Shield, Zap} from 'lucide-react';


const basicOptions = [
  { value: 'option1', label: 'Option 1', icon: Star },
  { value: 'option2', label: 'Option 2', icon: Heart },
  { value: 'option3', label: 'Option 3', icon: Bell },
];

const advancedOptions = [
  { 
    value: 'user', 
    label: 'User Management', 
    icon: User,
    description: 'Manage user accounts and permissions'
  },
  { 
    value: 'settings', 
    label: 'System Settings', 
    icon: Settings,
    description: 'Configure system preferences'
  },
  { 
    value: 'security', 
    label: 'Security Center', 
    icon: Shield,
    description: 'Monitor and control security features'
  },
  { 
    value: 'performance', 
    label: 'Performance Analytics', 
    icon: Zap,
    description: 'View performance metrics and insights'
  },
];

const designOptions = [
  { 
    value: 'themes', 
    label: 'Theme Customization',
  },
  { 
    value: 'components', 
    label: 'Component Library',
  },
  { 
    value: 'global', 
    label: 'Global Settings',
  },
];

export default function Home() {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [selectedValue2, setSelectedValue2] = useState<string>('');
  const [selectedValue3, setSelectedValue3] = useState<string>('');
  return (
    <main className="h-screen flex items-center justify-center">
      <div className="space-y-6">
        {/* Gradient Variant */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Gradient Variant</h2>
          <SelectComponent
            options={basicOptions}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Choose your favorite..."
            DefaultIcon={Star}
            variant="gradient"
            size="lg"
            className="max-w-md"
          />
        </div>

        {/* Glass Variant */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Glass Variant</h2>
          <SelectComponent
            options={advancedOptions}
            value={selectedValue2}
            onChange={setSelectedValue2}
            placeholder="Select a management option..."
            DefaultIcon={Settings}
            variant="glass"
            size="md"
            className="max-w-lg"
          />
        </div>

        {/* Default Variant */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">Default Variant</h2>
          <SelectComponent
            options={designOptions}
            value={selectedValue3}
            onChange={setSelectedValue3}
            placeholder="Pick a design tool..."
            variant="default"
            size="sm"
            className="max-w-sm"
          />
        </div>
      </div>
    </main>
  );
}
