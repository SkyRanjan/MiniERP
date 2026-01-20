const BASE_URL = "http://127.0.0.1:8000";

export async function backupData() {
    const response = await fetch(`${BASE_URL}/backup`, {
        method: "POST"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Backup failed");
    }

    return data;
}

export async function restoreData() {
    const response = await fetch(`${BASE_URL}/restore`, {
        method: "POST"
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.detail || "Restore failed");
    }

    return data;
}
