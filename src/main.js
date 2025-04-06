import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup scene, camera, and renderer
let currentHoveredObject = null;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 10, 30);
camera.lookAt(0, 0, 0);
// Enable layer 1 so that objects on that layer (e.g. face model) render
camera.layers.enable(1);

const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a dedicated array for interactive objects
const interactiveObjects = [];

// Tooltip
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);




// Modal – description element is a <p> that will hold HTML content
const modal = document.createElement('div');
modal.classList.add('modal');
modal.innerHTML = `
  <div class="modal-overlay">
    <div class="modal-content">
      <button class="modal-close" aria-label="Close modal">&times;</button>
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
`;

document.body.appendChild(modal);

const modalClose = modal.querySelector('.modal-close');
const modalImage = modal.querySelector('.modal-image');
const modalEmbed = modal.querySelector('.modal-embed');
const modalTitle = modal.querySelector('.modal-title');
const modalMediumValue = modal.querySelector('.modal-medium .value');
const modalYearValue = modal.querySelector('.modal-year .value');
const modalDescriptionValue = modal.querySelector('.modal-description .value');

// Updated openModal function with a social button for aart.ink
function openModal({ name, imageSrc, medium, year, description }) {
  const content = modal.querySelector('.modal-content');
  const isAartInk = name === 'aart.ink';
  const isBisquePot = name === 'Bisque Pot';
  const is3DScan = name === '3D Scan';

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
}

// Function to close the modal
function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (!e.target.closest('.modal-content')) {
    closeModal();
  }
});
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
  new THREE.SphereGeometry(10, 32, 32),
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
  description: 'A 2ft x 3ft painting featuring a glossy background that contrasts with the matte finish of the central subject, creating a dynamic interplay of texture and depth.',
  medium: 'Acrylic on canvas',
  year: '2019',
  size: [20, 40],
  position: [50, 20, 15]
});
const plane2 = createImagePlane({
  src: './yoko2.jpg',
  name: 'Yoko',
  description: 'This piece is a colored lithophane made from cast porcelain. It was created using a mold made from a 3D-printed lithophane, from a photograph of my cat, Yoko. A handmade wooden frame encases the lithophane, while colored transparencies add color to the lithophane.</br>The labor-intensive process of making this piece reflects the care and devotion we have for our pets. When illuminated, the lithophane symbolizes how our pets brighten our lives, transforming effort into warmth, labor into love.ge description.',
  medium: 'Porcelain and wood',
  year: '2025',
  size: [20, 20],
  position: [-55, 20, -15]
});
const plane3 = createImagePlane({
  src: './afeeling.jpg',
  name: 'A Feeling',
  description: 'This work features three wood-fired ceramic pieces arranged within a diorama, integrated seamlessly into the scene',
  medium: 'Stoneware, Installation',
  year: '2024',
  size: [40, 20],
  position: [-55, -40, -15]
});
const plane4 = createImagePlane({
  src: './owned2.png',
  name: 'Poppified',
  description: 'The main subject was photographed against a green screen and printed. The print was then collaged with traditional painting on canvas. The piece was finally scanned and digitally manipulated to complete the composition.',
  medium: 'Mixed Media',
  year: '2017',
  size: [20, 20],
  position: [25, 40, -25]
});

// GLTF Models
const gltfLoader = new GLTFLoader();
let model, abtahi, face, pot;

gltfLoader.load('./aartink.glb', (glb) => {
  model = glb.scene;
  model.scale.set(0.1, 0.1, 0.1);
  model.position.set(0, 15, 0);
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
  pot.scale.set(5, 5, 5);
  pot.position.set(-40, 10, 20);
  const data = {
    isImagePlane: true,
    name: 'Bisque Pot',
    imageSrc: '', // Leave blank, iframe will replace this
    description: '',
    medium: '',
    year: ''
  };
  propagateUserData(pot, data);
  scene.add(pot);
  interactiveObjects.push(pot);
});


gltfLoader.load('./abtahi.glb', (glb) => {
  abtahi = glb.scene;
  abtahi.scale.set(0.1, 0.1, 0.1);
  abtahi.position.set(0, -15, 0);
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
  face.scale.set(5, 5, 5);
  face.position.set(40, -10, -20);
  const data = {
    isImagePlane: true,
    name: '3D Scan',
    imageSrc: '', // Leave blank, iframe will replace this
    description: '',
    medium: '',
    year: ''
  };
  propagateUserData(face, data);
  scene.add(face);
  interactiveObjects.push(face);
});


// Stars
const starGroup = new THREE.Group();
scene.add(starGroup);

const starCount = 420;
const maxRadius = 150;

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
  const radius = THREE.MathUtils.mapLinear(distance, 0, maxRadius, 0.01, .5);

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

const cometCount = 6;
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

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Movement
const keys = { w: false, a: false, s: false, d: false };
let velocity = new THREE.Vector3();
window.addEventListener("keydown", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = true; });
window.addEventListener("keyup", (e) => { if (keys.hasOwnProperty(e.key)) keys[e.key] = false; });

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

// Click to open modal using dedicated interactiveObjects array
window.addEventListener('click', () => {
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



// Animate
function animate() {
  requestAnimationFrame(animate);

  //collab

  const time = performance.now() * 0.001;
  if (videoSphere) {
    videoSphere.position.y = .8 + Math.sin(time * 2) * 0.5;
  }

  if (video.readyState === video.HAVE_ENOUGH_DATA) videoTexture.needsUpdate = true;
 

  velocity.set(0, 0, 0);
  if (keys.w) velocity.z -= 0.5;
  if (keys.s) velocity.z += 0.5;
  if (keys.a) velocity.x -= 0.5;
  if (keys.d) velocity.x += 0.5;
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
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
