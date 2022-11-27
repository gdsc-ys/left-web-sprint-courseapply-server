import express from "express";
import courseRouter from "./routes/course";
import healthRouter from "./routes/health";
import myCourseRouter from "./routes/mycourse";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/course", courseRouter);
app.use("/course/mycourse", myCourseRouter);
app.use("/health", healthRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
