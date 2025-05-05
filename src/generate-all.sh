#!/bin/bash

# Find all YAML files recursively
find . -name '*.yaml' | while read -r file; do
  # Get base name for output folder
  name=$(basename "$file" .yaml)
  outdir="./generated-apis/$name"

  echo "🔧 Generating Angular service for: $file"

  # Generate code
  npx openapi-generator-cli generate \
    -i "$file" \
    -g typescript-angular \
    -o "$outdir" \
    --skip-validate-spec \
    --additional-properties=apiNameSuffix=Service,ngVersion=17

  echo "🧹 Cleaning unnecessary files..."

  # Remove unneeded files
  rm -f "$outdir/README.md"
  rm -f "$outdir/.gitignore"
  rm -f "$outdir/git_push.sh"
  rm -rf "$outdir/.openapi-generator"
  rm -f "$outdir/.openapi-generator-ignore"
  rm -f "$outdir/package.json"
  rm -f "$outdir/tsconfig.json"
  rm -f "$outdir/tsconfig.eslint.json"

  echo "✅ Done: $name"
done
