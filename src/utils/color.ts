export const bookmarkBackgroundColors = (
  name: string
): { background: string; hover: string } => {
  const colorMap: Record<string, { background: string; hover: string }> = {
    "Important ASAP": {
      background: "bg-[#E5F1FF]",
      hover: "hover:bg-[#B1D4FF]",
    },
    "Offline Meeting": {
      background: "bg-[#FDCFA4]",
      hover: "hover:bg-[#FFB547]",
    },
    "Virtual Meeting": {
      background: "bg-[#F9E9C3]",
      hover: "hover:bg-[#F4D88C]",
    },
    ASAP: {
      background: "bg-[#AFEBDB]",
      hover: "hover:bg-[#7CD1B4]",
    },
    "Client Related": {
      background: "bg-[#CBF1C2]",
      hover: "hover:bg-[#9BDD90]",
    },
    "Self Task": {
      background: "bg-[#CFCEF9]",
      hover: "hover:bg-[#A5A3F3]",
    },
    Appointments: {
      background: "bg-[#F9E0FD]",
      hover: "hover:bg-[#E2B7ED]",
    },
    "Court Related": {
      background: "bg-[#9DD0ED]",
      hover: "hover:bg-[#69B5E1]",
    },
  };

  return (
    colorMap[name] || {
      background: "bg-[#E5F1FF]",
      hover: "hover:bg-[#B1D4FF]",
    }
  );
};
