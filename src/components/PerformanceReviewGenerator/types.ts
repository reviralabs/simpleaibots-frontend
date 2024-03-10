export type PerformanceReviewGeneratorRequest = {
  employeeName: string;
  jobTitle: string;
  keyAchievements: string;
};

export type PerformanceReviewGeneratorResponse = {
  id: string;
  content: string;
  statusCode: number;
  statusText: string;
};
