import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 2, 2, 2)

// const positionsArray = new Float32Array(9)
// positionArray[0] = 0
// positionArray[1] = 0
// positionArray[2] = 0

// positionArray[3] = 0
// positionArray[4] = 1
// positionArray[5] = 0

// positionArray[6] = 1
// positionArray[7] = 0
// positionArray[8] = 0



// ========== MANY TRIANGLES WITH BUFFER  GEOMETRY ==================
const geometry = new THREE.BufferGeometry()

const count = 1200;

const positionsArray = new Float32Array(count * 3 * 3); //each triangle composed of 3 vertices and each vertice composed of 3 values

for (let i = 0; i < count * 3 * 3; i++) {
    positionsArray[i] = (Math.random() - 0.5) * 4
}

const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)

geometry.setAttribute('position', positionsAttribute)

// ========== MANY TRIANGLES WITH BUFFER  GEOMETRY ==================





// ============TRIANGLE WITH BUFFER GEMOETRY===================
// const positionArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0
// ])

// const positionsAttribute = new THREE.BufferAttribute(positionArray, 3) // one vertex contains 3 values

// const geometry = new THREE.BufferGeometry()
// geometry.setAttribute('position', positionsAttribute)
// console.log(geometry.getAttribute('position'))
// =============================================



// CUSTOM GEOMETRY
// const geometry = new THREE.Geometry()


// ==========MANY TRIANGLES ==========================
// for (let i = 0; i < 50; i++) {
//     for (let j = 0; j < 3; j++) {
//         geometry.vertices.push(new THREE.Vector3(
//             (Math.random() - 0.5) * 3,
//             (Math.random() - 0.5) * 3,
//             (Math.random() - 0.5) * 3
//         ))
//     }

//     const verticesIndex = i * 3
//     geometry.faces.push(new THREE.Face3(
//         verticesIndex,
//         verticesIndex + 1,
//         verticesIndex + 2
//     ))
// }
// ===================================================


// ================ SIMPLE TRIANGLE ========================
// const vertex1 = new THREE.Vector3(0, 0, 0)
// geometry.vertices.push(vertex1);

// const vertex2 = new THREE.Vector3(0, 1, 0)
// geometry.vertices.push(vertex2);

// const vertex3 = new THREE.Vector3(1, 0, 0)
// geometry.vertices.push(vertex3);

// const face = new THREE.Face3(0, 1, 2) // indices of the vertices array
// geometry.faces.push(face)
// =========================================================

const material = new THREE.MeshBasicMaterial({ 
    color: 0xffffff,
    wireframe: true
 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()