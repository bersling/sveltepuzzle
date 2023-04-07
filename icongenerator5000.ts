const puppeteer = require("puppeteer");
const fs = require("fs");

const urlRoot = "http://localhost:5174";

/*
Converts a url where there is an element with an id #icon-screenshot
into an image.
*/
export async function convertUrlToIcon(
  urlPath: string,
  outputDir: string,
  outputFilename: string,
  quality: number = 90
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = `${urlRoot}/${urlPath}`;
    const targetFile = `${outputDir}/${outputFilename}.jpg`;

    await page.goto(url);

    console.info(
      `Puppeteer is visiting ${url}, writing result to ${targetFile} with a quality of ${quality}.`
    );

    // Set the viewport size to ensure the element is visible
    await page.setViewport({ width: 1280, height: 800 });

    // Wait for the element to be fully loaded and visible
    await page.waitForSelector("#icon-screenshot", { visible: true });

    // Add a short delay to ensure any animations or transitions have finished
    await page.waitForTimeout(1000);

    // Select the element to capture
    const element = await page.$("#icon-screenshot");

    // Get the element's bounding box
    const boundingBox = await element?.boundingBox();

    // Take a screenshot of the element
    const screenshot = await page.screenshot({
      type: "jpeg",
      quality,
      clip: boundingBox,
    });

    fs.mkdirSync(outputDir, { recursive: true });

    // Save the screenshot to a file
    fs.writeFileSync(targetFile, screenshot);

    await browser.close();
    resolve();
  });
}
