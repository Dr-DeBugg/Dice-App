import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { ModeToggle } from "@/components/shadcn/themeToggle";
import { getAllDices } from "@/lib/api/requests";

type Props = {
  dices: any[];
};

export const getServerSideProps = async () => {
  try {
    const dices = await getAllDices();
    return {
      props: {
        dices,
      },
    };
  } catch (error) {
    return {
      props: {
        dices: [],
        error: "Failed to fetch posts.",
      },
    };
  }
};

export default function Dashboard({ dices }: Props) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {dices
        ? dices.map((d: any) => (
            <Card key={d.id}>
              <CardHeader>
                <div>
                  <CardTitle>Name of the die is {d.name}</CardTitle>
                  <CardDescription>gkdsgokk</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                {d.name} has {d.sided} sides
              </CardContent>
              <CardFooter>this is the footer</CardFooter>
            </Card>
          ))
        : ""}
    </div>
  );
}
