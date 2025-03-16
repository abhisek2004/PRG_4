"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface SaveFileProps{
  isOpen:boolean,
  onClose: () => void,
  onhandlesavecode: (filename: string ) => void;  
}

export const SaveFile = ({ isOpen, onClose, onhandlesavecode }:SaveFileProps) => {
  const [filename, setFilename] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onhandlesavecode(filename);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md p-6 space-y-6 bg-card rounded-lg shadow-xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">
            Enter File Name
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground"
              placeholder="Enter file name"
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-input rounded-md text-sm font-medium text-foreground hover:bg-muted"
            >
              Cancel
            </motion.button>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!filename.trim()}
              className="px-4 py-2 rounded-md text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
