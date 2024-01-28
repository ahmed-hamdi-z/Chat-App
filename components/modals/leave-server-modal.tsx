"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LeaveServerModal = () => {
  const {  isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const { server } = data;
  const isModalopen = isOpen && type === "leaveServer";

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.patch(`/api/servers/${server?.id}/leave`);

      onClose();
      router.refresh();
      router.push("/")
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Dialog open={isModalopen} onOpenChange={onClose}>
      <DialogContent className=" bg-transperent shadow-zinc-900 border-0 text-white p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className=" text-2xl text-center text-zinc-100 dark:text-zinc-300 font-bold ">
            Leave Server
          </DialogTitle>
          <DialogDescription className="capitalize text-center text-zinc-400">
            Are You sure you want to Leave{" "}
            <span className="font-semibold text-indigo-400">
              {server?.name}?
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-transparent px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={isLoading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button disabled={isLoading} onClick={onClick} variant="primary">
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};