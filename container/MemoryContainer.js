class MemoryContainer {
    constructor() {
        this.elements = []
        this.id = 0
    }

    list(id) {
        const elem = this.elements.find(elem => elem.id == id)
        return elem || { error: `element doesn't found` }
    }

    listAll() {
        return [...this.elements]
    }

    save(elem) {
        const newElem = { ...elem, id: ++this.id }
        this.elements.push(newElem)
        return newElem
    }

    update(elem, id) {
        const newElem = { id: Number(id), ...elem }
        const index = this.elements.findIndex(p => p.id == id)
        if (index !== -1) {
            this.elements[index] = newElem
            return newElem
        } else {
            return { error: `element doesn't found` }
        }
    }

    delete(id) {
        const index = this.elements.findIndex(elem => elem.id == id)
        if (index !== -1) {
            return this.elements.splice(index, 1)
        } else {
            return { error: `element doesn't found` }
        }
    }

    deleteAll() {
        this.elements = []
    }
}

module.exports = MemoryContainer
