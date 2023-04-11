import { convertUrlToIcon } from "./icongenerator5000";

export {};

process.setMaxListeners(15); // or a higher value if needed

const sharp = require("sharp");
const fs: any = require("fs");

async function convertFile(
  inputPath: string,
  outputDir: string,
  size: number,
  filename: string
): Promise<void> {
  console.info("continuing...");
  return new Promise(async (resolve, reject) => {
    const numRows = size;
    const numCols = size;

    await cutIntoPieces(outputDir, inputPath, numCols, numRows);
    writeSvelteFile(filename, numCols, numRows);

    if (filename === "racoon") {
      await writeIconFile(filename, numCols, numRows, true); // generate icon for root page
      await writeIcon(filename, true);
    }

    await writeIconFile(filename, numCols, numRows); // generate icon for /puzzle
    await writeIcon(filename);

    resolve();
  });
}

function cutIntoPieces(
  outputDir: string,
  inputPath: string,
  numCols: number,
  numRows: number
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Create the output directory if it doesn't exist
    fs.mkdirSync(outputDir, { recursive: true });

    // Load the input image
    sharp(inputPath).metadata((err: Error | undefined, metadata: any) => {
      if (err) {
        console.error(err);
        return;
      }

      // Calculate the dimensions of each piece
      const pieceWidth = Math.floor(metadata.width / numCols);
      const pieceHeight = Math.floor(metadata.height / numRows);

      // Split the input image into pieces and save each piece to a file
      for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
          const outputFilename = `output_${row}_${col}.jpg`;
          const left = col * pieceWidth;
          const top = row * pieceHeight;

          sharp(inputPath)
            .extract({ left, top, width: pieceWidth, height: pieceHeight })
            .toFile(`${outputDir}/${outputFilename}`, (err: any) => {
              if (err) {
                console.error(err);
                return;
              }
              resolve();
            });
        }
      }
    });
  });
}

function genericErrorHandler(err: any) {
  if (err) return console.error(err);
}

function writeIconFile(
  filename: string,
  numCols: number,
  numRows: number,
  isAlternative: boolean = false
): Promise<void> {
  return new Promise((resolve, reject) => {
    const fileContent = getIconComponent(
      filename,
      numCols,
      numRows,
      isAlternative
    );
    const pageDir = `./client/src/routes/puzzle/${filename}/icon`;
    fs.mkdirSync(pageDir, { recursive: true });
    fs.writeFileSync(
      `${pageDir}/+page.svelte`,
      fileContent,
      "utf8",
      genericErrorHandler
    );
    resolve();
  });
}

function writeIcon(
  filename: string,
  isAlternative: boolean = false
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const quality = 10;
    await convertUrlToIcon(
      `puzzle/${filename}/icon`,
      `./client/static/assets/puzzle-icon`,
      filename + (isAlternative ? "-alt" : ""), // add `-alt` to differentiate icons
      quality
    );
    resolve();
  });
}

function writeSvelteFile(filename: string, numCols: number, numRows: number) {
  const fileContent = getSvelteComponent(filename, numCols, numRows);
  const pageDir = `./client/src/routes/puzzle/${filename}`;
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFile(
    `${pageDir}/+page.svelte`,
    fileContent,
    "utf8",
    genericErrorHandler
  );
}

function getIconComponent(
  filename: string,
  numCols: number,
  numRows: number,
  isAlternative: boolean
) {
  return `<script lang="ts">
	import PuzzleIcon from '../../PuzzleIcon.svelte';

	const imageSrcRoot = '/assets/puzzle/${filename}';
	const numCols = ${numCols};
	const numRows = ${numRows};
  const isAlternative = ${isAlternative.toString()};
</script>

<PuzzleIcon {imageSrcRoot} {numRows} {numCols} {isAlternative} />

`;
}

function getSvelteComponent(
  filename: string,
  numCols: number,
  numRows: number
) {
  return `<script lang="ts">
	import PuzzleGame from '../PuzzleGame.svelte';

	const imageSrcRoot = '/assets/puzzle/${filename}';
	const numCols = ${numCols};
	const numRows = ${numRows};
</script>

<PuzzleGame {imageSrcRoot} {numRows} {numCols} />
`;
}

function generateItemsForOverviewPage(files: string[]) {
  return `
  export const PUZZLE_PAGES = [
    ${files.map((file) => {
      const filenameWithoutExtension = file.split(".jpg")[0];
      return `{
				link: './puzzle/${filenameWithoutExtension}',
				jpg: '/assets/puzzle-icon/${file}'
			}`;
    })}
  ]
  `;
}

async function convertAll() {
  const inputDir = `./artwork/puzzle/export`;
  const files: string[] = fs.readdirSync(inputDir);
  const outputDirRoot = "./client/static/assets/puzzle";
  fs.mkdirSync(outputDirRoot, { recursive: true });
  fs.writeFileSync(
    `./client/src/routes/puzzle/puzzle-pages.ts`,
    generateItemsForOverviewPage(files),
    "utf8"
  );
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    console.info(file, i);
    const filenameWithoutExtension = file.split(".")[0];
    const outputDir = `${outputDirRoot}/${filenameWithoutExtension}`;
    const size = i < 18 ? 2 : i < 36 ? 3 : 4;
    await convertFile(
      `${inputDir}/${file}`,
      outputDir,
      size,
      filenameWithoutExtension
    );
  }
}

convertAll();
