# CWK AI SDK Examples

This repository contains example implementations and usage demonstrations for various AI SDKs, created as part of the Code with Keith (CWK) ai essential series.

## 🚀 Features

- Examples using VercelAI SDK
- Examples using OpenAI SDK
- Examples using Anthropic SDK
- TypeScript implementation
- Environment variable configuration

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
OPENAI_API_KEY=your_openai_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
```

## 🔧 Configuration

The project uses TypeScript and includes the following key dependencies:

- OpenAI SDK (@ai-sdk/openai v1.3.16)
- Anthropic SDK (@ai-sdk/anthropic v1.2.10)
- Anthropic Official SDK (@anthropic-ai/sdk v0.39.0)
- AI utilities (ai v4.3.9)

## 📖 Usage

Examples for different AI SDKs can be found in their respective directories. To run an example you can either run the script directly

```bash
pnpm tsx path/to/example.ts [todo]
```

or you can run using a supplied utility script

```bash
pnpm tsx run-example-script.ts <SDK> <DIR> [OPTIONS]
```

where:
<SDK> SDK type to use (required):
V - Vercel AI SDK
A - Anthropic SDK
O - OpenAI SDK

<DIR>       Directory pattern (required):
            Format: XX-YY (e.g., 01-01, 01-02)

[OPTIONS] Additional arguments (optional) see README.md in directory for example for Options

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📬 Contact

Project Link: [cwk-aisdkexamples](https://github.com/k31tha/cwk-aisdkexamples)

## 🙏 Acknowledgments

- [Code with Keith (CWK)](https://codewithkeith.co.uk) for the examples series
- OpenAI and Anthropic for their AI platforms
