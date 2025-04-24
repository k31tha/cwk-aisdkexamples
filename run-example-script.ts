import * as path from "path";
import * as fs from "fs";
import { spawnSync } from "child_process";

// Get SDK type and directory argument from command line
const exampleSDK: string | undefined = process.argv[2]?.toUpperCase();
const dirArg: string = process.argv[3];

if (!exampleSDK || !["O", "A", "V"].includes(exampleSDK)) {
  console.error(
    "Please provide a valid SDK type as the first argument: O (OpenAI), A (Anthropic), or V (VercelAI)"
  );
  process.exit(1);
}

if (!dirArg) {
  console.error(
    'Please provide a directory argument (e.g., "01-01" for 01-text-generation/01-basic-prompt.ts)'
  );
  process.exit(1);
}

// Map SDK types to their directory names
const sdkDirectories: Record<string, string> = {
  V: "vercel-ai-sdk",
  O: "openai-sdk",
  A: "anthropic-sdk",
};

// The base directory where the example directories are located
const baseDir: string = "src/examples";

// Check if base directory exists
if (!fs.existsSync(baseDir)) {
  console.error(`Base directory "${baseDir}" does not exist`);
  process.exit(1);
}

// Get the SDK directory
const sdkDir = sdkDirectories[exampleSDK];
if (!sdkDir) {
  console.error(`No directory mapping found for SDK type "${exampleSDK}"`);
  process.exit(1);
}

// Handle different argument formats
let matchingDir: string | undefined;
let tsFile: string | undefined;

if (dirArg.includes("-")) {
  const [parent, child] = dirArg.split("-");

  // Construct the SDK path
  const sdkPath = path.join(baseDir, sdkDir);
  if (!fs.existsSync(sdkPath)) {
    console.error(`SDK directory not found: "${sdkPath}"`);
    process.exit(1);
  }

  // Get all directories in the SDK directory
  const sdkDirs = fs
    .readdirSync(sdkPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  // Find the parent directory (e.g., "01-text-generation")
  const parentDir = sdkDirs.find((dir) => dir.startsWith(parent));

  if (parentDir) {
    // Then look for the TypeScript file within the parent directory
    const parentPath = path.join(sdkPath, parentDir);
    if (!fs.existsSync(parentPath)) {
      console.error(`Directory not found: "${parentPath}"`);
      process.exit(1);
    }

    const tsFiles = fs
      .readdirSync(parentPath, { withFileTypes: true })
      .filter((dirent) => dirent.isFile() && dirent.name.endsWith(".ts"))
      .map((dirent) => dirent.name);

    // Look for files matching the pattern "01-*" or "01 *"
    tsFile = tsFiles.find((file) => {
      const filePrefix = file.split(/[- ]/)[0];
      return filePrefix === child;
    });

    if (tsFile) {
      matchingDir = path.join(sdkDir, parentDir, tsFile);
    }
  }
} else {
  // Fallback to original behavior for single directory
  const sdkPath = path.join(baseDir, sdkDir);
  const sdkDirs = fs
    .readdirSync(sdkPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
  matchingDir = sdkDirs.find((dir) => dir.startsWith(dirArg));
}

if (!matchingDir) {
  console.error(
    `No matching TypeScript file found for "${dirArg}" in ${baseDir}/${sdkDir}`
  );
  process.exit(1);
}

// Construct the path to the TypeScript file
const filePath: string = path.join(baseDir, matchingDir);

// Check if the file exists
if (!fs.existsSync(filePath)) {
  console.error(
    `Error: File not found: "${matchingDir}". Please check the file exists.`
  );
  process.exit(1);
}

console.log(`Running ${filePath}...`);

// Get any additional arguments to pass through
const additionalArgs = process.argv.slice(4);

// Run tsx with the path and any additional arguments
const result = spawnSync("tsx", [filePath, ...additionalArgs], {
  stdio: "inherit",
  shell: true,
  windowsHide: true,
  windowsVerbatimArguments: true,
  env: {
    ...process.env,
    // Pass the original command line arguments as an environment variable
    ORIGINAL_ARGS: JSON.stringify(process.argv.slice(4)),
  },
});

// Forward the exit code
process.exit(result.status ?? 1);
