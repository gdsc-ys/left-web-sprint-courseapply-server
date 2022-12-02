import express from "express";
import courseRouter from "./routes/course";
import healthRouter from "./routes/health";
import myCourseRouter from "./routes/mycourse";
import { initializeFirebase } from "./utils/firebase";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

initializeFirebase();

/**
 * Health Check
 */
app.use("/health", healthRouter);

/**
 * My course
 */
app.use("/course/mycourse", myCourseRouter);

/**
 * Course
 */
app.use("/course", courseRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
