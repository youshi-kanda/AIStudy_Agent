import { useEffect, useRef, useState } from 'react';

type ExecutionResult = {
    results: any;
    stdout: string;
    error?: string;
};

export function usePyodide() {
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState<string[]>([]);
    const workerRef = useRef<Worker | null>(null);

    useEffect(() => {
        // Initialize Worker
        workerRef.current = new Worker('/pyodide-worker.js');

        workerRef.current.onmessage = (event) => {
            const { stdout, error, results } = event.data;
            setIsRunning(false);

            if (stdout) {
                setOutput(prev => [...prev, stdout]);
            }

            if (error) {
                setOutput(prev => [...prev, `Error: ${error}`]);
            } else if (results !== undefined && results !== null) {
                // If it returns a value (last line expression), show it
                setOutput(prev => [...prev, `Result: ${results}`]);
            }
        };

        return () => {
            workerRef.current?.terminate();
        };
    }, []);

    const runPython = (code: string) => {
        setIsRunning(true);
        setOutput([]); // Clear previous output on new run? Optionally.
        workerRef.current?.postMessage({
            id: Date.now(),
            python: code,
        });
    };

    const clearOutput = () => setOutput([]);

    return { runPython, isRunning, output, clearOutput };
}
