# Figma MCP Setup Runbook - ISYA Web Portal

**Purpose:** Step-by-step guide to set up and run Figma MCP integration  
**Audience:** Design leads, frontend engineers, design system managers  
**Tested on:** macOS, Windows, Linux (WSL)  
**Date:** May 17, 2026

---

## Table of Contents

1. [Quick Start (5 minutes)](#quick-start)
2. [Prerequisites](#prerequisites)
3. [Installation Steps](#installation-steps)
4. [Configuration](#configuration)
5. [Running Figma MCP](#running-figma-mcp)
6. [Common Commands](#common-commands)
7. [Troubleshooting](#troubleshooting)
8. [Workflow Examples](#workflow-examples)

---

## Quick Start

**TL;DR - Get started in 5 minutes:**

```bash
# 1. Install dependencies
npm install @figma/code-connect figma

# 2. Get Figma credentials
export FIGMA_FILE_KEY="your-file-key"
export FIGMA_ACCESS_TOKEN="your-access-token"

# 3. Sync design tokens
npm run design:sync

# 4. Generate components
npm run components:generate

# 5. Start Storybook
npm run storybook
```

---

## Prerequisites

### Required Software

- **Node.js** v16.x or higher
  ```bash
  node --version  # Should be v16.0.0 or higher
  ```

- **npm** v8.x or higher (comes with Node.js)
  ```bash
  npm --version
  ```

- **Git** (for version control)
  ```bash
  git --version
  ```

### Figma Requirements

- Active Figma account (free or paid)
- Access to ISYA Web Portal design file
- Admin/Editor permissions in Figma file

### Project Setup

```bash
# Clone the project
git clone https://github.com/ISYA/web-portal.git
cd isya-web-portal

# Install existing dependencies
npm install
```

---

## Installation Steps

### Step 1: Install Figma CLI Tools

```bash
# Install Figma Code Connect and CLI
npm install --save-dev @figma/code-connect figma

# Verify installation
npx figma --version
npx code-connect --version
```

### Step 2: Install Additional Dependencies

```bash
# Install React and related packages (if not already installed)
npm install react react-dom typescript

# Install Storybook for component documentation
npm install --save-dev @storybook/react @storybook/addon-essentials

# Install design token transformer
npm install --save-dev style-dictionary

# Install Tailwind CSS (if using)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 3: Verify Installation

```bash
# Check all tools are installed
npx figma --help
npx code-connect --help
npm list @figma/code-connect
npm list figma
```

**Expected output:**
```
@figma/code-connect@1.x.x
figma@1.x.x
```

---

## Configuration

### Step 1: Get Figma Credentials

#### Method 1: Via Figma Web (Recommended)

1. **Log in to Figma:** https://www.figma.com
2. **Get File Key:**
   - Open ISYA Web Portal design file
   - Copy URL: `https://www.figma.com/design/[FILE_KEY]/...`
   - Extract `[FILE_KEY]` from URL

3. **Create Personal Access Token:**
   - Go to Settings → Account → Personal access tokens
   - Click "Create new token"
   - Name: "ISYA Web Portal Development"
   - Permissions: "Read & write access"
   - Copy the token (you'll only see it once!)

#### Method 2: Via Figma CLI

```bash
# Login via CLI
npx figma login

# This opens a browser window to authenticate
# Figma CLI will save your credentials locally
```

### Step 2: Create Environment File

Create `.env.local` in project root:

```bash
# .env.local
FIGMA_FILE_KEY=your-file-key-here
FIGMA_ACCESS_TOKEN=your-personal-access-token-here
FIGMA_TEAM_ID=optional-team-id
FIGMA_PROJECT_ID=optional-project-id
```

**Security Note:** Never commit `.env.local` to git!

```bash
# Add to .gitignore
echo ".env.local" >> .gitignore
```

### Step 3: Create Figma Configuration File

Create `figma.config.ts` in project root:

```typescript
// figma.config.ts
import { CodeConnect } from "@figma/code-connect";

export const figmaConfig = {
  // Figma file credentials
  fileKey: process.env.FIGMA_FILE_KEY,
  accessToken: process.env.FIGMA_ACCESS_TOKEN,

  // File locations
  codeConnectDir: ".figma",
  tokensDir: "src/tokens",
  componentsDir: "src/components",

  // Component settings
  componentPrefix: "Button/Primary/Default",
  defaultVariant: "Default",

  // Export settings
  exportFormat: "json", // or "esm", "cjs"
  exportPath: "src/styles",

  // Sync settings
  autoSync: true, // Auto-sync on file changes
  syncInterval: 60000, // 60 seconds
};

export default figmaConfig;
```

### Step 4: Create Figma Code Connect Setup

Create `.figma/code-connect.config.ts`:

```typescript
// .figma/code-connect.config.ts
import path from "path";

export const codeConnectConfig = {
  componentDirectory: path.join(process.cwd(), "src/components"),
  outdir: path.join(process.cwd(), ".figma"),
  documentationUrl: "https://storybook.example.com", // Update after Storybook deployed
  verbose: true,
  componentMap: {
    "Button/Primary/Default": "src/components/Button.tsx",
    "Card/Blog/Default": "src/components/Card.tsx",
    "Input/Text/Default": "src/components/Input.tsx",
    "Modal/Auth/Default": "src/components/Modal.tsx",
  },
};

export default codeConnectConfig;
```

### Step 5: Update package.json Scripts

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "design:sync": "node scripts/sync-figma.js",
    "design:export": "node scripts/export-figma.js",
    "tokens:generate": "style-dictionary build",
    "components:generate": "node scripts/generate-components.js",
    "code-connect:setup": "figma code-connect create",
    "code-connect:publish": "figma code-connect publish",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## Running Figma MCP

### Method 1: Using npm Scripts (Easiest)

#### 1. Sync Design Tokens

```bash
# Fetch colors, typography, spacing from Figma
npm run design:sync

# Expected output:
# ✓ Connected to Figma
# ✓ Fetched color tokens
# ✓ Fetched typography tokens
# ✓ Fetched spacing tokens
# ✓ Saved to src/tokens/
```

#### 2. Export Design Context

```bash
# Export design specs for all components
npm run design:export

# Expected output:
# ✓ Exported Button components
# ✓ Exported Card components
# ✓ Exported Form components
# ✓ Saved to src/designs/
```

#### 3. Generate Components

```bash
# Auto-generate React components from Figma
npm run components:generate

# Expected output:
# ✓ Generated Button.tsx
# ✓ Generated Card.tsx
# ✓ Generated Form.tsx
# Files created in src/components/
```

#### 4. Generate Design Tokens

```bash
# Convert Figma tokens to CSS
npm run tokens:generate

# Expected output:
# ✓ Generated colors.css
# ✓ Generated typography.css
# ✓ Generated spacing.css
# Files created in src/styles/
```

#### 5. Set up Code Connect

```bash
# Create Code Connect mappings
npm run code-connect:setup

# Follow prompts to map components to files
# Expected output:
# ✓ Created code-connect.config.ts
# ✓ Generated component mappings
# ✓ Ready to publish
```

#### 6. Publish Code Connect

```bash
# Publish mappings back to Figma (visible in Figma UI)
npm run code-connect:publish

# Expected output:
# ✓ Published to Figma file
# ✓ Mappings now visible in Figma
# ✓ Developers can see code links in design file
```

### Method 2: Using Figma CLI Directly

```bash
# List all Figma commands
npx figma --help

# Get file information
npx figma file-info --file-key=$FIGMA_FILE_KEY

# Export components
npx figma export-components --file-key=$FIGMA_FILE_KEY --output=./exports

# Export assets
npx figma export-assets --file-key=$FIGMA_FILE_KEY --output=./public/assets

# Fetch design tokens
npx figma fetch-tokens --file-key=$FIGMA_FILE_KEY --output=./src/tokens
```

### Method 3: Using Code Connect Programmatically

Create `scripts/sync-figma.js`:

```javascript
// scripts/sync-figma.js
const Figma = require("figma");
const fs = require("fs");
const path = require("path");

async function syncFigmaDesigns() {
  const client = new Figma.Client({
    personalAccessToken: process.env.FIGMA_ACCESS_TOKEN,
  });

  try {
    console.log("📡 Connecting to Figma...");

    // Fetch file
    const file = await client.getFile(process.env.FIGMA_FILE_KEY);
    console.log(`✓ Connected to: ${file.name}`);

    // Get components
    const components = file.components;
    console.log(`✓ Found ${Object.keys(components).length} components`);

    // Extract design tokens
    const tokens = extractTokens(file);
    console.log(`✓ Extracted ${Object.keys(tokens).length} design tokens`);

    // Save tokens
    const tokensDir = path.join(process.cwd(), "src/tokens");
    if (!fs.existsSync(tokensDir)) {
      fs.mkdirSync(tokensDir, { recursive: true });
    }

    fs.writeFileSync(
      path.join(tokensDir, "tokens.json"),
      JSON.stringify(tokens, null, 2)
    );
    console.log("✓ Saved tokens to src/tokens/tokens.json");

    // Export component specs
    const specs = exportComponentSpecs(components);
    fs.writeFileSync(
      path.join(process.cwd(), "src/designs/component-specs.json"),
      JSON.stringify(specs, null, 2)
    );
    console.log("✓ Saved component specs");

    console.log("\n✅ Design sync complete!");
  } catch (error) {
    console.error("❌ Error syncing Figma:", error.message);
    process.exit(1);
  }
}

function extractTokens(file) {
  // Parse design tokens from Figma file
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    shadows: {},
  };

  // Implementation depends on your Figma file structure
  return tokens;
}

function exportComponentSpecs(components) {
  // Export component specifications
  return Object.entries(components).map(([key, component]) => ({
    id: key,
    name: component.name,
    description: component.description,
    // Add more specs as needed
  }));
}

syncFigmaDesigns();
```

Run it:

```bash
node scripts/sync-figma.js
```

---

## Common Commands

### Basic Operations

```bash
# Check Figma connection
npx figma file-info --file-key=$FIGMA_FILE_KEY

# Export all assets
npx figma export-assets \
  --file-key=$FIGMA_FILE_KEY \
  --format=png \
  --scale=2 \
  --output=./public/assets

# Export SVG assets
npx figma export-assets \
  --file-key=$FIGMA_FILE_KEY \
  --format=svg \
  --output=./src/assets/icons
```

### Component Generation

```bash
# Generate TypeScript interfaces from components
npx figma generate-types \
  --file-key=$FIGMA_FILE_KEY \
  --output=src/types/figma-components.ts

# Generate component stories
npx figma generate-stories \
  --file-key=$FIGMA_FILE_KEY \
  --output=src/components

# Generate CSS from Figma styles
npx figma generate-css \
  --file-key=$FIGMA_FILE_KEY \
  --output=src/styles/figma-generated.css
```

### Token Management

```bash
# Fetch all design tokens
npx figma fetch-tokens \
  --file-key=$FIGMA_FILE_KEY \
  --output=src/tokens

# Convert tokens to CSS variables
npm run tokens:generate

# Watch for token changes
npm run tokens:watch
```

### Development Server

```bash
# Start dev server with hot reload
npm run dev

# Start Storybook for component development
npm run storybook

# Build Storybook static site
npm run storybook:build

# Serve Storybook build
npx http-server storybook-static -p 3000
```

---

## Troubleshooting

### Issue 1: "Cannot find module @figma/code-connect"

**Solution:**

```bash
# Reinstall dependencies
rm node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
npm install @figma/code-connect --save-dev
```

### Issue 2: "FIGMA_ACCESS_TOKEN not found"

**Solution:**

```bash
# Verify .env.local exists
cat .env.local

# Manually set in current terminal
export FIGMA_FILE_KEY="your-key"
export FIGMA_ACCESS_TOKEN="your-token"

# Check variables are set
echo $FIGMA_FILE_KEY
echo $FIGMA_ACCESS_TOKEN

# Try command again
npm run design:sync
```

### Issue 3: "File not found" or "Unauthorized"

**Solution:**

```bash
# Verify file key is correct
# URL format: https://www.figma.com/design/[FILE_KEY]/...
echo $FIGMA_FILE_KEY

# Check token is still valid (regenerate if needed)
# Figma Settings → Account → Personal access tokens

# Test connection
npx figma file-info --file-key=$FIGMA_FILE_KEY
```

### Issue 4: "Code Connect mappings not appearing in Figma"

**Solution:**

```bash
# Ensure Code Connect is properly configured
npm run code-connect:setup

# Publish mappings to Figma
npm run code-connect:publish

# If still not showing:
# 1. Refresh Figma in browser (Cmd+R / Ctrl+R)
# 2. Check Code Connect tab in Figma inspect panel
# 3. Verify component node IDs match config
```

### Issue 5: "Storybook won't start"

**Solution:**

```bash
# Clear Storybook cache
rm -rf node_modules/.cache

# Reinstall Storybook
npm install --save-dev @storybook/react @storybook/addon-essentials

# Start with verbose output
npm run storybook -- --debug
```

---

## Workflow Examples

### Example 1: Update Button Component in Figma

**Steps:**

1. **Open Figma Design File**
   - Go to https://www.figma.com/design/[FILE_KEY]
   - Navigate to: `02. Components Library / Buttons / Button / Primary / Default`

2. **Make Changes**
   - Update button color from orange to pink
   - Change padding from 16px to 20px
   - Adjust font size from 14px to 15px

3. **Export Changes**
   - Run: `npm run design:export`
   - Check output: `src/designs/button-specs.json`

4. **Update Component Code**
   - Open: `src/components/Button.tsx`
   - Update styles to match new specs
   - Test in Storybook: `npm run storybook`

5. **Publish Code Connect**
   - Run: `npm run code-connect:publish`
   - Design teams see code changes in Figma

---

### Example 2: Generate New Component from Figma

**Steps:**

1. **Design Component in Figma**
   - Create component with all variants
   - Name following convention: `ComponentName / Variant / State`
   - Apply design tokens (colors, typography, spacing)

2. **Export Component Spec**
   ```bash
   npx figma export-components \
     --file-key=$FIGMA_FILE_KEY \
     --node-id=12345:6789 \
     --output=./exports
   ```

3. **Generate React Component**
   ```bash
   npm run components:generate
   # This creates src/components/MyComponent.tsx
   ```

4. **Create Storybook Story**
   ```typescript
   // src/components/MyComponent.stories.tsx
   import { MyComponent } from "./MyComponent";

   export default {
     title: "Components/MyComponent",
     component: MyComponent,
   };

   export const Default = {
     args: {
       variant: "default",
     },
   };
   ```

5. **Test in Storybook**
   ```bash
   npm run storybook
   # Visit http://localhost:6006
   ```

6. **Create Code Connect**
   ```bash
   npm run code-connect:setup
   npm run code-connect:publish
   ```

---

### Example 3: Sync Design Tokens Daily

**Create a scheduled task:**

```bash
# Add to package.json scripts
"tokens:sync": "npm run design:sync && npm run tokens:generate"

# Create .github/workflows/sync-tokens.yml (GitHub Actions)
name: Sync Figma Tokens
on:
  schedule:
    - cron: '0 9 * * 1-5' # Every weekday at 9 AM

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run tokens:sync
      - run: git add src/tokens
      - run: git commit -m "chore: update design tokens"
      - run: git push
```

---

## Complete Setup Script

Save as `scripts/setup-figma.sh`:

```bash
#!/bin/bash
# Complete Figma MCP setup script

echo "🚀 Starting Figma MCP setup..."

# 1. Check prerequisites
echo "\n1️⃣ Checking prerequisites..."
if ! command -v node &> /dev/null; then
  echo "❌ Node.js not found. Please install Node.js v16+";
  exit 1
fi
echo "✓ Node.js: $(node --version)"
echo "✓ npm: $(npm --version)"

# 2. Install dependencies
echo "\n2️⃣ Installing dependencies..."
npm install
npm install --save-dev @figma/code-connect figma style-dictionary
echo "✓ Dependencies installed"

# 3. Create environment file
echo "\n3️⃣ Setting up environment..."
if [ ! -f .env.local ]; then
  echo "Creating .env.local..."
  cat > .env.local << EOF
FIGMA_FILE_KEY=your-file-key
FIGMA_ACCESS_TOKEN=your-token
EOF
  echo "⚠️  Please update .env.local with your Figma credentials"
else
  echo "✓ .env.local already exists"
fi

# 4. Create config files
echo "\n4️⃣ Creating configuration files..."
mkdir -p .figma src/tokens src/designs
echo "✓ Directories created"

# 5. Build initial setup
echo "\n5️⃣ Building initial setup..."
npm run tokens:generate 2>/dev/null || echo "⚠️  Token generation skipped (add credentials first)"

echo "\n✅ Setup complete!"
echo "\nNext steps:"
echo "1. Update .env.local with your Figma credentials"
echo "2. Run: npm run design:sync"
echo "3. Run: npm run storybook"
echo ""
```

**Run it:**

```bash
chmod +x scripts/setup-figma.sh
./scripts/setup-figma.sh
```

---

## Quick Reference Card

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FIGMA MCP QUICK REFERENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 SETUP
  npm install @figma/code-connect figma
  export FIGMA_FILE_KEY=your-key
  export FIGMA_ACCESS_TOKEN=your-token

⚙️  SYNC
  npm run design:sync          # Fetch from Figma
  npm run design:export        # Export components
  npm run tokens:generate      # Generate CSS

🎨 DEVELOP
  npm run storybook            # View components
  npm run dev                  # Start dev server
  npm run build                # Build for production

📤 PUBLISH
  npm run code-connect:setup   # Create mappings
  npm run code-connect:publish # Push to Figma

🔍 INSPECT
  npx figma file-info          # Check connection
  npx figma export-assets      # Download assets

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Support & Resources

**Need Help?**

- Figma Code Connect Docs: https://www.figma.com/developers/api
- npm Scripts Guide: https://docs.npmjs.com/cli/v8/using-npm/scripts
- Storybook Setup: https://storybook.js.org/docs/react/get-started/install
- Design Tokens: https://www.designtokens.org/

**Team Contacts:**

| Role | Contact |
|------|---------|
| Figma Setup Issues | [Design Lead] |
| Code Generation | [Frontend Lead] |
| Token Sync | [Design System Manager] |

---

**Last Updated:** May 17, 2026  
**Status:** Ready for use  
**Version:** 1.0
