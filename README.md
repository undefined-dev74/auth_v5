# Turborepo Express and Next.js Example Setup

[Previous content remains the same...]

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Module Not Found Errors

```bash
Error: Cannot find module '@repo/utils'
```

**Solutions:**
- Verify workspace setup:
  ```yaml
  # pnpm-workspace.yaml
  packages:
    - 'apps/*'
    - 'packages/*'
  ```
- Check package names match in package.json:
  ```json
  {
    "dependencies": {
      "@repo/utils": "workspace:*"
    }
  }
  ```
# Try cleaning and reinstalling:
  ```bash
  # Clean everything
rm -rf node_modules
rm -rf apps/*/node_modules
rm -rf packages/*/node_modules
pnpm store prune

# Reinstall everything
pnpm install
  ```

#### 2. Build Failures

```bash
Failed to compile.
Error: Error: Cannot find module 'tsup/dist/cli-default.js'
```

**Solutions:**
- Check tsup is installed:
  ```bash
  pnpm add -D tsup
  ```
- Verify tsup.config.ts is in the correct location:
  ```typescript
  // apps/server/tsup.config.ts
  import { defineConfig } from "tsup";
  export default defineConfig({
    entry: ["./src/index.ts"],
    noExternal: ["@repo"],
    // ... other config
  });
  ```

#### 3. Next.js Transpilation Issues

```bash
Error: Failed to compile: Module not found: Can't resolve '@repo/ui'
```

**Solutions:**
- Verify next.config.js setup:
  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    transpilePackages: ["@repo/**"],
  };
  module.exports = nextConfig;
  ```
- Check package dependencies:
  ```json
  {
    "dependencies": {
      "@repo/ui": "workspace:*",
      "next": "latest",
      "react": "^18"
    }
  }
  ```

#### 4. Workspace Dependencies Not Resolving

```bash
ERR_PNPM_OUTDATED_LOCKFILE
```

**Solutions:**
- Update .npmrc configuration:
  ```ini
  node-linker=hoisted
  shared-workspace-lockfile=true
  strict-peer-dependencies=false
  auto-install-peers=true
  ```
- Force update lockfile:
  ```bash
  pnpm install --force
  ```

#### 5. Development Server Issues

```bash
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**
- Check if ports are in use:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  # Linux/Mac
  lsof -i :3000
  ```
- Configure different ports:
  ```env
  # .env
  PORT=3001
  ```

#### 6. TypeScript Path Aliases Not Working

**Solutions:**
- Verify tsconfig.json setup:
  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@repo/*": ["packages/*/src"]
      }
    }
  }
  ```
- Check packages are included in tsconfig:
  ```json
  {
    "include": ["src", "../../packages/*/src"]
  }
  ```

### Development Best Practices

1. **Clean Start**
   ```bash
   # Clean everything and start fresh
   pnpm clean
   rm -rf node_modules
   pnpm install
   pnpm build
   pnpm dev
   ```

2. **Debugging Build Issues**
   ```bash
   # Build with verbose logging
   DEBUG=* pnpm build
   
   # Build specific app
   pnpm build --filter=server
   ```

3. **Package Management**
   ```bash
   # Add dependency to specific app
   pnpm add package-name --filter app-name
   
   # Add shared dependency to workspace
   pnpm add package-name -w
   ```

### Environment Setup

Ensure your environment is properly configured:

```bash
node -v  # Should be >=18.0.0
pnpm -v  # Should be >=8.0.0
```

Required files in root:
- `pnpm-workspace.yaml`
- `turbo.json`
- `.npmrc`
- `package.json`

### Still Having Issues?

1. Check the [Turborepo documentation](https://turbo.build/repo/docs)
2. Verify all packages have correct peer dependencies
3. Try running apps individually to isolate issues
4. Check for conflicting dependency versions
5. Ensure all required environment variables are set

## Contributing

[Your contribution guidelines here]

## License

[Your license information here]