import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface AddNoteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddNote: (note: string) => void;
  title?: string;
  description?: string;
}

const AddNoteDialog = ({
  isOpen,
  onClose,
  onAddNote,
  title = "Add Note",
  description = "Add a note or comment to this item.",
}: AddNoteDialogProps) => {
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (note.trim()) {
      onAddNote(note);
      setNote("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Textarea
            placeholder="Enter your note here..."
            className="min-h-[150px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button onClick={handleSubmit} type="button">
            <MessageSquare className="mr-2 h-4 w-4" /> Add Note
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;
