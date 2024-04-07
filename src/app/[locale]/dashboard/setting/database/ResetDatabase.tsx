import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useSession } from "next-auth/react";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import AutoInput from '@/components/AutoInput'
import http from "@/services/http";
import toast from 'react-hot-toast';

const DeleteDatabaseSection = () => {
    const [password, setPassword] = useState('');
    const { data: session } = useSession();

    const handleDelete = async () => {
        try {
            const response = await http.delete('/database', {
                data: {
                    username: (session?.user?.username as any) || "",
                    password: password
                }
            });
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <div className="border border-red-400 p-4 rounded-md">
            <div className="flex flex-col gap-2">
                <Label className="text-lg">
                    Delete Database
                </Label>
                <Label className="text-sm text-muted-foreground">
                    Permanently Reset the selected database from the platform. This action is irreversible, so please proceed with caution.
                </Label>
                <div className="flex justify-end mt-4">
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="button" variant="destructive" className="text-white px-4 py-2 rounded">
                                Reset Database
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently reset your database and remove your data.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="p-4">
                                <Label htmlFor="password">Enter Admin Password</Label>
                                <AutoInput
                                    type="password"
                                    field={{
                                        value: password,
                                        onChange: (e: any) => setPassword(e.target.value),
                                    }}
                                    placeholder="Enter Password"
                                />
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    );
};

export default DeleteDatabaseSection;
