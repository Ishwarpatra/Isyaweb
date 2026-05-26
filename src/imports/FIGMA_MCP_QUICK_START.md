# 🚀 FIGMA MCP QUICK START CARD

---

## **INSTALLATION (Run Once)**

```bash
# 1. Install Figma tools
npm install --save-dev @figma/code-connect figma

# 2. Install other essentials
npm install --save-dev style-dictionary @storybook/react
```

---

## **CONFIGURATION (Run Once)**

### Get Figma Credentials:

1. **Get File Key:**
   - Open Figma: https://www.figma.com/design/
   - Copy URL: `https://www.figma.com/design/[FILE_KEY]/...`
   - Save `FILE_KEY` value

2. **Create Access Token:**
   - Go to: Figma Settings → Account → Personal access tokens
   - Click: "Create new token"
   - Copy token (save in safe place!)

### Create `.env.local`:

```bash
cat > .env.local << EOF
FIGMA_FILE_KEY=paste-file-key-here
FIGMA_ACCESS_TOKEN=paste-token-here
EOF
```

---

## **DAILY WORKFLOW (Run These)**

### **Option A: Quick Sync (Recommended)**

```bash
# Step 1: Sync from Figma
npm run design:sync

# Step 2: Generate design tokens
npm run tokens:generate

# Step 3: View in Storybook
npm run storybook

# Now visit: http://localhost:6006
```

### **Option B: Full Setup**

```bash
# Step 1: Export design specs
npm run design:export

# Step 2: Generate React components
npm run components:generate

# Step 3: Generate design tokens
npm run tokens:generate

# Step 4: Create Code Connect mappings
npm run code-connect:setup

# Step 5: Publish to Figma
npm run code-connect:publish

# Step 6: View in Storybook
npm run storybook
```

### **Option C: Just Use Figma CLI**

```bash
# List all commands
npx figma --help

# Get file info
npx figma file-info --file-key=$FIGMA_FILE_KEY

# Export components
npx figma export-components --file-key=$FIGMA_FILE_KEY --output=./exports

# Export assets
npx figma export-assets --file-key=$FIGMA_FILE_KEY --format=svg --output=./src/assets
```

---

## **COMMON TASKS**

### **Sync Design Tokens**

```bash
npm run design:sync
```

✓ Fetches colors, typography, spacing from Figma  
✓ Saves to `src/tokens/`

---

### **Generate New Component**

```bash
npm run components:generate
```

✓ Creates React component files  
✓ Sets up CSS modules  
✓ Ready for customization

---

### **View Components in Storybook**

```bash
npm run storybook
```

✓ Opens: http://localhost:6006  
✓ Shows all component variants  
✓ Hot reload enabled

---

### **Update Figma Links (Code Connect)**

```bash
npm run code-connect:setup      # Create mappings
npm run code-connect:publish    # Push to Figma
```

✓ Designers see code links in Figma  
✓ Jump from design to code instantly

---

## **ENVIRONMENT SETUP CHECK**

```bash
# Verify everything is installed
node --version          # Should be v16+
npm --version          # Should be v8+
npx figma --version

# Check credentials are loaded
echo $FIGMA_FILE_KEY
echo $FIGMA_ACCESS_TOKEN
```

---

## **TROUBLESHOOTING**

### **"FIGMA_ACCESS_TOKEN not found"**

```bash
# Set it manually in terminal
export FIGMA_FILE_KEY="your-key"
export FIGMA_ACCESS_TOKEN="your-token"

# Verify
echo $FIGMA_ACCESS_TOKEN

# Try again
npm run design:sync
```

---

### **"Cannot find module @figma/code-connect"**

```bash
# Reinstall
npm cache clean --force
rm -rf node_modules
npm install
npm install --save-dev @figma/code-connect
```

---

### **"File not found"**

```bash
# Check file key is correct
# URL: https://www.figma.com/design/[FILE_KEY]/...
echo $FIGMA_FILE_KEY

# Test connection
npx figma file-info --file-key=$FIGMA_FILE_KEY
```

---

## **COMPLETE SETUP FROM SCRATCH**

**Copy & paste this entire block:**

```bash
#!/bin/bash

# 1. Install tools
echo "Installing Figma tools..."
npm install --save-dev @figma/code-connect figma style-dictionary

# 2. Set up environment
echo "Setting up environment..."
read -p "Enter Figma FILE_KEY: " FILE_KEY
read -p "Enter Figma ACCESS_TOKEN: " TOKEN

cat > .env.local << EOF
FIGMA_FILE_KEY=$FILE_KEY
FIGMA_ACCESS_TOKEN=$TOKEN
EOF

# 3. Create directories
mkdir -p .figma src/tokens src/designs

# 4. Initial sync
echo "Syncing Figma designs..."
npm run design:sync

# 5. Generate tokens
echo "Generating design tokens..."
npm run tokens:generate

# 6. Done!
echo "✅ Setup complete!"
echo "Next: npm run storybook"
```

---

## **SCRIPT REFERENCE**

Add these to `package.json` under `"scripts"`:

```json
{
  "scripts": {
    "design:sync": "node scripts/sync-figma.js",
    "design:export": "npx figma export-components --file-key=$FIGMA_FILE_KEY --output=./exports",
    "tokens:generate": "style-dictionary build",
    "components:generate": "node scripts/generate-components.js",
    "code-connect:setup": "figma code-connect create",
    "code-connect:publish": "figma code-connect publish",
    "storybook": "storybook dev -p 6006",
    "storybook:build": "storybook build",
    "dev": "vite",
    "build": "vite build"
  }
}
```

---

## **WORKFLOW DIAGRAM**

```
┌─────────────────────────────────────────────────────┐
│ FIGMA DESIGN FILE (Figma.com)                       │
│ - Button components                                 │
│ - Color tokens                                      │
│ - Typography styles                                 │
└────────────────────┬────────────────────────────────┘
                     │
                     ↓ npm run design:sync
                     ↓ npm run design:export
                     │
┌─────────────────────────────────────────────────────┐
│ LOCAL CODE (Your computer)                          │
│ - src/tokens/colors.json                            │
│ - src/designs/components.json                       │
│ - src/components/ (generated)                       │
└────────────────────┬────────────────────────────────┘
                     │
        ↙────────────┼────────────↖
        │            │            │
        ↓            ↓            ↓
   npm run     npm run        npm run
   tokens:     components:    storybook
   generate    generate
        │            │            │
        ↓            ↓            ↓
   src/styles/  src/components/  http://
   variables    Button.tsx        localhost:6006
        │            │            │
        └────────────┼────────────┘
                     │
                     ↓ npm run code-connect:publish
                     │
┌─────────────────────────────────────────────────────┐
│ FIGMA (Back to design file)                         │
│ - Code Connect links visible                        │
│ - Designers see React component links               │
└─────────────────────────────────────────────────────┘
```

---

## **CHECKPOINTS**

✅ **Before you start:**
- [ ] Node.js v16+ installed
- [ ] npm v8+ installed
- [ ] Figma account created
- [ ] Access to ISYA design file

✅ **After installation:**
- [ ] `.env.local` created with credentials
- [ ] `npm install` completed
- [ ] `npx figma --version` works

✅ **First run:**
- [ ] `npm run design:sync` succeeds
- [ ] Files appear in `src/tokens/`
- [ ] `npm run storybook` starts without errors

✅ **After setup:**
- [ ] Storybook shows components
- [ ] Code Connect mappings created
- [ ] Design and code in sync

---

## **SUPPORT COMMANDS**

```bash
# Help with Figma CLI
npx figma --help

# Help with npm scripts
npm run --list

# Check what's installed
npm list @figma/code-connect
npm list figma

# View environment variables
printenv | grep FIGMA

# Test Figma connection
npx figma file-info --file-key=$FIGMA_FILE_KEY
```

---

## **KEYBOARD SHORTCUTS (In Figma)**

| Action | Shortcut |
|--------|----------|
| Open design file | Cmd+O (Mac) / Ctrl+O (Windows) |
| Search components | Cmd+/ (Mac) / Ctrl+/ (Windows) |
| View code panel | Cmd+Option+C (Mac) / Ctrl+Alt+C (Windows) |
| Export component | Right-click → Export |

---

## **NEXT STEPS**

1. **Copy the setup block above**
2. **Run it in your terminal**
3. **Update `.env.local` with your Figma credentials**
4. **Run: `npm run design:sync`**
5. **Run: `npm run storybook`**
6. **Visit: http://localhost:6006**
7. **Start building components! 🎉**

---

**Questions?** Check `FIGMA_MCP_SETUP_RUNBOOK.md` for detailed explanations.

**Version:** 1.0 | **Date:** May 17, 2026
