import { Label } from '@/components/ui/label'
import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Description = () => {
    return (

        <div className='flex flex-col gap-4'>
            <Label className='text-lg'>Déscription</Label>
            <Label className='text-sm font-normal'>
                Le lotissement 'Said OUBADIS' est un projet résidentiel moderne conçu pour offrir un cadre de vie agréable et fonctionnel. Ce développement immobilier propose une diversité d'espaces pour répondre aux besoins variés des futurs résidents. Le lotissement est idéalement placé pour accéder facilement aux commodités locales et aux infrastructures urbaines. L'accent est mis sur la qualité de vie, avec des espaces verts et des aménagements conçus pour promouvoir un environnement sain et convivial. Que vous soyez une famille ou un investisseur, ce lotissement offre une opportunité unique de s'établir dans un quartier bien pensé et accueillant.
            </Label>

            <div className='flex gap-2 justify-center items-center'>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src="./greenLand.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label className='text-sm font-normal'><span className='text-green-500 font-medium'>Espaces verts : </span> 1 950 m² d'espaces verts, offrant un cadre naturel agréable pour les résidents.
                </Label>
            </div>

            <div className='flex gap-2 justify-center items-center'>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src="./parking.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label className='text-sm font-normal'><span className='text-blue-500 font-medium'>Parking : </span>572 m² de parkings sont disponibles pour assurer le confort et la commodité des résidents et de leurs visiteurs.</Label>
            </div>

            <div className='flex gap-2 justify-center items-center'>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src="./r3.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label className='text-sm font-normal'><span className='text-primary font-medium'>Lots R+2 : </span>91 lots disponibles, idéals pour des constructions résidentielles offrant confort et modernité</Label>
            </div>

            <div className='flex gap-2 justify-center items-center'>
                <Avatar className='w-24 h-24'>
                    <AvatarImage src="./r4.png" alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Label className='text-sm font-normal'><span className='text-primary font-medium'>Lots R+2 -C- : </span> 60 lots, offrant des options diversifiées pour les investisseurs intéressés par des projets variés.</Label>
            </div>

        </div>
    )
}

export default Description
