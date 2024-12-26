



// import React, { useState, useEffect, useRef } from "react";
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CardMedia,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   DialogActions,
// } from "@mui/material";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import CommentIcon from "@mui/icons-material/Comment";
// import DownloadIcon from "@mui/icons-material/Download";
// import AddIcon from "@mui/icons-material/Add";
// import { useNavigate } from "react-router-dom";

// import api from "../services/api";

// import axios from 'axios'

// const apiUrl = process.env.REACT_APP_API_URL;
// const FeedPage = () => {
//   const [videos, setVideos] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [comments, setComments] = useState([]);
//   const navigate = useNavigate();
//   const containerRef = useRef(null);
//   const videoRefs = useRef([]);
//   const [likes, setLikes] = useState([]); // To store like status for each video


//   useEffect(() => {
//     fetchVideos();


//   }, []);


//   const fetchVideos = async () => {
//     try {
//       const { data } = await axios.get(`${apiUrl}/videos/videos`);
//       const updatedVideos = data.map(video => ({
//         ...video,
//         videoUrl: video.videoUrl.replace(/^http:/, 'https:') // Replace http with https
//       }));
//       setVideos(updatedVideos);
//       setComments(updatedVideos.map(() => []));
//       setLikes(updatedVideos.map(() => 0)); // Initially setting all likes to 0
//     } catch (err) {
//       console.error(err);
//     }
//   };




//   const handleLike = (index) => {
//     const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
//     console.log("Token found:", token); 
//     if (!token) {
//       console.log('no token present')
//       alert("You must be logged in to like.");
//       return;
//     }
//     setLikes((prevLikes) => {
//       const newLikes = [...prevLikes];
//       newLikes[index] = newLikes[index] === 1 ? 0 : 1; // Toggle between 0 and 1
//       return newLikes;
//     });
//   };

//   const handleCommentClick = () => setIsCommentDialogOpen(true);


//   const handleCommentSubmit = async () => {
//     const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
//     console.log("Token found:", token); 
//     if (!token) {
//       console.log('no token present')
//       alert("You must be logged in to submit a comment.");
//       return;
//     }

//     try {
//       const videoId = videos[currentIndex]?._id;
//       const response = await axios.post(
//         `${apiUrl}/videos/comment/${videoId}`,
//         { text: commentText },
//         { headers: { Authorization: `Bearer ${token}` } } // Pass the token for backend validation
//       );

//       const newComment = { text: commentText };
//       setComments((prevComments) => {
//         const updatedComments = [...prevComments];
//         updatedComments[currentIndex].push(newComment);
//         return updatedComments;
//       });
//       setCommentText("");
//       setIsCommentDialogOpen(false);
//     } catch (err) {
//       console.error("Failed to submit comment:", err);
//     }
//   };




//   const handleDownload = async () => {
//     const videoUrl = videos[currentIndex]?.videoUrl;
//     if (videoUrl) {
//       try {
//         console.log("Attempting to download video from:", videoUrl);
//         const response = await fetch(videoUrl);
//         if (!response.ok) {
//           console.error(`Failed to fetch video. Status: ${response.status}`);
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const blob = await response.blob();
//         const blobUrl = URL.createObjectURL(blob);

//         const link = document.createElement("a");
//         link.href = blobUrl;
//         link.download = `video-${currentIndex + 1}.mp4`;
//         link.click();

//         URL.revokeObjectURL(blobUrl);
//       } catch (error) {
//         console.error("Error downloading the video:", error);
//       }
//     }
//   };


//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const index = videoRefs.current.indexOf(entry.target);
//             if (index !== -1) {
//               setCurrentIndex(index);
//               // Set video quality to 360p when it comes into view
//               videoRefs.current[index].playbackRate = 1; // Default playbackRate
//               videoRefs.current[index].setAttribute("playsinline", "true"); // Important for mobile
//               videoRefs.current[index].setAttribute("muted", "muted");
//               videoRefs.current[index].setAttribute("poster", ""); // Optional poster image to hide loading screen
//               console.log("Video at index", index, "set to 360p");
//             }
//           }
//         });
//       },
//       { threshold: 0.5 } // Trigger when 50% of the video is in view
//     );

//     videoRefs.current.forEach((video) => {
//       observer.observe(video);
//     });

//     return () => {
//       observer.disconnect();
//     };
//   }, []);
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "90vh",
//         backgroundColor: "#121212",
//         mt: 4,
//       }}
//     >
//       <Box
//         ref={containerRef}
//         sx={{
//           width: 350,
//           height: 550,
//           backgroundColor: "#232323",
//           borderRadius: 20,
//           boxShadow: "0 0 20px rgba(100, 100, 255, 0.8)",
//           overflow: "auto",
//         }}
//       >
//         {videos.map((video, index) => (
//           <CardMedia
//             key={video._id}
//             component="video"
//             src={video.videoUrl}
//             controls
//             ref={(el) => (videoRefs.current[index] = el)}
//             autoPlay={index === currentIndex}
//             loop
//             muted
//             controlsList="nodownload noplaybackrate"
//             sx={{ width: "100%", height: "100%", objectFit: "contain" }}
//           />
//         ))}
//       </Box>

//       <Box
//         sx={{
//           position: "absolute",
//           top: "70%",
//           right: "34%",
//           transform: "translateY(-50%)",
//           display: "flex",
//           flexDirection: "column",
//           gap: 4,
//         }}
//       >
//         <IconButton
//           sx={{ color: "#64b5f6" }}
//           onClick={() => handleLike(currentIndex)}
//         >
//           <FavoriteIcon />
//         </IconButton>
//         <Typography sx={{ color: "#fff", fontSize: "0.8rem", textAlign: "center" }}>
//           {likes[currentIndex] || 0} {/* Display the like count (0 or 1) */}
//         </Typography>
//         <IconButton sx={{ color: "#64b5f6" }} onClick={handleCommentClick}>
//           <CommentIcon />
//         </IconButton>
//         <IconButton sx={{ color: "#64b5f6" }} onClick={handleDownload}>
//           <DownloadIcon />
//         </IconButton>
//       </Box>
//       <Button
//         variant="contained"
//         sx={{
//           position: "absolute",
//           bottom: 30,
//           right: 30,
//           backgroundColor: "#64b5f6",
//           color: "#fff",
//           width: 60,
//           height: 60,
//           borderRadius: "50%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           "&:hover": { backgroundColor: "#42a5f5" },
//         }}
//         onClick={() => navigate("/upload")}
//       >
//         <AddIcon />
//       </Button>

//       <Dialog
//         open={isCommentDialogOpen}
//         onClose={() => setIsCommentDialogOpen(false)}
//       >
//         <DialogTitle>Add a Comment</DialogTitle>
//         <DialogContent>
//           <TextField
//             label="Comment"
//             variant="outlined"
//             fullWidth
//             value={commentText}
//             onChange={(e) => setCommentText(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setIsCommentDialogOpen(false)}>Cancel</Button>
//           <Button onClick={handleCommentSubmit} color="primary">
//             Post
//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Box sx={{ padding: "10px", color: "#fff", maxHeight: "200px", overflowY: "auto" }}>
//         {comments[currentIndex]?.map((comment, index) => (
//           <Typography key={index} sx={{ marginBottom: "8px" }}>
//             {comment.text}
//           </Typography>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default FeedPage;













import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import DarkModeIcon from "@mui/icons-material/DarkMode"; // Dark mode toggle icon
import LightModeIcon from "@mui/icons-material/LightMode"; // Light mode toggle icon

import api from "../services/api";

import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL;
const FeedPage = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const [likes, setLikes] = useState([]); // To store like status for each video
  const [theme, setTheme] = useState("dark");



  useEffect(() => {
    fetchVideos();
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);

  }, []);
  const handleThemeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };


  const fetchVideos = async () => {
    try {
      const { data } = await axios.get(`${apiUrl}/videos/videos`);
      const updatedVideos = data.map(video => ({
        ...video,
        videoUrl: video.videoUrl.replace(/^http:/, 'https:') // Replace http with https
      }));
      setVideos(updatedVideos);
      setComments(updatedVideos.map(() => []));
      setLikes(updatedVideos.map(() => 0)); // Initially setting all likes to 0
    } catch (err) {
      console.error(err);
    }
  };




  const handleLike = (index) => {
    const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
    console.log("Token found:", token);
    if (!token) {
      console.log('no token present')
      alert("You must be logged in to like.");
      return;
    }
    setLikes((prevLikes) => {
      const newLikes = [...prevLikes];
      newLikes[index] = newLikes[index] === 1 ? 0 : 1; // Toggle between 0 and 1
      return newLikes;
    });
  };

  const handleCommentClick = () => setIsCommentDialogOpen(true);


  const handleCommentSubmit = async () => {
    const token = localStorage.getItem("authToken"); // Ensure the user is authenticated
    console.log("Token found:", token);
    if (!token) {
      console.log('no token present')
      alert("You must be logged in to submit a comment.");
      return;
    }

    try {
      const videoId = videos[currentIndex]?._id;
      const response = await axios.post(
        `${apiUrl}/videos/comment/${videoId}`,
        { text: commentText },
        { headers: { Authorization: `Bearer ${token}` } } // Pass the token for backend validation
      );

      const newComment = { text: commentText };
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        updatedComments[currentIndex].push(newComment);
        return updatedComments;
      });
      setCommentText("");
      setIsCommentDialogOpen(false);
    } catch (err) {
      console.error("Failed to submit comment:", err);
    }
  };




  const handleDownload = async () => {
    const videoUrl = videos[currentIndex]?.videoUrl;
    if (videoUrl) {
      try {
        console.log("Attempting to download video from:", videoUrl);
        const response = await fetch(videoUrl);
        if (!response.ok) {
          console.error(`Failed to fetch video. Status: ${response.status}`);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = `video-${currentIndex + 1}.mp4`;
        link.click();

        URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Error downloading the video:", error);
      }
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = videoRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setCurrentIndex(index);
              // Set video quality to 360p when it comes into view
              videoRefs.current[index].playbackRate = 1; // Default playbackRate
              videoRefs.current[index].setAttribute("playsinline", "true"); // Important for mobile
              videoRefs.current[index].setAttribute("muted", "muted");
              videoRefs.current[index].setAttribute("poster", ""); // Optional poster image to hide loading screen
              console.log("Video at index", index, "set to 360p");
            }
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the video is in view
    );

    videoRefs.current.forEach((video) => {
      observer.observe(video);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <Box
      sx={{
      
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
        backgroundColor:theme === "dark" ? "#f5f5f5" :"#1e1e2f", // Subtle gradient-like dark background
        mt: 4,
      }}
    >
       <IconButton
        sx={{
          position: "absolute",
          top: 23,
          right: 18,
         
          color: theme === "dark" ? "#ff4081" : "#00796b", // Theme toggle button color
          "&:hover": {
            color: theme === "dark" ? "#f50057" : "#00574e",
          },
        }}
        onClick={handleThemeToggle}
      >
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />} {/* Icon to indicate theme toggle */}
      </IconButton>
      <Box
        ref={containerRef}
        sx={{
          width: 350,
          height: 550,
          backgroundColor: "#29293d", // Dark card background with a slight tint
          borderRadius: 20,
          boxShadow: "0 0 25px rgba(0, 185, 255, 0.8)", // Neon blue glow for emphasis
          overflow: "auto",
        }}
      >
        {videos.map((video, index) => (
          <CardMedia
            key={video._id}
            component="video"
            src={video.videoUrl}
            controls
            ref={(el) => (videoRefs.current[index] = el)}
            autoPlay={index === currentIndex}
            loop
            muted
            controlsList="nodownload noplaybackrate"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              backgroundColor: "#1a1a2e", // Subtle background while loading
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: "70%",
          right: "34%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <IconButton
          sx={{
            color: "#ff4081", // Bright pink for like icon
            "&:hover": { color: "#f50057" }, // Hover effect for interactivity
          }}
          onClick={() => handleLike(currentIndex)}
        >
          <FavoriteIcon />
        </IconButton>
        <Typography
          sx={{
            color: "#e0e0e0", // Neutral light gray for text
            fontSize: "0.8rem",
            textAlign: "center",
          }}
        >
          {likes[currentIndex] || 0}
        </Typography>
        <IconButton
          sx={{
            color: "#00e5ff", // Aqua blue for comment icon
            "&:hover": { color: "#00b8d4" },
          }}
          onClick={handleCommentClick}
        >
          <CommentIcon />
        </IconButton>
        <IconButton
          sx={{
            color: "#76ff03", // Neon green for download icon
            "&:hover": { color: "#64dd17" },
          }}
          onClick={handleDownload}
        >
          <DownloadIcon />
        </IconButton>
      </Box>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 30,
          right: 30,
          backgroundColor: "#00bfa5", // Teal for the button
          color: "#fff",
          width: 60,
          height: 60,
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          "&:hover": { backgroundColor: "#00796b" }, // Darker shade on hover
        }}
        onClick={() => navigate("/upload")}
      >
        <AddIcon />
      </Button>

      <Dialog
        open={isCommentDialogOpen}
        onClose={() => setIsCommentDialogOpen(false)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#2a2a3b", // Darker background for dialog
            color: "#fff", // White text for better readability
          },
        }}
      >
        <DialogTitle sx={{ color: "#ff4081" }}>Add a Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            variant="outlined"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 1,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCommentDialogOpen(false)} sx={{ color: "#e0e0e0" }}>
            Cancel
          </Button>
          <Button
            onClick={handleCommentSubmit}
            sx={{
              backgroundColor: "#00bfa5",
              color: "#fff",
              "&:hover": { backgroundColor: "#00796b" },
            }}
          >
            Post
          </Button>
        </DialogActions>
      </Dialog>

      <Box
        sx={{
          padding: "10px",
          color: "#e0e0e0",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {comments[currentIndex]?.map((comment, index) => (
          <Typography key={index} sx={{ marginBottom: "8px" }}>
            {comment.text}
          </Typography>
        ))}
      </Box>
    </Box>

  );
};

export default FeedPage;