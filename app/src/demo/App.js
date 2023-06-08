import React, { useState, useEffect } from "react";
import localforage from "localforage";

const App = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    localforage.config({
      driver: localforage.INDEXEDDB, // Use o IndexedDB como driver de armazenamento
      name: "osni.kuchler", // Nome do banco de dados
      storeName: "cache", // Nome do objeto de armazenamento
    });
  }, []);

  const calculateFactorial = async () => {
    try {
      const factorial = await calculate(number);
      setResult(factorial);

      const key = `result/${number}`;

      console.log("Dados armazenados");
      await localforage.setItem(key, factorial);

      const resultado = await localforage.setItem(key, factorial);
      console.log("Dados resgatado: ", resultado);
    } catch (error) {
      console.error(error);
    }
  };

  const calculate = (number) => {
    return new Promise((resolve, reject) => {
      let factorial = 1;

      // Cálculo do fatorial
      for (let i = 2; i <= number; i++) {
        factorial *= i;
      }

      resolve(factorial);
    });
  };

  return (
    <div>
      <input
        type="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
      />
      <button onClick={calculateFactorial}>Calculate Factorial</button>
      <p>Result: {result}</p>
    </div>
  );
};

export default App;
