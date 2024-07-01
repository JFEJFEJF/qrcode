document.addEventListener('DOMContentLoaded', function () {
    function addToTable(name) {
        const table = document.getElementById('attendance-table');
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const timeCell = document.createElement('td');
        const now = new Date().toLocaleString();

        nameCell.textContent = name;
        timeCell.textContent = now;
        
        row.appendChild(nameCell);
        row.appendChild(timeCell);
        table.appendChild(row);
    }

    function onScanSuccess(qrCodeMessage) {
        addToTable(qrCodeMessage);
    }

    function onScanError(errorMessage) {
        console.error(errorMessage);
    }

    const html5QrCode = new Html5Qrcode("reader");
    const qrCodeScannerConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

    Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length) {
            const cameraId = devices[0].id;
            html5QrCode.start(
                cameraId, 
                qrCodeScannerConfig, 
                onScanSuccess, 
                onScanError
            ).catch(err => {
                console.error("خطأ في بدء الماسح:", err);
            });
        } else {
            console.error("لم يتم العثور على أي كاميرا.");
        }
    }).catch(err => {
        console.error("خطأ في الحصول على الكاميرات:", err);
    });
});
