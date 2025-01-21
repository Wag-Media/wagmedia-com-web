import fs from "fs"
import path from "path"
import { glob } from "glob"

interface FileMap {
  [key: string]: Set<string>
}

function getAllFiles() {
  // Get all directories in project root
  const rootDir = process.cwd()
  const allDirs = fs
    .readdirSync(rootDir, { withFileTypes: true })
    .filter(
      (dirent) =>
        dirent.isDirectory() &&
        !dirent.name.startsWith(".") &&
        !["node_modules", "dist"].includes(dirent.name)
    )
    .map((dirent) => dirent.name)

  // Get all TypeScript/JavaScript files from these directories
  const allFiles = glob.sync(`{${allDirs.join(",")}}/**/*.{ts,tsx,js,jsx}`, {
    ignore: [
      "**/node_modules/**",
      "**/.next/**",
      "**/dist/**",
      "**/*.d.ts",
      "**/*.test.{ts,tsx,js,jsx}",
      "**/*.spec.{ts,tsx,js,jsx}",
      "**/tests/**",
    ],
    cwd: process.cwd(),
    absolute: true,
  })

  return allFiles
}

function extractImports({
  content,
  filePath,
}: {
  content: string
  filePath: string
}) {
  const imports = new Set<string>()

  // Match ES6 imports including @ aliases
  const importRegex = /import\s+(?:(?:[\w*\s{},]*)\s+from\s+)?['"]([^'"]+)['"]/g
  let match

  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1]
    if (importPath.startsWith(".")) {
      // Resolve relative path to absolute
      const absolutePath = path.resolve(path.dirname(filePath), importPath)
      imports.add(absolutePath)
    } else if (importPath.startsWith("@/")) {
      // Handle @ alias (assuming it points to project root)
      const absolutePath = path.join(
        process.cwd(),
        importPath.replace("@/", "")
      )
      imports.add(absolutePath)
    }
  }

  return imports
}

function findUnusedFiles() {
  const allFiles = getAllFiles()
  const dependencyGraph: FileMap = {}
  const reverseDependencyGraph: FileMap = {}

  // Initialize graphs
  allFiles.forEach((file) => {
    dependencyGraph[file] = new Set()
    reverseDependencyGraph[file] = new Set()
  })

  // Build dependency graph
  allFiles.forEach((file) => {
    try {
      const content = fs.readFileSync(file, "utf-8")
      const imports = extractImports({ content, filePath: file })

      imports.forEach((importPath) => {
        // Handle different file extensions
        const possibleExtensions = [".ts", ".tsx", ".js", ".jsx", ""]
        let resolvedPath = ""

        for (const ext of possibleExtensions) {
          const testPath = `${importPath}${ext}`
          if (fs.existsSync(testPath)) {
            resolvedPath = testPath
            break
          }
          // Try index files
          const indexPath = path.join(importPath, `index${ext}`)
          if (fs.existsSync(indexPath)) {
            resolvedPath = indexPath
            break
          }
        }

        if (resolvedPath && dependencyGraph[file]) {
          dependencyGraph[file].add(resolvedPath)
          if (reverseDependencyGraph[resolvedPath]) {
            reverseDependencyGraph[resolvedPath].add(file)
          }
        }
      })
    } catch (error) {
      console.error(`Error processing file ${file}:`, error)
    }
  })

  // Find files not imported anywhere (except by themselves)
  const unusedFiles = allFiles.filter((file) => {
    const importedBy = reverseDependencyGraph[file] || new Set()
    return (
      importedBy.size === 0 || (importedBy.size === 1 && importedBy.has(file))
    )
  })

  // Filter out Next.js special files
  const nextSpecialFiles = [
    "page.tsx",
    "layout.tsx",
    "loading.tsx",
    "error.tsx",
    "not-found.tsx",
    "route.ts",
    "opengraph-image.tsx",
    "middleware.ts",
    "global.d.ts",
  ]

  const actuallyUnusedFiles = unusedFiles.filter((file) => {
    const fileName = path.basename(file)
    return !nextSpecialFiles.includes(fileName)
  })

  return actuallyUnusedFiles
}

// Run the script
const unusedFiles = findUnusedFiles()
console.log("Unused files:")
if (unusedFiles.length === 0) {
  console.log("No unused files found!")
} else {
  unusedFiles.forEach((file) => {
    // Show relative path from project root
    console.log(`- ${path.relative(process.cwd(), file)}`)
  })
  console.log(`\nTotal: ${unusedFiles.length} unused files`)
}
