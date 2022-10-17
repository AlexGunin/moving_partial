export class Cache {
  constructor() {
    this.values = {};
  }

  setItem(category, field, value) {
    this.values[category] = this.values[category] ?? {};
    this.values[category][field] = value;
    return value;
  }

  getItem(category, field) {
    return this.values[category] ? this.values[category][field] : undefined;
  }
}
