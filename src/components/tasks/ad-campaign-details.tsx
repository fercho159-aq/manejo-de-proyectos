"use client"

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";

interface AdCampaignDetailsFormProps {
    form: UseFormReturn<any>;
}

export function AdCampaignDetailsForm({ form }: AdCampaignDetailsFormProps) {
  return (
    <>
        <div className="space-y-4 rounded-md border p-4">
            <h4 className="font-semibold text-sm">META</h4>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="adCampaignDetails.meta.interaction"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Interacción ($)</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="adCampaignDetails.meta.messages"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mensajes ($)</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="adCampaignDetails.meta.credentials"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Credenciales</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Usuario..." rows={3}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="space-y-4 rounded-md border p-4">
            <h4 className="font-semibold text-sm">TikTok</h4>
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="adCampaignDetails.tiktok.interaction"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Interacción ($)</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="adCampaignDetails.tiktok.messages"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Mensajes ($)</FormLabel>
                        <FormControl>
                            <Input {...field} type="number" placeholder="0" />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <FormField
                control={form.control}
                name="adCampaignDetails.tiktok.credentials"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Credenciales</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Usuario..." rows={3}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="space-y-4 rounded-md border p-4">
            <h4 className="font-semibold text-sm">Google Ads</h4>
            <FormField
                control={form.control}
                name="adCampaignDetails.googleAds.budget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Presupuesto ($)</FormLabel>
                    <FormControl>
                        <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="adCampaignDetails.googleAds.credentials"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Credenciales</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Usuario..." rows={3}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <div className="space-y-4 rounded-md border p-4">
            <h4 className="font-semibold text-sm">LinkedIn</h4>
            <FormField
                control={form.control}
                name="adCampaignDetails.linkedin.budget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Presupuesto ($)</FormLabel>
                    <FormControl>
                        <Input {...field} type="number" placeholder="0" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="adCampaignDetails.linkedin.credentials"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Credenciales</FormLabel>
                    <FormControl>
                        <Textarea {...field} placeholder="Usuario..." rows={3}/>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
            control={form.control}
            name="adCampaignDetails.pendingNotes"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Pendientes Pauta</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder="Añadir notas..." rows={5}/>
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
    </>
  )
}
