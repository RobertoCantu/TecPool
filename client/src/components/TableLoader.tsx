// components
import LoadingScreen from "./LoadingScreen";
// material
import { Box } from "@mui/material";

function TableLoader() {
  return (
    <Box sx={{padding:10}}>
      <LoadingScreen/>
    </Box>
  )
}

export default TableLoader