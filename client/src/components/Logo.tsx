// material
import { useTheme, styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

const Image = styled('img')(({ theme }) => ({
  width: '100%'
}));

export default function Logo({ sx }: BoxProps) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  return (
    <Box sx={{ ...sx }}>
      <Image src="/car_pool"/>
    </Box>
  );
}
