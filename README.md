# shadcn-registry

Custom shadcn component registry by AllanBernier.

## Installation

Install components directly from this registry using:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/AllanBernier/shadcn-registry/main/r/[component].json
```

### Example

```bash
npx shadcn@latest add https://raw.githubusercontent.com/AllanBernier/shadcn-registry/main/r/example.json
```

## Available Components

| Component | Description |
|-----------|-------------|
| example | A simple example component |

## Adding New Components

1. Create a new folder in `registry/new-york/[component-name]/`
2. Add your component file(s) (`.tsx` or `.ts`)
3. Optionally add a `component.json` for metadata:

```json
{
  "name": "my-component",
  "title": "My Component",
  "description": "Description of my component",
  "dependencies": ["some-npm-package"],
  "registryDependencies": ["button"]
}
```

4. Run the build script:

```bash
npm run build
```

5. Commit and push changes

## Development

```bash
# Build registry JSON files
npm run build
```

## License

MIT
