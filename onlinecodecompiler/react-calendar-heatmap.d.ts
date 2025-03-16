declare module 'react-calendar-heatmap' {
    import React from 'react';
  
    export interface HeatmapValue {
      date: string;
      count: number;
    }
  


    export interface ReactCalendarHeatmapProps {
      startDate: string | Date;
      endDate: string | Date;
      values: HeatmapValue[];
      classForValue?: (value: HeatmapValue) => string;
      tooltipDataAttrs?: (value: HeatmapValue) => object;
      onClick?: (value: HeatmapValue) => void;
      showWeekdayLabels?: boolean;
      gutterSize?: number;
      horizontal?: boolean;
    }
  
    const ReactCalendarHeatmap: React.FC<ReactCalendarHeatmapProps>;
    export default ReactCalendarHeatmap;
  }
  