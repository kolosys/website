# Node.js 22 Upgrade

Successfully upgraded the entire project to Node.js 22.

## 📦 Changes Made

### 1. Package Configuration
**File: `package.json`**
```json
"engines": {
  "node": ">=22.0.0",
  "pnpm": ">=8.0.0"
}
```

### 2. Netlify Deployments
**Files: `apps/www/netlify.toml` and `apps/docs/netlify.toml`**
```toml
[build.environment]
  NODE_VERSION = "22"
```

### 3. Version Manager Files
Created for automatic Node version switching:
- **`.nvmrc`** - For nvm users
- **`.node-version`** - For asdf and other version managers

Both files contain: `22`

## 🚀 Benefits of Node.js 22

1. **Performance Improvements**
   - Enhanced V8 JavaScript engine
   - Better memory management
   - Faster startup times

2. **New Features**
   - Native `fetch()` API improvements
   - Enhanced Web Streams support
   - Better ESM/CommonJS interoperability
   - Improved test runner

3. **Security**
   - Latest security patches
   - Updated OpenSSL version
   - Enhanced permission model

4. **Long-Term Support**
   - Node.js 22 is the latest LTS version
   - Extended support timeline
   - Production-ready stability

## 🔧 Local Development Setup

### Using nvm (Node Version Manager)
```bash
# Install Node.js 22
nvm install 22

# Use Node.js 22 (automatic with .nvmrc)
nvm use
```

### Using asdf
```bash
# Install Node.js 22
asdf install nodejs 22

# Set local version (automatic with .node-version)
asdf local nodejs 22
```

### Using fnm (Fast Node Manager)
```bash
# Install Node.js 22
fnm install 22

# Use Node.js 22 (automatic with .nvmrc)
fnm use
```

### Manual Installation
Download from: https://nodejs.org/

## ✅ Verification

Check your Node version:
```bash
node --version
# Should output: v22.x.x
```

Check pnpm compatibility:
```bash
pnpm --version
# Should work without issues
```

## 🔄 Migration Steps

If you're upgrading from an existing environment:

1. **Update Node.js**
   ```bash
   nvm install 22
   nvm use 22
   # or your preferred version manager
   ```

2. **Clear Dependencies**
   ```bash
   rm -rf node_modules
   rm pnpm-lock.yaml
   ```

3. **Reinstall Dependencies**
   ```bash
   pnpm install
   ```

4. **Verify Build**
   ```bash
   pnpm build
   ```

## 📝 Deployment

### Netlify
- Both `www` and `docs` sites now use Node.js 22
- Configuration is in respective `netlify.toml` files
- No manual action required for deployment

### Local Development
- Version managers will automatically use Node.js 22
- Team members need to update their local Node version
- CI/CD will use Node.js 22 automatically

## ⚠️ Breaking Changes

Node.js 22 is generally backward compatible, but be aware of:

1. **Legacy OpenSSL APIs** - Some old crypto methods are deprecated
2. **Module Resolution** - Enhanced ESM support may affect edge cases
3. **Experimental Features** - Some APIs from Node 18 are now stable

## 🐛 Troubleshooting

### "Unsupported engine" error
```bash
# Make sure you're using Node.js 22+
node --version

# Update if needed
nvm install 22
```

### pnpm compatibility issues
```bash
# Update pnpm to latest
npm install -g pnpm@latest
```

### Build failures
```bash
# Clear everything and reinstall
rm -rf node_modules .next .turbo
pnpm install
pnpm build
```

## 📚 Resources

- [Node.js 22 Release Notes](https://nodejs.org/en/blog/release/v22.0.0)
- [Node.js Documentation](https://nodejs.org/docs/latest-v22.x/api/)
- [nvm Documentation](https://github.com/nvm-sh/nvm)
- [pnpm Documentation](https://pnpm.io/)

---

**Upgraded:** November 12, 2025  
**Previous Version:** Node.js 18  
**Current Version:** Node.js 22  
**Status:** ✅ Complete

