'use client'

import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import React, { useState } from 'react';
import About from './About';
import Personalisation from './Personalisation';
import SettingsForm from '@/components/Forms/SettingsForm';
import useFetchSettings from '@/hooks/subdivision/useFetchSettings';


export default function Settings() {

  const { settings } = useFetchSettings()

  return (
    <div className='px-4 flex flex-col gap-4 w-full'>
      <Label className='text-md'>Basic Details</Label>
      <Card className='flex flex-wrap gap-6 p-6'>
        <SettingsForm settings={settings} />
      </Card>
      <Personalisation />
      <About />
    </div>
  );
}
