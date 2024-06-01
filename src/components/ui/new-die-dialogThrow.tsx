"use client";

import { useState, useEffect } from "react";
import DiceBox from "@3d-dice/dice-box";
import { Dialog, DialogContent } from "../shadcn/dialog";
import { ThrowDice } from "./throw-dice";

interface NewDieDialogProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

export function NewDieDialogThrow({ closeModal, isModalOpen }: NewDieDialogProps) {
  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-[425px]">
        <div id="dice-box" style={{ width: "100%", height: "400px" }}></div>
        <ThrowDice />
      </DialogContent>
    </Dialog>
  );
}
