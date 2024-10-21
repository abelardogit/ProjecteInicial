document.getElementById("Boton-Volver").onclick = function() {
    window.location.href = "./index.html";
};

Dynamsoft.DBR.BarcodeReader.license = "DLS2eyJoYW5kc2hha2VDb2RlIjoiMjAwMDAxLTE2NDk4Mjk3OTI2MzUiLCJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSIsInNlc3Npb25QYXNzd29yciI6IndTcGR6Vm05WDJrcEQ5YUoifQ==";
let scanner = null;

(async () => {
    scanner = await Dynamsoft.DBR.BarcodeScanner.createInstance();
    scanner.onFrameRead = results => { console.log(results); };
    scanner.onUnduplicatedRead = (txt, result) => {
        window.location.href = "https://anticaromaristorante.netlify.app/OpcionsCompra";
    };
    await scanner.show();
})();