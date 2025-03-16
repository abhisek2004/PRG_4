"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Trash2,
  Edit,
  Share2,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { DeleteModal } from "@/components/layout/dashboard/DeleteModal";
import { downloadCode } from "@/components/layout/Navbar2";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Navbar } from "@/components/layout/Navbar1";
import { Sharelink } from "@/components/layout/Sharelink";
import { useSetRecoilState } from "recoil";
import { codeatom, languageatom } from "@/store/atom";
import HeatmapComponent from "@/components/layout/dashboard/heatmap";
import { FiRefreshCcw } from "react-icons/fi";

type Code = {
  id: string;
  fileName: string;
  language: string;
  code: string;
  createdAt: Date;
};

type SortKey = "fileName" | "language" | "createdAt";

const Dashboard = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [codes, setCodes] = useState<Code[]>([]);
  const [filteredCodes, setFilteredCodes] = useState<Code[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [codesPerPage] = useState(10);

  //for delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [codeToDelete, setCodeToDelete] = useState<string | null>(null);

  //for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: SortKey;
    direction: "ascending" | "descending";
  } | null>(null);

  //for share
  const [isSharePopupOpen, setSharePopupOpen] = useState(false);
  const setCode = useSetRecoilState(codeatom);
  const setLanguage = useSetRecoilState(languageatom);

  const fetchallCodeApi = async () => {
    const response = await axios.get(`/api/save-code/all?userID=${userID}`);
    return response.data;
  };

  const fetchallCodeMutaion = useMutation({
    mutationFn: fetchallCodeApi,
    retry: 3,
    onSuccess: (data: any) => {
      setCodes(data.codes);
      setFilteredCodes(data.codes);
    },

    onError: (error: any) => {
      // console.error("Error fetching codes:", error);
      toast.error("Error fetching codes:", error);
    },
  });

  useEffect(() => {
    const fetchCodes = async () => {
      fetchallCodeMutaion.mutate();
    };

    if (userID) {
      fetchCodes();
    }
  }, [userID]);

  useEffect(() => {
    const results = codes.filter(
      (code) =>
        code.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCodes(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const deleteCodeApi = async () => {
    const response = await axios.delete(
      `/api/save-code?codeID=${codeToDelete}`
    );
    return response.data.codeData;
  };

  const deleteCodeMutaion = useMutation({
    mutationFn: deleteCodeApi,
    retry: 3,
    onSuccess: (data: Code) => {
      // console.log("delete data", data);
      setCodes((prevCodes) =>
        prevCodes.filter((code) => code.id !== codeToDelete)
      );
      setFilteredCodes((prevCodes) =>
        prevCodes.filter((code) => code.id !== codeToDelete)
      );
      setIsDeleteModalOpen(false);
      setCodeToDelete(null);
      toast.success(`${data.fileName} is deleted successfully`);
    },
    onError: (error: any) => {
      // console.error("Error fetching codes:", error);
      toast.error("Error while deleting code:", error);
    },
  });

  const handleDeleteClick = (id: string) => {
    setCodeToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (codeToDelete) {
      deleteCodeMutaion.mutate();
    }
  };

  const handleShare = (code: string, language: string) => {
    setLanguage({ language });
    setCode({ code: atob(code) });
    setSharePopupOpen(true);
  };

  const handleCloseSharePopup = () => {
    setSharePopupOpen(false);
  };

  const handleDownload = (filename: string, code: string, language: string) => {
    code = atob(code);
    downloadCode({ filename, code, language });
  };

  const handleSort = (key: SortKey) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (sortConfig !== null) {
      const sortedCodes = [...filteredCodes].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      setFilteredCodes(sortedCodes);
    }
  }, [sortConfig]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  // Pagination
  const totalpages = Math.ceil(codes.length / 10);
  const indexOfLastCode = currentPage * codesPerPage;
  const indexOfFirstCode = indexOfLastCode - codesPerPage;
  const currentCodes = filteredCodes.slice(indexOfFirstCode, indexOfLastCode);

  function RefreshButton() {
    setCodes([]);
    setFilteredCodes([]);
    fetchallCodeMutaion.mutate();
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-color-1"
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar homepage={false} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-color-1"
          >
            Hello, {session.user?.name}
          </motion.h1>

          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search by file name or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color-1"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Serial No
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("fileName")}
                >
                  File Name <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("language")}
                >
                  Language <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Created At <ArrowUpDown size={14} className="inline ml-1" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>

              </tr>
            </thead>
            <tbody className="divide-y divide-muted">
              {currentCodes.length > 0 ? (
                currentCodes.map((code, index) => (
                  <motion.tr
                    key={code.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-muted/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      {indexOfFirstCode + index + 1}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap cursor-pointer"
                      onClick={() => window.open(`/code/${code.id}`, "_blank")}
                    >
                      {code.fileName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {code.language}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(code.createdAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            window.open(`/code/${code.id}`, "_blank")
                          }
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDeleteClick(code.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleShare(code.code, code.language)}
                          className="text-green-500 hover:text-green-700"
                        >
                          <Share2 size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            handleDownload(
                              code.fileName,
                              code.code,
                              code.language
                            )
                          }
                          className="text-purple-500 hover:text-purple-700"
                        >
                          <Download size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-muted-foreground"
                  >
                    {fetchallCodeMutaion.isPending
                      ? "Loading"
                      : "No data available in table"}
                  </td>
                </motion.tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <div className="flex gap-5">

          <div>
            Showing {indexOfFirstCode + 1} to{" "}
            {Math.min(indexOfLastCode, filteredCodes.length)} of{" "}
            {filteredCodes.length} entries
          </div>
          <div onClick={RefreshButton} className="cursor-pointer  text-lg text-muted-foreground ">
            <FiRefreshCcw />
          </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="px-3 py-1">
              {currentPage} of {totalpages}
            </div>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={totalpages <= currentPage}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirm Deletion"
          message="Are you sure you want to delete this file? This action cannot be undone."
        />

        {isSharePopupOpen && <Sharelink onClose={handleCloseSharePopup} />}
      </div>
      <HeatmapComponent />
    </div>
  );
};

export default Dashboard;
