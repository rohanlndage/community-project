async function openVlsiPdf() {
    try {
        const response = await fetch(
            "http://localhost:8080/api/study-material/vlsi"
        );

        if (!response.ok) {
            throw new Error("Failed to get PDF");
        }

        const materials = await response.json();

        if (materials.length === 0) {
            alert("PDF not found");
            return;
        }

        const pdfUrl = materials[0].url;

        window.open(pdfUrl, "_blank");

    } catch (error) {
        console.error(error);
        alert("Unable to open PDF");
    }
}