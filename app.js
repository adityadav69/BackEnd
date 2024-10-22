// import express from "express";
// import { config } from "dotenv";
// import cors from "cors";
// import { sendEmail } from "./utils/sendEmail.js";
// const app = express();
// const router = express.Router();

// config({ path: "./config.env" });

// app.use(
//   cors({
//     origin: 'https://frontend-azure-beta-28.vercel.app', // No trailing slash
//     methods: ["POST", "GET", "PUT", "DELETE"], // Include necessary methods
//     credentials: true, // Allow credentials
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// router.post("/send/mail", async (req, res, next) => {
//   const { name, email, message,contact } = req.body;
//   if (!name || !email || !message || !contact) {
//     return next(
//       res.status(400).json({
//         success: false,
//         message: "Please provide all details",
//       })
//     );
//   }
//   try {
//     await sendEmail({
//       email: "ssy81462@gmail.com.com",
//       subject: "GYM WEBSITE CONTACT",
//       message,
//       userEmail: email,
//       contact,
//     });
//     res.status(200).json({
//       success: true,
//       message: "Message Sent Successfully.",
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: " Internal Server Error",
//     });
//   }
// });

// app.use(router);

// app.listen(process.env.PORT, () => {
//   console.log(`Server listening at port ${process.env.PORT}`);
// });


import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { sendEmail } from "./utils/sendEmail.js";

const app = express();
const router = express.Router();

config({ path: "./config.env" });

// Configure CORS
app.use(
  cors({
    origin: 'https://frontend-azure-beta-28.vercel.app', // No trailing slash
    methods: ["POST", "GET", "PUT", "DELETE"], // Include all necessary methods
    credentials: true, // Allow credentials
  })
);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicitly handle preflight requests
app.options('*', cors());

router.post("/send/mail", async (req, res, next) => {
  const { name, email, message, contact } = req.body;
  if (!name || !email || !message || !contact) {
    return res.status(400).json({
      success: false,
      message: "Please provide all details",
    });
  }
  try {
    await sendEmail({
      email: "ssy81462@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
      contact,
    });
    res.status(200).json({
      success: true,
      message: "Message Sent Successfully.",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

// Use the router
app.use(router);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
