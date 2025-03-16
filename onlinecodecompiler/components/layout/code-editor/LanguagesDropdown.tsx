"use client";
import React from "react";
import { languageOptions } from "../../../lib/Languages";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LanguageOption {
  value: string;
  label: string;
}

interface LanguagesDropdownProps {
  onSelectChange: (value: string) => void;
}
const LanguagesDropdown: React.FC<LanguagesDropdownProps> = ({
  onSelectChange,
}) => {
  return (
    <Select
      defaultValue={languageOptions[0].value}
      onValueChange={(value) => {
        const selectedOption = languageOptions.find(option => option.value === value);
        if (selectedOption) {
          onSelectChange(selectedOption.value);
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Filter By Category" />
      </SelectTrigger>
      <SelectContent>
        {languageOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent> 
    </Select>
  );
};

export default LanguagesDropdown;
