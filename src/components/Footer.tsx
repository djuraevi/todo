import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
    return (
        <Box sx={{ bgcolor: "primary.main", color: "white", p: 2 }}>
            <Typography variant="body2" align="center">
                © 2024 Todo Application
            </Typography>
        </Box>
    );
};

export default Footer;