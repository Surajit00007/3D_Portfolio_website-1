import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";
import { ENC_URL } from "../../../config";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    console.log('🎭 Starting character load...');
    return new Promise<GLTF | null>(async (resolve) => {
      try {
        console.log('🔐 Decrypting character file...');
        const encryptedBlob = await decryptFile(
          ENC_URL,
          "Character3D#@"
        );
        
        if (!encryptedBlob) {
          console.error('❌ Character decryption failed - no data returned');
          resolve(null);
          return;
        }
        
        console.log('📦 Creating blob URL for character model...');
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        console.log('🚀 Loading GLTF model...');
        loader.load(
          blobUrl,
          async (gltf) => {
            console.log('✅ Character model loaded successfully!');
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            resolve(null); // Fallback: skip 3D model
          }
        );
      } catch (err) {
        console.error("Failed to load character model:", err);
        resolve(null); // Fallback: skip 3D model
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
