import React, { useState } from 'react';
import { Music4, Video, Palette, Plus, SquarePlay, ListMusic, Paintbrush } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';


const Personalisation = () => {

   const [theme, setThemeState] = useState('Dark');
   const [accentColor, setAccentColorState] = useState('Orange');

   const handleThemeChange = async (newTheme) => {
      setThemeState(newTheme);
   };

   const handleAccentColorChange = async (color) => {
      setAccentColorState(color);
   };

   const accenstColors = [
      { color: 'Purple', bg: 'bg-purple-600' },
      { color: 'Orange', bg: 'bg-orange-600' },
      { color: 'Red', bg: 'bg-red-600' },
      { color: 'Yellow', bg: 'bg-yellow-600' },
      { color: 'Blue', bg: 'bg-blue-600' }
   ];

   return (
      <>
         <Label className='text-md'>Personalisation</Label>
         <Card className='flex flex-col gap-6 p-6'>
            <div className="flex w-full gap-2 items-center space-x-2">
               <Palette className="h-8 w-8" />
               <Label>App theme</Label>
               <div className='flex gap-2 items-center'>
                  <Checkbox id="Light" className='w-5 h-5 border-[3px]' checked={theme === 'Light'} onChange={() => handleThemeChange('Light')} />
                  <Label className="text-sm font-medium">Light</Label>
               </div>
               <div className='flex gap-2 items-center'>
                  <Checkbox id="Dark" className='w-5 h-5 border-[3px]' checked={theme === 'Dark'} onChange={() => handleThemeChange('Dark')} />
                  <Label className="text-sm font-medium">Dark</Label>
               </div>
               <div className='flex gap-2 items-center'>
                  <Checkbox id="System" className='w-5 h-5 border-[3px]' checked={theme === 'System'} onChange={() => handleThemeChange('System')} />
                  <Label className="text-sm font-medium">Use system Setting</Label>
               </div>
            </div>
            <div className="flex w-full gap-2 items-center space-x-2">
               <Paintbrush className="h-8 w-8" />
               <Label>Accents Colour</Label>
               {accenstColors.map(({ color, bg }) => (
                  <Button key={color} variant="outline" className={`h-10 w-28 rounded-md ${accentColor === color ? 'border-[3px] border-current' : ''}`} onClick={() => handleAccentColorChange(color)}>
                     <span className={`mr-1 flex h-5 w-5 shrink-0 -translate-x-1 items-center justify-center rounded-full ${bg}`}></span>{color}
                  </Button>
               ))}
            </div>
         </Card>
      </>
   )
}

export default Personalisation