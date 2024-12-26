
// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AppBar, Toolbar, Button, Box, IconButton, Typography } from "@mui/material";
// import { AuthContext } from "../context/AuthContext";
// import ticktok from '../assets/ticktokbg.png';

// const NavbarVariant2 = () => {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)",
//         color: "#fff",
//         padding: "0 20px",
//       }}
//     >
//       <Toolbar sx={{ justifyContent: "center", height: 70 }}>
//         <IconButton edge="start" component={Link} to="/">
//           <img src={ticktok} alt="TikTok" style={{ height: "80px" }} />
//         </IconButton>
//         <Box sx={{ position: "absolute", right: 20 }}>
//           {user ? (
//             <Button
//               onClick={handleLogout}
//               sx={{
//                 backgroundColor: "#222",
//                 color: "#fff",
//                 '&:hover': { backgroundColor: "#333" },
//               }}
//             >
//               Logout
//             </Button>
//           ) : (
//             <>
//               <Button
//                 component={Link}
//                 to="/login"
//                 sx={{
//                   border: "1px solid white",
//                   color: "white",
//                   '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.2)" },
//                 }}
//               >
//                 Login
//               </Button>
//               <Button
//                 component={Link}
//                 to="/register"
//                 sx={{
//                   backgroundColor: "#222",
//                   color: "#fff",
//                   '&:hover': { backgroundColor: "#444" },
//                   marginLeft: 1,
//                 }}
//               >
//                 Register
//               </Button>
//             </>
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default NavbarVariant2;



import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, IconButton } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import ticktok from '../assets/ticktokbg.png';

const NavbarVariant2 = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)", // Updated gradient colors
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)", // Added subtle shadow
        color: "#fff",
        padding: "0 20px",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          height: 70,
        }}
      >
        <IconButton edge="start" component={Link} to="/">
          <img
            src={ticktok}
            alt="TikTok"
            style={{ height: "60px", objectFit: "contain" }} // Updated logo styling
          />
        </IconButton>

        <Box>
          {user ? (
            <Button
              onClick={handleLogout}
              sx={{
                backgroundColor: "#ff4b2b", // Vibrant red for logout
                color: "#fff",
                borderRadius: "20px",
                padding: "5px 20px",
                fontWeight: "bold",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                '&:hover': { backgroundColor: "#ff3a1a" }, // Enhanced hover effect
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  border: "1px solid #fff",
                  borderRadius: "20px",
                  color: "#fff",
                  padding: "5px 20px",
                  marginRight: 1,
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                  '&:hover': { backgroundColor: "rgba(255, 255, 255, 0.3)" },
                }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                sx={{
                  backgroundColor: "#28a745", // Green for register
                  color: "#fff",
                  borderRadius: "20px",
                  padding: "5px 20px",
                  fontWeight: "bold",
                  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
                  '&:hover': { backgroundColor: "#218838" }, // Darker green on hover
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarVariant2;

