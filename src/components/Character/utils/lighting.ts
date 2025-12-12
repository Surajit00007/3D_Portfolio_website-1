import * as THREE from "three";
import { RGBELoader } from "three-stdlib";
import { gsap } from "gsap";
import { HDR_URL, safeFetch } from "../../../config";

const setLighting = (scene: THREE.Scene) => {
  const directionalLight = new THREE.DirectionalLight(0xc7a9ff, 0);
  directionalLight.intensity = 0;
  directionalLight.position.set(-0.47, -0.32, -1);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xc2a4ff, 0, 100, 3);
  pointLight.position.set(3, 12, 4);
  pointLight.castShadow = true;
  scene.add(pointLight);

  // Load environment map with error handling
  const loadEnvironmentMap = async () => {
    console.log('🌅 Starting HDR environment map load...');
    try {
      const hdrData = await safeFetch(HDR_URL);
      if (!hdrData) {
        console.warn("❌ Failed to load environment map (char_enviorment.hdr) - using fallback lighting");
        return;
      }
      
      console.log('🎨 Creating blob URL for HDR texture...');
      const blob = new Blob([hdrData]);
      const blobUrl = URL.createObjectURL(blob);
      
      console.log('🖼️ Loading HDR texture with RGBELoader...');
      const rgbeLoader = new RGBELoader();
      rgbeLoader.load(
        blobUrl,
        (texture) => {
          console.log('✅ HDR environment map loaded successfully!');
          texture.mapping = THREE.EquirectangularReflectionMapping;
          scene.environment = texture;
          scene.environmentIntensity = 0;
          scene.environmentRotation.set(5.76, 85.85, 1);
        },
        undefined,
        (error) => {
          console.warn("❌ Failed to load environment map texture:", error);
          console.warn("🌞 Continuing without environment map - lighting will still work");
          // Continue without environment map - the scene will still work with directional and point lights
        }
      );
    } catch (error) {
      console.warn("❌ Failed to fetch environment map:", error);
      console.warn("🌞 Continuing without environment map - lighting will still work");
    }
  };
  
  loadEnvironmentMap();

  function setPointLight(screenLight: any) {
    if (screenLight.material.opacity > 0.9) {
      pointLight.intensity = screenLight.material.emissiveIntensity * 20;
    } else {
      pointLight.intensity = 0;
    }
  }
  const duration = 2;
  const ease = "power2.inOut";
  function turnOnLights() {
    gsap.to(scene, {
      environmentIntensity: 0.64,
      duration: duration,
      ease: ease,
    });
    gsap.to(directionalLight, {
      intensity: 1,
      duration: duration,
      ease: ease,
    });
    gsap.to(".character-rim", {
      y: "55%",
      opacity: 1,
      delay: 0.2,
      duration: 2,
    });
  }

  return { setPointLight, turnOnLights };
};

export default setLighting;
