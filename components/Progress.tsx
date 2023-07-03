import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { getProgress } from "../utils/getProgress";

interface ProgressProps {
  current?: string;
}

const Progress: React.FC<ProgressProps> = ({ current = `` }) => {
  const progress = getProgress();

  return (
    <Box
      sx={{
        width: "100%",
        padding: "3rem",
        paddingBottom: 0,
        display: current === `CONFIRMATION` ? "none" : "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: ["100%", "60%"],
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            Identification
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            height:
              progress.indexOf(current) === progress.length - 1 ? "8px" : "4px",
            background:
              progress.indexOf(current) === progress.length - 1
                ? "#0060f0"
                : "#949494",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {progress.map((p, index) => (
            <Box
              key={p}
              sx={{
                width: "33%",
                height: progress.indexOf(current) >= index ? "8px" : "4px",
                background:
                  progress.indexOf(current) >= index ? "#0060f0" : "#949494",
                borderRadius: "4px",
              }}
            />
          ))}
          {/* <Box
            sx={{
              width: "33%",
              height: "8px",
              background: "#0060f0",
              borderRadius: "4px",
            }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Progress;
