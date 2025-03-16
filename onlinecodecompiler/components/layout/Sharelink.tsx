import React, { useEffect, useState } from "react";
import { Copy, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { codeatom, languageatom } from "@/store/atom";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

interface SharelinkProps {
  onClose: () => void;
}

export const Sharelink = ({ onClose }: SharelinkProps) => {
  const [generatedLink, setGeneratedLink] = useState("");

  const language = useRecoilValue(languageatom).language!!!;
  const code = useRecoilValue(codeatom).code!!!;

  const ShareCodeApi = async () => {
    const response = await axios.post("/api/share", {
      code,
      language,
    });
    return response.data;
  };

  const ShareCodeMutaion = useMutation({
    mutationFn: ShareCodeApi,
    retry: 3,
    onSuccess: (data: any) => {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      setGeneratedLink(`${baseUrl}/share/${data.ShareID}`);
    },
    onError: (error: any) => {
      toast.error("Error while saving the code");
    },
  });

  useEffect(() => {
    ShareCodeMutaion.mutate();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-background p-12 rounded-xl shadow-2xl w-full max-w-md relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-foreground hover:text-destructive transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {ShareCodeMutaion.isPending ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-muted-foreground">
                  Generating share link...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <h1 className="text-2xl font-bold text-center">
                  Share Your Code
                </h1>

                {generatedLink ? (
                  <div className="flex items-center bg-muted rounded-lg p-3">
                    <input
                      type="text"
                      value={generatedLink}
                      readOnly
                      className="flex-grow bg-transparent outline-none text-foreground"
                    />
                    <button
                      onClick={handleCopyLink}
                      className="ml-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <Copy className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => ShareCodeMutaion.mutate()}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors w-full"
                  >
                    Try again
                  </button>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};
