import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, "..")

const REGISTRY_DIR = path.join(rootDir, "registry", "new-york")
const OUTPUT_DIR = path.join(rootDir, "r")
const REGISTRY_JSON = path.join(rootDir, "registry.json")

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })
}

// Read existing registry.json
const registry = JSON.parse(fs.readFileSync(REGISTRY_JSON, "utf-8"))
registry.items = []

// Get all component directories
const componentDirs = fs.readdirSync(REGISTRY_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

console.log(`Found ${componentDirs.length} component(s) to build...`)

for (const componentName of componentDirs) {
  const componentDir = path.join(REGISTRY_DIR, componentName)

  // Find the main component file
  const files = fs.readdirSync(componentDir)
    .filter(f => f.endsWith(".tsx") || f.endsWith(".ts"))

  if (files.length === 0) {
    console.warn(`  Skipping ${componentName}: no .tsx/.ts files found`)
    continue
  }

  // Read component files and their content
  const componentFiles = files.map(file => {
    const filePath = path.join(componentDir, file)
    const content = fs.readFileSync(filePath, "utf-8")
    return {
      path: `registry/new-york/${componentName}/${file}`,
      type: "registry:component",
      content
    }
  })

  // Check for component.json metadata
  let metadata = {
    name: componentName,
    type: "registry:component",
    title: componentName.charAt(0).toUpperCase() + componentName.slice(1),
    description: `A ${componentName} component`,
    dependencies: [],
    registryDependencies: []
  }

  const metadataPath = path.join(componentDir, "component.json")
  if (fs.existsSync(metadataPath)) {
    const customMetadata = JSON.parse(fs.readFileSync(metadataPath, "utf-8"))
    metadata = { ...metadata, ...customMetadata }
  }

  // Create the registry item JSON
  const registryItem = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name: metadata.name,
    type: metadata.type,
    title: metadata.title,
    description: metadata.description,
    dependencies: metadata.dependencies,
    registryDependencies: metadata.registryDependencies,
    files: componentFiles
  }

  // Write individual component JSON
  const outputPath = path.join(OUTPUT_DIR, `${componentName}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(registryItem, null, 2))
  console.log(`  Built: r/${componentName}.json`)

  // Add to registry items (without content for the index)
  registry.items.push({
    name: metadata.name,
    type: metadata.type,
    title: metadata.title,
    description: metadata.description,
    dependencies: metadata.dependencies,
    registryDependencies: metadata.registryDependencies,
    files: componentFiles.map(f => ({
      path: f.path,
      type: f.type
    }))
  })
}

// Write updated registry.json
fs.writeFileSync(REGISTRY_JSON, JSON.stringify(registry, null, 2))
console.log(`\nUpdated registry.json with ${registry.items.length} item(s)`)
console.log("Build complete!")
