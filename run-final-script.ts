import * as path from "path";
import * as fs from "fs";
import { spawnSync } from "child_process";

// Get SDK type and directory argument from command line
const finalSDK: string | undefined = process.argv[2]?.toUpperCase();
const dirArg: string = process.argv[3];

if (!finalSDK || !["O", "A", "V"].includes(finalSDK)) {
  console.error(
    "Please provide a valid SDK type as the first argument: O (OpenAI), A (Anthropic), or V (VercelAI)"
  );
  process.exit(1);
}

if (!dirArg) {
  console.error(
    'Please provide a directory argument (e.g., "01" for 01-text-generation/index.ts)'
  );
  process.exit(1);
}

// Map SDK types to their file names
const sdkFiles: Record<string, string> = {
  V: "vercel-ai-sdk",
  O: "openai-sdk",
  A: "anthropic-sdk",
};

// Handle different argument formats
let matchingDir: string | undefined;

// Base path is src/final
const finalPath = path.join("src", "final");

// Get all directories in src/final
const finalDirs = fs
  .readdirSync(finalPath, { withFileTypes: true })
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name);

//console.log("Available directories:", finalDirs);

if (dirArg.includes("-")) {
  const [parent, child] = dirArg.split("-");
  // Look for directory matching parent-child pattern
  const targetDir = finalDirs.find((dir) =>
    dir.startsWith(`${parent}-${child}`)
  );
  if (targetDir) {
    matchingDir = path.join(finalPath, targetDir, "index.ts");
    console.log("Found matching directory:", targetDir);
  }
} else {
  // For single argument, look for directory starting with the pattern
  const targetDir = finalDirs.find((dir) => dir.startsWith(dirArg));
  if (targetDir) {
    matchingDir = path.join(finalPath, targetDir, "index.ts");
    //console.log("Found matching directory:", targetDir);
  }
}

if (!matchingDir) {
  console.error(`No matching directory found for "${dirArg}" in ${finalPath}/`);
  process.exit(1);
}

// Check if the file exists
if (!fs.existsSync(matchingDir)) {
  console.error(
    `Error: File not found: "${matchingDir}". Please check the file exists.`
  );
  process.exit(1);
}

console.log("Running file:", matchingDir);

// Get any additional arguments to pass through
const additionalArgs = process.argv.slice(4);

// Run tsx with the path and any additional arguments, including the SDK file
const result = spawnSync(
  "tsx",
  [matchingDir, sdkFiles[finalSDK], ...additionalArgs],
  {
    stdio: "inherit",
    shell: true,
    windowsHide: true,
    windowsVerbatimArguments: true,
    env: {
      ...process.env,
      // Pass the original command line arguments as an environment variable
      ORIGINAL_ARGS: JSON.stringify(process.argv.slice(4)),
    },
  }
);

// Forward the exit code
process.exit(result.status ?? 1);
