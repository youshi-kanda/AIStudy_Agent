// Web Worker for Pyodide
importScripts("https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js");

async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();
    await self.pyodide.loadPackage(["micropip"]);
}

let pyodideReadyPromise = loadPyodideAndPackages();

self.onmessage = async (event) => {
    // Make sure loading is done
    await pyodideReadyPromise;

    const { id, python, ...context } = event.data;

    // Custom stdout capture
    let stdout = [];
    self.pyodide.setStdout({ batched: (str) => stdout.push(str) });

    try {
        // Run the code
        const results = await self.pyodide.runPythonAsync(python);
        self.postMessage({ id, results, stdout: stdout.join("\n") });
    } catch (error) {
        self.postMessage({ id, error: error.message, stdout: stdout.join("\n") });
    }
};
