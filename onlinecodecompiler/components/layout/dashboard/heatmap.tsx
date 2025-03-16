"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import "./heatmap.css";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface HeatmapValue {
  date: string;
  count: number;
}

const HeatmapComponent: React.FC = () => {
  const { data: session } = useSession();
  const userID = session?.user.id;

  const [loading, setLoading] = useState(true);
  const [dailyupdates, setDailyUpdates] = useState<HeatmapValue[]>([]);

  const today = new Date();
  const startDate = new Date(today.getFullYear() - 1, 11, 31);
  const endDate = new Date(today.getFullYear(), 11, 31);

  const DailyStatusApi = async () => {
    const response = await axios.get(`/api/dashboard/dailyupdate?userID=${userID}`);
    return response.data;
  };

  const DailyStatusMutaion = useMutation({
    mutationFn: DailyStatusApi,
    retry: 1,
    onSuccess: (data: any) => {
      setDailyUpdates(data.message);
      setLoading(false);
    },
    onError: (error: any) => {
      // console.error("Error dailystatus:", error);
      toast.error("Error while fetching daily status")
    },
  });

  useEffect(() => {
    DailyStatusMutaion.mutate();
  }, []);

  const getTooltipDataAttrs = (value: HeatmapValue) => {
    if (!value || !value.date) {
      return {
        "data-tooltip-id": "heatmap-tooltip",
        "data-tooltip-content": `No Submission`,
      };
    }
    return {
      "data-tooltip-id": "heatmap-tooltip",
      "data-tooltip-content": `${value.date}`,
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-muted rounded-t-lg">
          <h2 className="text-xl   py-2 text-center   font-medium text-muted-foreground uppercase tracking-wider">
            Submissions
          </h2>
        </div>
        <div className="  bg-card rounded-b-lg shadow-md">
          <div className="overflow-x-auto pt-5 mx-7">
            <CalendarHeatmap
              startDate={startDate}
              endDate={endDate}
              values={dailyupdates}
              gutterSize={2}
              classForValue={(value) => {
                if (!value || value.count === 0) {
                  return "color-github-0"; // No activity
                } else if (value.count === 1) {
                  return "color-github-1"; // Light green
                } else if (value.count === 2) {
                  return "color-github-2"; // Medium green
                } else if (value.count === 3) {
                  return "color-github-3"; // Darker green
                }
                return "color-github-4"; // Very dark green
              }}
              tooltipDataAttrs={getTooltipDataAttrs}
              showWeekdayLabels
            />
          </div>

          <Tooltip id="heatmap-tooltip" />
        </div>
      </div>
    </>
  );
};

export default HeatmapComponent;

interface addDatesProps {
  startDate: Date;
  endDate: Date;
  dailyupdates: any;
}

function addDates({ startDate, endDate, dailyupdates }: addDatesProps) {
  const allDates = [];
  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const formattedDate = d.toISOString().slice(0, 10);
    const existingEntry = dailyupdates.find(
      (item: any) => item.date === formattedDate
    );
    allDates.push({
      date: formattedDate,
      count: existingEntry ? existingEntry.count : 0, // 0 for no activity
    });
  }
  return allDates;
}
