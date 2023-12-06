const express = require("express");
const multipart = require("connect-multiparty");

const fs = require("fs");

const md_upload = multipart({ uploadDir: "./uploads" });

const app = express();
const port = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const systemUser = process.env.USER;
console.log(`System user: ${systemUser}`);

fs.access(md_upload.uploadDir, (err) => {
  if (err) {
    console.error(`Error accessing ./uploads folder: ${err.message}`);
  } else {
    console.log(`Permissions for ./uploads folder: Readable and Writable`);
  }
});

// Route
app.post("/create", [md_upload], (req, res) => {
  // Access uploaded file details
  const file = req.files.file;
  console.log("Uploaded file:", file);

  // Implement Cloudinary or other logic here

  // Respond to the client
  res.json({ message: "File uploaded successfully" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
