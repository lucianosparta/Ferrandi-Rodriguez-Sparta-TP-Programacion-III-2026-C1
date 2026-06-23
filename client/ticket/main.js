const btnDescargar = document.getElementById("btn-descargar");
const btnSalir = document.getElementById("btn-salir");

btnDescargar.addEventListener('click', async () => {
    const { jsPDF } = window.jspdf;
    const ticket = document.getElementById('ticket');

    btnDescargar.style.display = "none";
    btnSalir.style.display = "none";

    const canvas = await html2canvas(ticket, { scale: 2, backgroundColor: "#ffffff" }); 
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
    pdf.save(`ticket-${Date.now()}.pdf`);

    btnDescargar.style.display = "block";
    btnSalir.style.display = "block";
});