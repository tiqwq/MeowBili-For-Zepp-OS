function str2ab(str) {
  const buf = new ArrayBuffer(str.length * 2);
  const bufView = new Uint16Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}

export class LocalStorage {
  constructor(fileName = 'local_storage.txt') {
    this.fileName = fileName;
    this.contentObj = this.get();
  }

  save() {
    const file = hmFS.open(this.fileName, hmFS.O_RDWR | hmFS.O_TRUNC);
    const contentBuffer = str2ab(JSON.stringify(this.contentObj));
    hmFS.write(file, contentBuffer, 0, contentBuffer.byteLength);
    hmFS.close(file);
  }

  get() {
    const [fsStat, err] = hmFS.stat(this.fileName);
    if (err === 0) {
      const { size } = fsStat;
      const fileContentUnit = new Uint16Array(new ArrayBuffer(size));
      const file = hmFS.open(this.fileName, hmFS.O_RDONLY | hmFS.O_CREAT);
      hmFS.seek(file, 0, hmFS.SEEK_SET);
      hmFS.read(file, fileContentUnit.buffer, 0, size);
      hmFS.close(file);

      try {
        const val = ab2str(fileContentUnit.buffer);
        return val ? JSON.parse(val) : {};
      } catch (error) {
        return {};
      }
    }

    return {};
  }

  setItem(key, value) {
    this.contentObj[key] = value;
    this.save();
  }

  getItem(key, defaultValue) {
    if (key in this.contentObj) {
      return this.contentObj[key];
    } else {
      this.setItem(key, defaultValue);
      return defaultValue;
    }
  }

  removeItem(key) {
    delete this.contentObj[key];
    this.save();
  }

  clear() {
    this.contentObj = {};
    this.save();
  }

  setItemWithExpiry(key, value, expiryTime) {
    this.contentObj[key] = {
      value: value,
      expiry: Date.now() + expiryTime
    };
    this.save();
  }

  getItemWithExpiry(key) {
    if (key in this.contentObj) {
      const item = this.contentObj[key];
      if (item.expiry && Date.now() > item.expiry) {
        delete this.contentObj[key];
        this.save();
        return null;
      }
      return item.value;
    }
    return null;
  }
  getFileInfo() {
    const [fsStat, err] = hmFS.stat(this.fileName);
    if (err === 0) {
      return fsStat;
    }
    return null;
  }
}