var NEXT_ID = 1;

class Database {
    constructor() {
        this.objects = {};
    }

    all() {
        return Object.values(this.objects);
    }

    find(id) {
        return this.objects[id];
    }

    create(record) {
        record.id = NEXT_ID++;
        this.objects[record.id] = record;
        return record;
    }

    update(id, attrs) {
        Object.assign(this.objects[id], attrs);
        return this.objects[id];
    }

    destroy(id) {
        const record = this.objects[id];
        delete this.objects[id];
        return record;
    }
}

module.exports = new Database();