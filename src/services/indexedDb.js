import { openDB } from "idb";

const dbPromise = openDB("mobile-pos", 1, {
    upgrade(db) {
        db.createObjectStore("offlineOrders", {
            keyPath: "id",
            autoIncrement: true,
        });
    },
});

export async function saveOfflineOrder(order) {
    const db = await dbPromise;

    await db.add("offlineOrders", order);
}

export async function getOfflineOrders() {
    const db = await dbPromise;

    return db.getAll("offlineOrders");
}

export async function clearOfflineOrders() {
    const db = await dbPromise;

    const tx = db.transaction(
        "offlineOrders",
        "readwrite",
    );

    await tx.objectStore("offlineOrders").clear();

    await tx.done;
}

export async function hasOfflineOrders() {
    const orders = await getOfflineOrders();

    return orders.length > 0;
}