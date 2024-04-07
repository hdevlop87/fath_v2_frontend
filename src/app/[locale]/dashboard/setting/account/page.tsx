import { Separator } from "@/components/ui/separator"
import Setting_profile from '@/components/Forms/setting_profile'

export default function SettingsProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Profil</h3>
                <p className="text-sm text-muted-foreground">
                    Configurez votre profil et mettez à jour vos infos personnelles.
                </p>
            </div>
            <Separator />
            <Setting_profile />
        </div>
    )
}