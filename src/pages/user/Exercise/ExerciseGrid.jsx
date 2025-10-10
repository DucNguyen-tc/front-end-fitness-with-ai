import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { getAllMuscleGroups } from "../../../services/muscleGroupService";
import { useEffect, useState } from "react";

export default function ExerciseGrid() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchMuscleGroups() {
      try {
        const response = await getAllMuscleGroups();
        const muscleGroups = response.data;
        setExercises(muscleGroups);
      } catch (error) {
        throw new Error(`Failed to fetch muscle groups: ${error}`);
      }
    }
    fetchMuscleGroups();
  }, []);


  return (
    <Grid container spacing={3}>
      {exercises.map((exercise, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
          <Card
            sx={{
              position: "relative",
              overflow: "hidden",
              borderRadius: 3,
              height: 400,
              cursor: "pointer",
              transition: "all 0.3s ease-in-out",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 12px 24px rgba(0,0,0,0.2)",
                "& .overlay": {
                  backgroundColor: "rgba(0,0,0,0.3)",
                },
                "& .content": {
                  backgroundColor: "rgba(0,0,0,0.8)",
                },
              },
            }}
          >
            {/* Background Image */}
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${exercise.imageURL})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "transform 0.3s ease-in-out",
              }}
            />

            {/* Dark Overlay */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0,0,0,0.4)",
                transition: "background-color 0.3s ease-in-out",
              }}
            />

            {/* Content */}
            <CardContent
              className="content"
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(10px)",
                py: 2.5,
                px: 2,
                transition: "background-color 0.3s ease-in-out",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  letterSpacing: 0.5,
                }}
              >
                {exercise.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
