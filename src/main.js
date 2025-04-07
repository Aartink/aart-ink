import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const isMobile = /Mobi|Android/i.test(navigator.userAgent);

// Setup scene, camera, and renderer
let currentHoveredObject = null;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 100);
camera.lookAt(0, 0, 0);
// Enable layer 1 so that objects on that layer (e.g. face model) render
camera.layers.enable(1);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// grid helper

//const size = 1000;  // Size of the grid
//const divisions = 100;  // Number of divisions (lines)
//const gridHelper = new THREE.GridHelper(size, divisions);
//scene.add(gridHelper);
//const axesHelper = new THREE.AxesHelper(1000); // The size of the axes
//scene.add(axesHelper);



// Create a dedicated array for interactive objects
const interactiveObjects = [];

// Tooltip
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
if (isMobile) {
  controls.rotateSpeed = 0.3;
  
}

// Modal – description element is a <p> that will hold HTML content
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-overlay">
    <button class="modal-close" aria-label="Close modal">&times;</button>
    
    <div class="modal-content">
      <div class="modal-content-inner">
        <div class="modal-body">
          <img src="" alt="" class="modal-image" />
          <div class="modal-embed" style="display: none;"></div>
          <div class="modal-details">
            <h2 class="modal-title"></h2>
            <p class="modal-medium"><span class="value"></span></p>
            <p class="modal-year"><span class="value"></span></p>
            <p class="modal-description"><span class="value"></span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

document.body.appendChild(modal);

const modalClose = modal.querySelector('.modal-close');
const modalImage = modal.querySelector('.modal-image');
const modalEmbed = modal.querySelector('.modal-embed');
const modalTitle = modal.querySelector('.modal-title');
const modalMediumValue = modal.querySelector('.modal-medium .value');
const modalYearValue = modal.querySelector('.modal-year .value');
const modalDescriptionValue = modal.querySelector('.modal-description .value');

//Modal browser zoom

function getZoomLevel() {
  return window.devicePixelRatio || 1;
}

function applyModalZoom() {
  const zoomLevel = getZoomLevel();
  const scaleFactor = 1 / zoomLevel;

  document.querySelectorAll('.modal.active .modal-content').forEach(modal => {
    modal.style.transform = `scale(${scaleFactor})`;
    modal.style.transformOrigin = 'center center';
  });

  document.querySelectorAll('.modal.active .modal-details').forEach(details => {
    details.style.transform = `scale(${scaleFactor})`;
    details.style.transformOrigin = 'center center';
  });
}

//Resize function for zoom

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvas.clientWidth * pixelRatio);
  const height = Math.floor(canvas.clientHeight * pixelRatio);
  const needResize = canvas.width !== width || canvas.height !== height;

  if (needResize) {
    renderer.setSize(width, height, false);
  }

  return needResize;
}

//lock zoom

function lockModalToZoom() {
  const zoomLevel = window.devicePixelRatio || 1;
  
  // Compute the scale
  let scale = 1 / zoomLevel;

  // Set a minimum scale so it doesn't get too small
  scale = Math.max(scale, 1); // 

  const modalContent = document.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.transform = `scale(${scale})`;
    modalContent.style.transformOrigin = 'center center';
  }
}

// Updated openModal function with a social button for aart.ink
function openModal({ name, imageSrc, medium, year, description }) {
  const content = modal.querySelector('.modal-content');
  const isAartInk = name === 'aart.ink';
  const isBisquePot = name === 'Bisque Pot';
  const is3DScan = name === '3D Scan';

  modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    controls.enabled = false;
modalClose.focus();
modal.style.removeProperty('transform');
modal.style.removeProperty('transform-origin');
  
  
  // Reset previous content
  modalImage.src = '';
  modalImage.alt = '';
  modalImage.style.display = 'none';
  modalEmbed.innerHTML = '';
  modalEmbed.style.display = 'none';

  content.classList.remove('aartink-mode');
  modal.removeAttribute('data-aartink');

  if (isAartInk) {
    content.classList.add('aartink-mode');
    modal.setAttribute('data-aartink', 'true');
    modalTitle.textContent = name;
    modalMediumValue.textContent = '';
    modalYearValue.textContent = '';
    modalDescriptionValue.innerHTML = `
      <h2>Follow aart.ink</h2>
      <div class="social-buttons">
        <a href="https://www.instagram.com/aart.ink" target="_blank"><i class="fab fa-instagram"></i> Instagram</a>
        <a href="https://www.facebook.com/abtahi0" target="_blank"><i class="fab fa-facebook"></i> Facebook</a>
      </div>
      <div id="fb-feed">
        <div class="fb-page"
             data-href="https://www.facebook.com/abtahi0"
             data-tabs="timeline"
             data-width="500"
             data-height="600"
             data-small-header="false"
             data-adapt-container-width="true"
             data-hide-cover="false"
             data-show-facepile="true">
        </div>
      </div>
    `;
    
  } else if (isBisquePot) {
      modalEmbed.innerHTML = `
        <iframe 
          title="bisque piece" 
          src="https://www.kiriengine.app/share/embed/b77779aef91b44efa488cbea11d40cac?userId=888696&bg_theme=dark&auto_spin=1"
          frameborder="0"
          allowfullscreen 
          mozallowfullscreen 
          webkitallowfullscreen 
          allow="autoplay; fullscreen;"
          style="width: 100%; height: 400px; border: 0;"></iframe>
      `;
      modalEmbed.style.display = 'block';
      modalTitle.textContent = name || '';
      modalMediumValue.textContent = medium || '';
      modalYearValue.textContent = year || '';
      modalDescriptionValue.innerHTML = description || '';
   
   } else if (is3DScan) {
    modalEmbed.innerHTML = `
       <iframe 
    title="3D Scan" 
    src="https://www.kiriengine.app/share/embed/e1c3af668e6f4601ad64e58dacbabbac?userId=888696&bg_theme=dark&auto_spin=1"
    frameborder="0"
    allowfullscreen 
    mozallowfullscreen 
    webkitallowfullscreen 
    allow="autoplay; fullscreen;"
    style="width: 100%; height: 400px; border: 0;"></iframe>
`;
    modalEmbed.style.display = 'block';
    modalTitle.textContent = name || '';
    modalMediumValue.textContent = medium || '';
    modalYearValue.textContent = year || '';
    modalDescriptionValue.innerHTML = description || '';
  }
  
   else {
    modalImage.src = imageSrc || '';
    modalImage.alt = name || '';
    modalImage.style.display = 'block';
    modalTitle.textContent = name || '';
    modalMediumValue.textContent = medium || '';
    modalYearValue.textContent = year || '';
    modalDescriptionValue.innerHTML = description || '';
  }
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  modalClose.focus();
  setTimeout(normalizeModalScale, 50);
  setTimeout(lockModalToZoom, 50);
}

// Function to close the modal
function closeModal() {
  // Start fade-out animation
  modal.classList.add('closing');

  // Delay hiding the modal until the animation completes
  setTimeout(() => {
    modal.classList.remove('active', 'closing'); // Remove both after animation
    document.body.style.overflow = '';
    controls.enabled = true;

    const content = modal.querySelector('.modal-content');
    const details = modal.querySelector('.modal-details');
    if (content) content.style.transform = '';
    if (details) details.style.transform = '';
  }, 400); // Match CSS fadeOut duration (0.4s)
}


document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeModal();
  }
});

// Raycaster and mouse
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// HDRI Background
const rgbeLoader = new RGBELoader();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
pmremGenerator.compileEquirectangularShader();
rgbeLoader.load('./HDR_blue_local_star.hdr', (texture) => {
  const envMap = pmremGenerator.fromEquirectangular(texture).texture;
  scene.environment = envMap;
  const bgGeometry = new THREE.SphereGeometry(500, 60, 40);
  bgGeometry.scale(-1, 1, 1);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const backgroundMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  backgroundMesh.name = "backgroundMesh";
  scene.add(backgroundMesh);
});

// Video Sphere
const video = document.createElement('video');
video.src = './test.mp4';
video.loop = true;
video.muted = true;
video.autoplay = true;
video.oncanplaythrough = () => video.play();
const videoTexture = new THREE.VideoTexture(video);
const videoSphere = new THREE.Mesh(
  new THREE.SphereGeometry(30, 72, 72),
  new THREE.MeshBasicMaterial({ map: videoTexture })
);
scene.add(videoSphere);

videoSphere.userData = {
  isImagePlane: true,
  name: 'C.O.L.L.A.B',
  imageSrc: './Sphere.jpg',
  description: 'C.O.L.L.A.B explores the concept of translations: from sound to image, from the physical to the metaphysical. At its core, the project investigates the dynamic relationship between humans, technology, and space through interactive sound and projected visuals. The central sphere acts as both a canvas and living entity, responding to your presence. Visuals emerge from the sphere’s surface, shaped by the volume and frequency of its surrounding sounds.',
  medium: 'Installation',
  year: '2025'
};
interactiveObjects.push(videoSphere);

// Texture loader
const textureLoader = new THREE.TextureLoader();

// Helper function to propagate interactive data to all child meshes
function propagateUserData(object, data) {
  object.userData = { ...data, ...object.userData };
  if (object.isMesh) {
    object.userData.cachedOutline = null;
  }
  object.traverse((child) => {
    if (child.isMesh) {
      child.userData = { ...data, ...child.userData };
      child.userData.cachedOutline = null;
    }
  });
}

// Function to create image planes
function createImagePlane({ src, name, description, medium, year, size, position }) {
  const tex = textureLoader.load(src);
  const mat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
  const geo = new THREE.PlaneGeometry(...size);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(...position);
  const data = { isImagePlane: true, name, imageSrc: src, description, medium, year };
  mesh.userData = data;
  scene.add(mesh);
  interactiveObjects.push(mesh);
  return mesh;
}

const plane1 = createImagePlane({
  src: './yoko.jpg',
  name: 'Yoko',
  description: 'Imagine a 2ft x 3ft canvas where a luminous, glossy background sets a vibrant stage for the central subject rendered in a subtle matte finish. The deliberate contrast creates a dynamic interplay of texture and depth, drawing your eye into the heart of the scene. At the center of this artistic dialogue is a personal homage to my beloved dog Yoko—a gentle reminder of her ever-present warmth and joyful spirit. Yoko’s playful eyes and comforting presence are subtly integrated into the composition, imbuing the painting with both visual intrigue and heartfelt sentiment.',
  medium: 'Acrylic on canvas.',
  year: '2019',
  size: [20, 40],
  position: [80, 60, 75]
});
const plane2 = createImagePlane({
  src: './yoko2.jpg',
  name: 'Yoko',
  description: 'This piece is a colored lithophane made from cast porcelain. It was created using a mold made from a 3D-printed lithophane, from a photograph of my cat, Yoko. A handmade wooden frame encases the lithophane, while colored transparencies add color to the lithophane.</br>The labor-intensive process of making this piece reflects the care and devotion we have for our pets. When illuminated, the lithophane symbolizes how our pets brighten our lives, transforming effort into warmth, labor into love.',
  medium: 'Porcelain and wood',
  year: '2025',
  size: [40, 40],
  position: [-105, 70, -75]
});
const plane3 = createImagePlane({
  src: './afeeling.jpg',
  name: 'A Feeling',
  description: 'This work features three wood-fired ceramic pieces arranged within a diorama, integrated seamlessly into the scene',
  medium: 'Stoneware, Installation',
  year: '2024',
  size: [80, 40],
  position: [-105, -80, -85]
});
const plane4 = createImagePlane({
  src: './owned2.png',
  name: 'Poppified',
  description: 'The main subject was photographed against a green screen and printed. The print was then collaged with traditional painting on canvas. The piece was finally scanned and digitally manipulated to complete the composition.',
  medium: 'Mixed Media',
  year: '2017',
  size: [40, 40],
  position: [90, 110, -85]
});

// GLTF Models
const gltfLoader = new GLTFLoader();
let model, abtahi, face, pot;

gltfLoader.load('./aartink.glb', (glb) => {
  model = glb.scene;
  model.scale.set(0.3, 0.3, 0.3);
  model.position.set(0, 45, 0);
  const data = {
    isImagePlane: true,
    name: 'aart.ink',
    imageSrc: '', // Remove image by setting empty
    description: 'This is the aart.ink text model. Follow our social feeds below:',
    medium: ''
  };
  propagateUserData(model, data);
  scene.add(model);
  interactiveObjects.push(model);
});

gltfLoader.load('./pot.glb', (glb) => {
  pot = glb.scene;
  pot.scale.set(10, 10, 10);
  pot.position.set(-80, 80, 90);
  const data = {
    isImagePlane: true,
    name: 'Bisque Pot',
    imageSrc: '', // Leave blank, iframe will replace this
    description: 'One of my very first 3D scans.',
    medium: '',
    year: '2023'
  };
  propagateUserData(pot, data);
  scene.add(pot);
  interactiveObjects.push(pot);
});


gltfLoader.load('./abtahi.glb', (glb) => {
  abtahi = glb.scene;
  abtahi.scale.set(0.3, 0.3, 0.3);
  abtahi.position.set(0, -45, 0);
  const data = {
    isImagePlane: true,
    name: 'abtahi',
    imageSrc: './abtahi.jpg',
    description:
      'My art practice involves weaving cultural narratives together with contemporary artistic expressions. As an intermedia artist, I embrace installation art through ceramics, painting, digital media, sound, and sculpture. I aim to create immersive experiences that engage viewers both visually and conceptually.',
    medium: ''
  };
  propagateUserData(abtahi, data);
  scene.add(abtahi);
  interactiveObjects.push(abtahi);
});

// Load face model, but do NOT add it to interactiveObjects so it's excluded from raycasting
gltfLoader.load('./face.glb', (glb) => {
face = glb.scene;
  face.scale.set(10, 10, 10);
  face.position.set(90, -90, -90);
  const data = {
    isImagePlane: true,
    name: '3D Scan',
    imageSrc: '', // Leave blank, iframe will replace this
    description: 'Thats me!',
    medium: '',
    year: '2024'
  };
  propagateUserData(face, data);
  scene.add(face);
  interactiveObjects.push(face);
});


// Stars
const starGroup = new THREE.Group();
scene.add(starGroup);

const starCount = 600;
const maxRadius = 450;

for (let i = 0; i < starCount; i++) {
  // Position inside a sphere
  const direction = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(1),
    THREE.MathUtils.randFloatSpread(1),
    THREE.MathUtils.randFloatSpread(1)
  ).normalize();

  const distance = Math.pow(Math.random(), 1.5) * maxRadius; // cluster more stars near center
  const position = direction.multiplyScalar(distance);

  // Star size grows with distance
  const radius = THREE.MathUtils.mapLinear(distance, 0, maxRadius, 0.1, .5);

  const geo = new THREE.SphereGeometry(radius, 12, 12);
  const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: THREE.MathUtils.randFloat(1, 2),
  });

  const star = new THREE.Mesh(geo, mat);
  star.position.copy(position);
  starGroup.add(star);
}

//Comets 
const cometGroup = new THREE.Group();
scene.add(cometGroup);

const cometCount = 10;
const cometData = [];

function createComet() {
  const comet = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 12, 12),
    new THREE.MeshBasicMaterial({
      color: 0xffccaa,
      emissive: 0xff8844,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0
    })
  );

  const trailLength = 60;
  const trail = [];
  for (let i = 0; i < trailLength; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 8, 8),
      new THREE.MeshBasicMaterial({
        color: 0xffaa88,
        transparent: true,
        opacity: 0
      })
    );
    cometGroup.add(particle);
    trail.push(particle);
  }

  // Random starting position and velocity
  const position = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100),
    THREE.MathUtils.randFloatSpread(100)
  );

  const velocity = new THREE.Vector3(
    THREE.MathUtils.randFloatSpread(0.4),
    THREE.MathUtils.randFloatSpread(0.4),
    THREE.MathUtils.randFloatSpread(0.4)
  );

  comet.position.copy(position);
  cometGroup.add(comet);

  cometData.push({
    comet,
    trail,
    velocity,
    fadePhase: Math.random() * Math.PI * 2
  });
}

for (let i = 0; i < cometCount; i++) createComet();

// Lighting
scene.add(new THREE.AmbientLight(0xffffff, 1));
scene.add(new THREE.PointLight(0xffffff, 5).position.set(0, 0, 0));
scene.add(new THREE.DirectionalLight(0xffffff, 1).position.set(1, 1, 1).normalize());



// Movement
const keys = { w: false, a: false, s: false, d: false, shift: false };
let velocity = new THREE.Vector3();

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (key === 'shift') keys.shift = true;
  if (keys.hasOwnProperty(key)) keys[key] = true;
});

window.addEventListener("keyup", (e) => {
  const key = e.key.toLowerCase();
  if (key === 'shift') keys.shift = false;
  if (keys.hasOwnProperty(key)) keys[key] = false;
});


// Outline Helpers
function addOutline(object) {
  if (!object.geometry || object.getObjectByName("outline")) return;
  if (object.userData.cachedOutline) {
    const clone = object.userData.cachedOutline.clone();
    clone.name = "outline";
    object.add(clone);
  } else {
    const edges = new THREE.EdgesGeometry(object.geometry);
    const mat = new THREE.LineBasicMaterial({ color: 0xffff00 });
    const outline = new THREE.LineSegments(edges, mat);
    outline.name = "outline";
    object.add(outline);
    object.userData.cachedOutline = outline.clone();
  }
}
function addOutlineToObject(object) {
  if (object.userData.disableOutline) return;
  if (object.isMesh) addOutline(object);
  object.children.forEach(addOutlineToObject);
}
function removeOutlineFromObject(object) {
  const outline = object.getObjectByName("outline");
  if (outline) object.remove(outline);
  object.children.forEach(removeOutlineFromObject);
}

// Mouse Hover using dedicated interactiveObjects array

window.addEventListener('mousemove', (e) => {
  const isModalOpen = modal.classList.contains('active');
  if (isModalOpen) {
    tooltip.classList.remove('visible');
    return; // Stop further hover detection
  }

  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects, true);
  let found = false;

  for (const intersect of intersects) {
    if (intersect.object.userData.isImagePlane) {
      const obj = intersect.object;
      tooltip.classList.add('visible');
      tooltip.style.left = `${e.clientX + 10}px`;
      tooltip.style.top = `${e.clientY + 10}px`;
      tooltip.innerHTML = obj.userData.name;

      if (currentHoveredObject !== obj) {
        if (currentHoveredObject) removeOutlineFromObject(currentHoveredObject);
        addOutlineToObject(obj);
        currentHoveredObject = obj;
      }

      found = true;
      break;
    }
  }

  if (!found) {
    tooltip.classList.remove('visible');
    if (currentHoveredObject) {
      removeOutlineFromObject(currentHoveredObject);
      currentHoveredObject = null;
    }
  }
});

//Welcome text
const welcomePopup = document.createElement('div');
welcomePopup.className = 'welcome-popup';
welcomePopup.innerHTML = `
  <div class="welcome-content">
    <h2>Welcome to aart.ink</h2>
    <p>Explore my galaxy of creations — click, hover, explore, and play!</p>
  </div>
`;
document.body.appendChild(welcomePopup);


// Global click for modal interaction
window.addEventListener('click', (e) => {
  const isModalOpen = modal.classList.contains('active');
  const clickedCloseButton = e.target.closest('.modal-close');
  const clickedInsideModal = e.target.closest('.modal-content');

  if (isModalOpen) {
    // ✅ Close if clicked the close button or outside modal content
    if (clickedCloseButton || (!clickedInsideModal && !clickedCloseButton)) {
      closeModal();
    }

    // ❌ Don't allow any 3D interaction while modal is open
    return;
  }

  // ✅ Allow 3D click interaction if modal isn't open
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(interactiveObjects, true);
  for (const intersect of intersects) {
    if (intersect.object.userData.isImagePlane) {
      const { name, imageSrc, medium, year, description } = intersect.object.userData;
      openModal({ name, imageSrc, medium, year, description });
      break;
    }
  }
});

//scrollbar shadow
function updateScrollShadows() {
  const modalDetails = document.querySelector('.modal-details');
  if (!modalDetails) return;

  const scrollTop = modalDetails.scrollTop;
  const scrollHeight = modalDetails.scrollHeight;
  const clientHeight = modalDetails.clientHeight;

  modalDetails.classList.toggle('at-top', scrollTop === 0);
  modalDetails.classList.toggle('at-bottom', scrollTop + clientHeight >= scrollHeight - 1);
}

document.addEventListener('DOMContentLoaded', () => {
  const details = document.querySelector('.modal-details');
  if (details) {
    details.addEventListener('scroll', updateScrollShadows);
    setTimeout(updateScrollShadows, 100); // Trigger once on load
  }
});


//Modal browerser-zoom scale compensation
function normalizeModalScale() {
  const scaleFactor = 0.8; // force "80%" appearance

  const modal = document.querySelector('.modal-content');
  const modalDetails = document.querySelector('.modal-details');

  if (modal) {
    modal.style.transform = `scale(${scaleFactor})`;
    modal.style.transformOrigin = 'center center';
  }

  if (modalDetails) {
    modalDetails.style.transform = `scale(${scaleFactor})`;
    modalDetails.style.transformOrigin = 'center center';
  }
}

window.addEventListener('load', normalizeModalScale);
window.addEventListener('resize', normalizeModalScale);

// Animations

function animate() {
  requestAnimationFrame(animate);
  resizeRendererToDisplaySize(renderer);
  
  //collab

  const time = performance.now() * 0.001;
  if (videoSphere) {
    videoSphere.position.y = .8 + Math.sin(time * 2) * 0.5;
  }

  if (video.readyState === video.HAVE_ENOUGH_DATA) videoTexture.needsUpdate = true;
 

  const baseSpeed = 0.5;
  const speed = keys.shift ? baseSpeed * 2 : baseSpeed; // ✅ shift boost
  
  velocity.set(0, 0, 0);
  if (keys.w) velocity.z -= speed;
  if (keys.s) velocity.z += speed;
  if (keys.a) velocity.x -= speed;
  if (keys.d) velocity.x += speed;
  
  camera.position.add(velocity);

  [plane1, plane2, plane3, plane4].forEach((plane) => {
    if (currentHoveredObject !== plane) {
      plane.rotation.y += 0.001;
      plane.rotation.z += 0.001;
    }
  });

  if (model) model.rotation.y += -0.0007;
  if (abtahi) abtahi.rotation.y += 0.0007;
  if (face) face.rotation.y += 0.001;
  if (pot) pot.rotation.y += 0.003; 
  

  const bg = scene.getObjectByName("backgroundMesh");
  if (bg) bg.rotation.y += 0.00006;

  starGroup.rotation.y += 0.00012;

//comets

for (let i = 0; i < cometData.length; i++) {
  const data = cometData[i];
  const { comet, velocity, trail } = data;

  // Update position
  comet.position.add(velocity);

  // Bounce back if out of bounds
  ['x', 'y', 'z'].forEach((axis) => {
    if (Math.abs(comet.position[axis]) > 200) {
      velocity[axis] *= -1;
    }
  });

  // Smooth fade in/out
  const opacity = 0.6 + 0.4 * Math.sin(time + data.fadePhase);
  comet.material.opacity = opacity;

  // Update trail
  for (let j = trail.length - 1; j > 0; j--) {
    trail[j].position.copy(trail[j - 1].position);
    const fadeFactor = (trail.length - j) / trail.length;
    trail[j].material.opacity = fadeFactor * opacity;
  }
  trail[0].position.copy(comet.position);
  trail[0].material.opacity = opacity;
}

  controls.update();
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  if (modal.classList.contains('active')) {
    lockModalToZoom();
  }
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
 
});

  // Better responsiveness on mobile
const modalDetails = document.querySelector('.modal-details');

['scroll', 'touchmove', 'wheel'].forEach(evt =>
  modalDetails?.addEventListener(evt, updateScrollShadows)
);

const idleHint = document.createElement('div');
idleHint.className = 'idle-hint';
idleHint.innerText = '🕹️ Use WASD / Mouse to move around';
document.body.appendChild(idleHint);

setTimeout(() => {
  welcomePopup.remove();
}, 5800); // Slightly more than total animation time

//idle hint

let idleTimer;
let firstIdle = true; // track if it's the first idle event

function showIdleHint() {
  idleHint.classList.add('visible'); // ✅ Use idleHint directly
  firstIdle = false;
}

function hideIdleHint() {
  idleHint.classList.remove('visible'); // ✅ Use idleHint directly
}

function resetIdleTimer() {
  hideIdleHint();
  clearTimeout(idleTimer);

  const delay = firstIdle ? 5000 : 30000;
  idleTimer = setTimeout(showIdleHint, delay);
}


// Events that reset idle
['mousemove', 'keydown', 'mousedown', 'wheel', 'touchstart'].forEach(event =>
  window.addEventListener(event, resetIdleTimer)
);

// Start idle timer when page loads
window.addEventListener('load', () => {
  resetIdleTimer();
});
