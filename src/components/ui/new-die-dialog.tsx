"use client";

import { Button } from "../shadcn/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle } from "../shadcn/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../shadcn/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { onSubmitAction } from "@/lib/api/diceRequests";
import { schema } from "@/lib/schema";
import { toast } from "../shadcn/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { GradientPicker } from "./gradient-picker";

interface NewDieDialogProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

export function NewDieDialog({ closeModal, isModalOpen }: NewDieDialogProps) {
  const [background, setBackground] = useState("");
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const { isValid, isSubmitting } = form.formState;

  async function onSubmit(data: z.output<typeof schema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("sides", data.sides);
    formData.append("color", data.color);
    const resp = await onSubmitAction(formData);
    toast({
      variant: resp.message.includes("Error") ? "destructive" : "success",
      description: resp.message,
    });
    form.reset();
    setBackground("");
    setLoading(false);
    closeModal();
  }

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={() => {
        form.reset();
        setBackground("");
        closeModal();
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DialogHeader>
              <DialogTitle style={{ textAlign: "center" }}>Add new die</DialogTitle>
            </DialogHeader>

            <FormField
              control={form.control}
              name="sides"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of sides</FormLabel>
                  <div className="w-1/2">
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select side count" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="4">D4</SelectItem>
                        <SelectItem value="6">D6</SelectItem>
                        <SelectItem value="8">D8</SelectItem>
                        <SelectItem value="10">D10</SelectItem>
                        <SelectItem value="12">D12</SelectItem>
                        <SelectItem value="20">D20</SelectItem>
                        <SelectItem value="100">D100</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <div className="w-1/2">
                    <GradientPicker
                      className="w-full truncate"
                      background={background.trim()}
                      setBackground={(newBackground) => {
                        setBackground(newBackground.trim());
                        field.onChange(newBackground.trim());
                      }}
                    />
                  </div>
                  <FormDescription>Use any hexadecimal color here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button disabled={!isValid || isSubmitting} type="submit">
                {loading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
