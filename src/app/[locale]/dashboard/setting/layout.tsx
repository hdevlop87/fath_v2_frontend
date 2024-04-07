import { Separator } from "@/components/ui/separator"
import { SidebarNav } from "./sidebar-nav"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "Profil",
        href: "/dashboard/setting",
    },
    {
        title: "Compte",
        href: "/dashboard/setting/account",
    },
    {
        title: "Base de données",
        href: "/dashboard/setting/database",
    }
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    return (

        <div className="block  space-y-6 p-10 pb-16 w-full">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold tracking-tight">Paramètres</h2>
                <p className="text-muted-foreground">
                    Gérez les paramètres de votre compte et configurez vos préférences.
                </p>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <SidebarNav items={sidebarNavItems} />
                </aside>
                <div className="flex-1 lg:max-w-2xl">{children}</div>
            </div>
        </div>

    )
}