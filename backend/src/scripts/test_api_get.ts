
import fetch from 'node-fetch';

async function testGet() {
    const ids = [
        '550e8400-e29b-41d4-a716-446655440001', // Mansa Tina Ops (Refreshed manually)
        'f19d4043-5e4e-46cb-bb82-3b767d6e44f8'  // KeenPlex LLC (Created by Wizard?)
    ];

    for (const id of ids) {
        console.log(`\n---------------------------------`);
        console.log(`Fetching Strategy for ID: ${id}`);
        // Assuming running on localhost:8080. Using backend directly if possible or checking port.
        // Frontend uses VITE_BACKEND_URL.
        const url = `http://localhost:8080/api/strategy/${id}`;

        try {
            const res = await fetch(url, {
                headers: { 'Authorization': 'Bearer mock-token' }
            });
            if (!res.ok) {
                console.error(`Status: ${res.status} ${res.statusText}`);
                const txt = await res.text();
                console.error("Body:", txt);
                continue;
            }

            const data = await res.json();
            console.log("Status: 200 OK");
            console.log("DATA KEYS:", Object.keys(data));

            if (data.identity_data) {
                console.log("identity_data:", JSON.stringify(data.identity_data, null, 2));
            } else {
                console.log("❌ identity_data field matches: MISSING");
            }

            if (data.visual_identity) {
                console.log("visual_identity:", JSON.stringify(data.visual_identity, null, 2));
            }

        } catch (e) {
            console.error("Fetch failed:", e);
        }
    }
}

testGet();
