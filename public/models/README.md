# 3D Assets Directory
Place your optimized .glb / .gltf models here.
Recommended optimization pipeline:
1. Export from Blender / Cinema4D as glTF 2.0 (Binary .glb)
2. Run `npx gltfjsx model.glb --transform` to generate Draco/Meshopt compressed assets and typed R3F components.
