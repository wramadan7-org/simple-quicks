export const bookmarkBackgroundColors = (name: string): string => {
  const colorMap: Record<string, string> = {
    "Important ASAP": "bg-[#E5F1FF] hover:bg-[#B1D4FF]",
    "Offline Meeting": "bg-[#FDCFA4] hover:bg-[#FFB547]",
    "Virtual Meeting": "bg-[#F9E9C3] hover:bg-[#F4D88C]",
    ASAP: "bg-[#AFEBDB] hover:bg-[#7CD1B4]",
    "Client Related": "bg-[#CBF1C2] hover:bg-[#9BDD90]",
    "Self Task": "bg-[#CFCEF9] hover:bg-[#A5A3F3]",
    Appointments: "bg-[#F9E0FD] hover:bg-[#E2B7ED]",
    "Court Related": "bg-[#9DD0ED] hover:bg-[#69B5E1]",
  };

  return colorMap[name] || "bg-[#FFFFFF]";
};
