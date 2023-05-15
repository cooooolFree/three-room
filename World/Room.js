import * as THREE from "three"
import Experience from "../Experience/Experience"

export default class Room {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.room = this.resources.items.room
        this.actualRoom = this.room.scene

        this.setModel()
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            child.material = new THREE.MeshStandardMaterial({
                envMap: this.resources.items.background.envMap.texture,
                envMapIntensity: 1,
            })

            child.castShadow = true
            child.receiveShadow = true

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild) => {
                    groupChild.material = new THREE.MeshStandardMaterial({
                        envMap: this.resources.items.background.envMap.texture,
                        envMapIntensity: 1,
                    })

                    groupChild.castShadow = true
                    groupChild.receiveShadow = true
                })
            }
        })
        this.scene.add(this.actualRoom)
        this.actualRoom.scale.set(0.1, 0.1, 0.1)
    }
    resize() {}

    update() {}
}
