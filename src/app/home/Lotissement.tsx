import { Label } from '@/components/ui/label'
import React from 'react'
import { Icon } from "@iconify/react/dist/iconify.js";

const ContactForm = () => {
    return (
        <section className="contact flex flex-col gap-10" id="contact">
            <div className='flex flex-col gap-4'>
                <div className='flex gap-2'>
                    <Label className='text-xs p-1 bg-primary text-white'>En Commercialisation</Label>
                    <Label className='text-xs p-1 bg-slate-800 text-white flex items-center gap-2'><Icon icon="icon-park-outline:local" className='w-4 h-4' />Ahfir , Berkane</Label>
                </div>

                <Label className='text-lg'>Lotissement Said Oubadis </Label>

                <Label className='text-sm font-normal'>
                Découvrez un cadre de vie moderne et agréable, avec des espaces verts et toutes les commodités à portée de main. Rejoignez notre communauté et profitez d'une expérience de vie unique !
                </Label>
            </div>

            {/* <div className='flex flex-col gap-4'>
                <Label className='text-lg'>Caractéristiques de notre projet  </Label>
                <Label className='text-sm font-normal'>
                    🌳 Espaces Verts : 1 950 m² d'espaces verts, parfaits pour un cadre naturel agréable pour nos résidents.
                </Label>

                <Label className='text-sm font-normal'>
                    🅿️ Parkings : 572 m² de parkings sont disponibles pour assurer confort et commodité à tous.
                </Label>

                <Label className='text-sm font-normal'>
                    🏫 Équipements : Deux équipements principaux, couvrant une superficie totale de 891 m², sont prévus pour répondre aux divers besoins de notre communauté.
                </Label>
            </div>
            <div className='flex flex-col gap-4'>
                <Label className='text-lg'>Lots Disponibles </Label>
                <Label className='text-sm font-normal'>
                    R+2 : 91 lots disponibles avec une surface totale de 10 442 m², idéals pour des constructions résidentielles offrant confort et modernité.
                </Label>
                <Label className='text-sm font-normal'>
                    R+2 -C- : 60 lots avec une surface totale de 9 019 m², offrant des options diversifiées pour les investisseurs intéressés par des projets variés.
                </Label>
            </div> */}
        </section>
    )
}

export default ContactForm
