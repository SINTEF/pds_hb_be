export const getT = (startDateString: string, endDateString: string, populationSize: number): number => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const differenceInMilliSeconds = endDate.getTime() - startDate.getTime();
  const differenceInDays = Math.floor(differenceInMilliSeconds / (1000 * 3600 * 24));

  return differenceInDays * populationSize;
};
