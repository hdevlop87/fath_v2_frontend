'use client'

import Lotissement from "./Lotissement";
import Footer from "./Footer";
import Header from "./Header";
import HeroSection from "./HeroSection";
import Description from './Description'
import Apercu from './Apercu'
import { Separator } from "@/components/ui/separator"
import Address from "./Address";

export default function Root() {
    return (
        <div className="flex h-screen max-w-screen-2xl flex-col gap-6 mx-auto px-6 sm:px-8 lg:px-20 overflow-scroll">
            <Header />
            <HeroSection />
            <Separator orientation="horizontal" className="h-[2px]"/>
            <Lotissement />
            <Separator orientation="horizontal" className="h-[2px]"/>
            <Apercu/>
            <Separator orientation="horizontal" className="h-[2px]"/>
            <Description />
            <Separator orientation="horizontal" className="h-[2px]"/>
            <Address />
        </div>
    );
}