import {
  Box,
  CircularProgress,
  circularProgressClasses,
  type CircularProgressProps,
} from "@mui/material";

export default function CustomCircularProgress(props: CircularProgressProps) {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={(theme) => ({
          color: theme.palette.grey[200],
          ...theme.applyStyles("dark", {
            color: theme.palette.grey[800],
          }),
        })}
        size={45}
        thickness={4}
        {...props}
        value={100}
      />
      <CircularProgress
        variant="indeterminate"
        disableShrink
        sx={(theme) => ({
          color: "#C4C4C4",
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
          ...theme.applyStyles("dark", {
            color: "#C4C4C4",
          }),
        })}
        size={45}
        thickness={4}
        {...props}
      />
    </Box>
  );
}
