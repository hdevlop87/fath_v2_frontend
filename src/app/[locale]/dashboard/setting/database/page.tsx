'use client'

import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import ResetDatabase from './ResetDatabase'

const UploadDatabaseSection = () => {
   const handleUpload = () => {
      alert("Database uploaded successfully!");
   };

   const handleDownload = () => {
      alert("Database downloaded successfully!");
   };

   return (
      <div className="border border-gray-300 p-4 rounded-md">
         <div className="flex flex-col gap-2">
            <Label className="text-lg">
               Manage Database
            </Label>
            <Label className="text-sm text-muted-foreground">
               Add or download a database to/from the platform. Ensure you follow guidelines for compatible formats.
            </Label>
            <div className="flex justify-end mt-4 space-x-4">
               <Button
                  type="button"
                  className=" px-4 py-2 rounded"
                  onClick={handleUpload}>
                  Upload Database
               </Button>
               <Button
                  type="button"
                  variant='outline'
                  className="px-4 py-2 rounded "
                  onClick={handleDownload}>
                  Download Database
               </Button>
            </div>
         </div>
      </div>
   );
};


export default function SettingsProfilePage() {
   return (
      <div className="space-y-6">
         <div>
            <h3 className="text-lg font-medium">Base de données</h3>
            <p className="text-sm text-muted-foreground">
               Modifier les préférences de la Base de données .
            </p>
         </div>
         <Separator />
         <UploadDatabaseSection />
         <ResetDatabase />
      </div>
   )
}