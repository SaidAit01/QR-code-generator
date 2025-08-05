import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      message: "Type in your URL",
      name: "URL",
    },
  ])
  .then((answers) => {
    const url = answers.URL;

    // Create QR code
    const qr_svg = qr.image(url, { type: "png" });

    // Save image
    const imagePath = "qr_img.png";
    qr_svg.pipe(fs.createWriteStream(imagePath));

    // Save URL to text file
    fs.writeFile("URL.txt", url, (err) => {
      if (err) throw err;
      console.log("URL saved to URL.txt");
    });

    console.log(`QR code saved to ${imagePath}`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in this environment.");
    } else {
      console.error("Something went wrong:", error);
    }
  });
