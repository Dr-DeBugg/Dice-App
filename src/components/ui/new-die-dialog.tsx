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
import { toast } from "../shadcn/use-toast";
import { z } from "zod";
import { useState } from "react";
import { GradientPicker } from "./gradient-picker";

interface NewDieDialogProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const hexColorRegex = /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;

const FormSchema = z.object({
  sides: z.string({
    required_error: "Please select a side count.",
  }),
  color: z
    .string()
    .trim()
    .min(1, {
      message: "Please pick a color.",
    })
    .refine((val) => hexColorRegex.test(val), {
      message: "Invalid hex color code.",
    }),
});

export function NewDieDialog({ closeModal, isModalOpen }: NewDieDialogProps) {
  const [background, setBackground] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: "onChange",
  });

  const { isValid, isSubmitting } = form.formState;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "Saving not implemented yet. Submitted values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
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
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
