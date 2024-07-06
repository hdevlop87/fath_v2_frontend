import React from 'react'
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Music4, Video, Palette, Plus, SquarePlay, ListMusic, Paintbrush } from 'lucide-react';

const About = () => {

    return (
        <>
            <Label className='text-md'>About</Label>
            <Card className='flex gap-6 p-6 justify-between'>
                <div className='flex h-full items-center gap-4'>
                    <SquarePlay className='w-9 h-9' />
                    <div className='flex flex-col gap-1'>
                        <Label className="text-md font-medium">Said O Badiss</Label>
                        <Label className="text-sm font-light">@ 2024 Hdevlop Corporation. All rights reserved.</Label>
                    </div>
                </div>
                <div className='flex justify-center items-center h-full'>
                    <Label className="text-md font-light">Version 1.0.0</Label>
                </div>
            </Card>
        </>
    )
}

export default About