"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// 定義資料結構類型
interface SimulationResult {
  sampleSize: number;
  proportionHeads: number;
  headCount: number; // 新增 headCount 屬性
}

// 模擬一次丟硬幣，返回 1 表示正面，0 表示反面
const flipCoin = (probHeads: number = 0.5): number => {
  return Math.random() < probHeads ? 1 : 0;
};

// 模擬多次丟硬幣，並計算正面出現的計數
const simulateFlips = (nFlips: number, probHeads: number = 0.5): number => {
  let headsCount = 0;
  for (let i = 0; i < nFlips; i++) {
    headsCount += flipCoin(probHeads); // 計算正面出現的次數
  }
  return headsCount; // 返回正面出現的次數
};

// 定義 React Component
const CoinFlipSimulation: React.FC = () => {
  const [data, setData] = useState<SimulationResult[]>([]);

  // 執行模擬並更新資料
  const runSimulation = () => {
    const sampleSizes = [10, 50, 100, 500, 1000, 5000]; // 不同的樣本量
    const results: SimulationResult[] = [];

    sampleSizes.forEach((size) => {
      const headCount = simulateFlips(size); // 單次實驗計算正面出現的次數
      const proportionHeads = headCount / size; // 計算正面出現的比例
      results.push({ sampleSize: size, proportionHeads, headCount }); // 新增 headCount
    });

    setData(results); // 更新結果
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 w-full">
      <h2 className="text-center text-4xl font-bold mb-8">
        Coin Flip Simulation
      </h2>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-8"
        onClick={runSimulation}
      >
        Run Simulation
      </button>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="sampleSize"
            label={{
              value: "Sample Size",
              position: "insideBottom",
              offset: -5,
            }}
          />
          <YAxis
            label={{
              value: "Proportion of Heads",
              angle: -90,
              position: "insideLeft",
            }}
            domain={[0, 1]} // 固定 Y 軸範圍
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { headCount, proportionHeads } = payload[0].payload;
                return (
                  <div className="bg-white border border-gray-300 p-2 rounded shadow">
                    <p>Head Count: {headCount}</p>{" "}
                    {/* 顯示單次實驗的正面計數 */}
                    <p>Proportion of Heads: {proportionHeads.toFixed(2)}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Legend />
          <Bar
            dataKey="proportionHeads"
            fill="#8884d8"
            name="Proportion of Heads"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CoinFlipSimulation;
