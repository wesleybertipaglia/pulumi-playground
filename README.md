# 🐤 Pulumi Playground

> **“A yellow chick exploring the clouds.”** ☁️✨  
> Test, learn, and play with Pulumi templates in a safe and fun environment.

Pulumi Playground is a **terminal-based interactive tool** that lets you spin up and destroy Pulumi stacks in minutes — all with the help of a curious little chick 🐣.

Pick from dozens of official Pulumi templates or load your own config file.  
Perfect for **learning**, **rapid prototyping**, or just having **fun with Infrastructure as Code**.

## 🌟 Features

- 🎛️ **Interactive CLI experience** with menus and shortcuts
- 📦 Supports **official Pulumi templates** (AWS, GCP, Azure, and more)
- 📂 Load your own config file (`.yaml` / `.json`)
- 🚀 Deploy in seconds with no boilerplate
- 🧹 Automatic cleanup after 5 minutes (keep your bills — and your clouds — tidy)
- 🐤 **Adorable branding** — because the cloud doesn’t have to be boring

## 📁 Project Structure

```bash
.
├── controllers/         # Application logic
├── services/            # Pulumi stack operations
├── views/               # CLI interfaces & menus
├── data/templates.list.ts
├── types/
└── index.ts             # App entry point
```

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/en/download/)
- [Pulumi CLI](https://www.pulumi.com/docs/iac/download-install/)

### 2. Login to Pulumi

```bash
pulumi login
```

### 3. Run the Playground

```bash
# Install dependencies
npm install

# Run the app
npm start
```

## 🧪 Usage

```bash
# Choose how to start
☄️  Load from config file
🦠  Select a Pulumi template

# Then pick a template like:
☁️  AWS - S3 Bucket
☁️  GCP - Cloud Storage
☁️  Azure - Blob Storage
...
```

> And voilà! Your playground is ready to go — your Pulumi stack is deployed, isolated, and temporary.  
> By default, it will self-destruct in 5 minutes. Just like a sandcastle at sunset 🌅

## 🤝 Contributing

We love new ideas, cute puns, and cloud magic.  
Got a cool feature in mind? Want to improve UX?  
Or maybe you just wanna make the chick more fashionable?

**Let’s hatch something great — together.** 🐣✨

## 📜 License

MIT License – see the [LICENSE](LICENSE) file for details.

**Made with ☁️ & ❤️ by a yellow chick**
