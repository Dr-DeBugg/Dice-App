"use client";

import { Paintbrush, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { Button } from "../shadcn/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent } from "../shadcn/tabs";
import { Input } from "../shadcn/input";
import { PopoverClose } from "@radix-ui/react-popover";

export function GradientPicker({
  background,
  setBackground,
  className,
}: {
  background: string;
  setBackground: (background: string) => void;
  className?: string;
}) {
  const solids = [
    "#E2E2E2",
    "#ff75c3",
    "#ffa647",
    "#ffe83f",
    "#9fff5b",
    "#70e2ff",
    "#cd93ff",
    "#09203f",
    "#7c4dff",
    "#00bcd4",
    "#ff1744",
    "#00c853",
    "#6200ea",
    "#8B572A",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[220px] justify-start text-left font-normal",
            !background && "text-muted-foreground",
            className
          )}
        >
          <div className="w-full flex items-center gap-2">
            {background ? (
              <div
                className="h-5 w-5 rounded !bg-center !bg-cover transition-all"
                style={{ background }}
              ></div>
            ) : (
              <Paintbrush className="h-4 w-4" />
            )}
            <div className="truncate flex-1">{background ? background : "Pick a color"}</div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 pt-12 translate-x-2">
        <PopoverClose asChild>
          <X className="h-4 w-4 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"></X>
        </PopoverClose>
        <Tabs defaultValue="solid" className="w-full">
          <TabsContent value="solid" className="flex flex-wrap gap-2 mt-0">
            {solids.map((s) => (
              <div
                key={s}
                style={{ background: s }}
                className="rounded-md h-6 w-6 cursor-pointer active:scale-95"
                onClick={() => setBackground(s)}
              />
            ))}
          </TabsContent>
        </Tabs>
        <Input
          id="custom"
          value={background}
          placeholder="you can also type a HEX"
          className="col-span-2 h-8 mt-4"
          onChange={(e) => setBackground(e.currentTarget.value)}
        />
      </PopoverContent>
    </Popover>
  );
}
