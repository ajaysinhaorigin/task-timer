export interface Timer {
  id: number;
  timerName: string;
  duration: number;
  category: string;
  alertHalfway: boolean;
  remaininTime: number;
  isRunning: boolean;
  isCompleted: boolean;
  completedAt: string;
}

export interface TimerCategory {
  id: number;
  categoryName: string;
  isExpanded: boolean;
  isCategoryRunning: boolean;
  timers: Timer[];
}
