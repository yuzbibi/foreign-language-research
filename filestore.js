/**
 * ファイルのローカル保存 (IndexedDB fallback)
 */

const FS_DB = 'AGY_LocalFiles';
const FS_STORE = 'files';

function getFsDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(FS_DB, 1);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(FS_STORE)) {
        db.createObjectStore(FS_STORE);
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

window.fsSave = async function(name, fileBlob) {
  const db = await getFsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FS_STORE, 'readwrite');
    tx.objectStore(FS_STORE).put(fileBlob, name);
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
};

window.fsGet = async function(name) {
  const db = await getFsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FS_STORE, 'readonly');
    const req = tx.objectStore(FS_STORE).get(name);
    req.onsuccess = () => resolve(req.result);
    req.onerror = e => reject(e.target.error);
  });
};

window.fsDelete = async function(name) {
  const db = await getFsDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(FS_STORE, 'readwrite');
    tx.objectStore(FS_STORE).delete(name);
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
};

window.fsOpenFile = async function(idbUrl) {
  const name = idbUrl.replace(/^idb:/, '');
  
  // ポップアップブロック回避のため、先に空のウィンドウを開く
  let newWin = null;
  try {
    newWin = window.open('about:blank', '_blank');
  } catch(e) {}

  try {
    const blob = await window.fsGet(name);
    if (!blob) {
      if (newWin) newWin.close();
      alert('ファイルが見つかりません。\n管理パネルから再度アップロードしてください。');
      return;
    }
    const url = URL.createObjectURL(blob);
    
    if (newWin) {
      newWin.location.href = url;
    } else {
      window.location.href = url;
    }
    
    setTimeout(() => URL.revokeObjectURL(url), 15000);
  } catch(e) {
    if (newWin) newWin.close();
    alert('ファイルを開けませんでした: ' + e.message);
  }
};

document.addEventListener('click', e => {
  const link = e.target.closest('[data-idb-url]');
  if (link) {
    e.preventDefault();
    window.fsOpenFile(link.dataset.idbUrl);
  }
});
