import * as THREE from "three"
import Experience from "../Experience/Experience"

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setBackground()
        this.setSunlight()
    }

    setBackground() {
        this.scene.background = "#ffffff"
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("yellow", 5)
        this.sunLight.castShadow = true
        let light = new THREE.PointLight(0x3200ff, 2)
        light.position.set(5, 5, 5)
        this.scene.add(this.light)
        this.scene.add(this.sunLight)

        this.ambientLight = new THREE.AmbientLight("#ffffff", 1)
        this.scene.add(this.ambientLight)
    }
    resize() {}

    update() {}
}
