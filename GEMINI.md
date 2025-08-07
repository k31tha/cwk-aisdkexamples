# Gemini AI SDK Examples

This document provides information and usage instructions for the Gemini AI SDK examples within the CWK AI SDK Examples repository.

## 🚀 Features

The following examples are available for the Gemini AI SDK:

- **Text Generation:**
  - `01-basic-prompt.ts`: Demonstrates a basic text generation prompt.
  - `02-basic-prompt-with-user-input.ts`: Shows how to incorporate user input into a prompt.
  - `03-prompt-add-system.ts`: Adds a system message to the prompt.
  - `04-prompt-add-role.ts`: Demonstrates using different roles in the prompt.
  - `05-show-tokens-used.ts`: Shows how to get token usage information.

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- pnpm (v10.7.1 or later)

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/k31tha/cwk-aisdkexamples.git
cd cwk-aisdkexamples
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up your environment variables:
   - create file `.env`
   - Add your API keys:

```env
GOOGLE_API_KEY=your_google_key_here
```

## 📖 Usage

Examples for the Gemini AI SDK can be found in the `src/examples/gemini-sdk` directory. To run an example, you can use the provided utility script:

```bash
pnpm tsx run-example-script.ts <SDK> <DIR> [OPTIONS]
```

where:
- `<SDK>`: Use 'G' for the Gemini AI SDK.
- `<DIR>`: The directory pattern for the example (e.g., `01-01`, `01-02`).
- `[OPTIONS]`: Additional arguments (see the `README.md` in the example's directory for options).

### Example

To run the basic prompt example for Gemini:

```bash
pnpm tsx run-example-script.ts G 01-01
```

## 📂 Directory

The Gemini examples are located at: `src/examples/gemini-sdk`
