var dbPromised = idb.open("PL-Info", 2, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("schedules", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("id", "id", { unique: false });
});

function saveForLater(article) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("schedules", "readwrite");
      var store = tx.objectStore("schedules");
      store.add(article.match);
      console.log(store);
      return tx.complete;
    })
    .then(function () {
      console.log("Artikel berhasil di simpan.");
      M.toast({ html: `3 Artikel berhasil di simpan.` });
    })
    .catch(err => {
      console.log(`udah disimpen ${err}`);
      M.toast({ html: `udah disimpen ${err}` });
    })
    ;
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("schedules", "readonly");
        var store = tx.objectStore("schedules");
        return store.getAll();
      })
      .then(function (shcedules) {
        resolve(shcedules);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("schedules", "readonly");
        var store = tx.objectStore("schedules");
        console.log(`${id} jadwalnya`);
        console.log(store);
        return store.get(id);
      })
      .then(function (schedule) {
        resolve(schedule);
      });
  });
}