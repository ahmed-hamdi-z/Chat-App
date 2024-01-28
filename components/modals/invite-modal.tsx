"use client";

import { useModal } from "@/hooks/use-modal-store";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Check, Copy, RefreshCw } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";

export const InviteModal = () => {
  const { onOpen, isOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const { server } = data;
  const isModalopen = isOpen && type === "invite";

  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const onNew = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalopen} onOpenChange={onClose}>
      <DialogContent className=" bg-transperent shadow-zinc-900 border-0 text-white p-0 overflow-hidden ">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className=" text-2xl text-center text-zinc-100 dark:text-zinc-300 font-bold ">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="uppercase text-sm font-bold text-zinc-100 dark:text-zinc-300">
            Server invite Link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
              disabled={isLoading}
              className=" bg-zinc-200/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
              value={inviteUrl}
            />
            <Button
              disabled={isLoading}
              onClick={onCopy}
              className="bg-transparent text-white dark:hover:text-black "
              size="icon"
            >
              {copied ? (
                <Check className="w-5 h-5 " />
              ) : (
                <Copy className="w-5 h-5 " />
              )}
            </Button>
          </div>
          <Button
          onClick={onNew}
            disabled={isLoading}
            variant="link"
            size="sm"
            className="text-sm text-indigo-400 mt-4"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
