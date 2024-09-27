"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { useReducer, useEffect, useState } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch"; // 引入 Shadcn 的 Switch 元件
import { Input } from "@/components/ui/input";

type ChartData = {
  name: string;
  probability: number; // 黑色按鈕的機率
  probabilityRed: number; // 紅色按鈕的機率
};

interface State {
  pBlack: number; // 黑色按鈕的成功機率
  pRed: number; // 紅色按鈕的成功機率
  n: number; // 實驗次數
  data: ChartData[]; // 包含黑色與紅色按鈕機率的資料
}

type Action =
  | { type: "SET_P_BLACK"; payload: number }
  | { type: "SET_P_RED"; payload: number }
  | { type: "SET_N"; payload: number }
  | { type: "SET_DATA"; payload: ChartData[] };

const initialState: State = {
  pBlack: 0.5, // 黑色按鈕的初始成功機率
  pRed: 0.5, // 紅色按鈕的初始成功機率
  n: 10, // 初始實驗次數
  data: [],
};

// reducer 函數
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_P_BLACK":
      return { ...state, pBlack: action.payload };
    case "SET_P_RED":
      return { ...state, pRed: action.payload };
    case "SET_N":
      return { ...state, n: action.payload };
    case "SET_DATA":
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

// 計算二項分佈
function calculateBinomialDistribution(
  pBlack: number,
  pRed: number,
  n: number,
): ChartData[] {
  const chartData: ChartData[] = [];

  function logFactorial(n: number): number {
    if (n <= 1) return 0;
    let logSum = 0;
    for (let i = 2; i <= n; i++) {
      logSum += Math.log(i);
    }
    return logSum;
  }

  function combination(n: number, k: number): number {
    if (k > n) return 0;
    if (k === 0 || k === n) return 1;

    const logComb = logFactorial(n) - logFactorial(k) - logFactorial(n - k);
    return Math.exp(logComb); // 將對數值轉換回普通值
  }

  // 計算每次成功次數的機率
  for (let k = 0; k <= n; k++) {
    const probabilityBlack =
      combination(n, k) * Math.pow(pBlack, k) * Math.pow(1 - pBlack, n - k);
    const probabilityRed =
      combination(n, k) * Math.pow(pRed, k) * Math.pow(1 - pRed, n - k);

    chartData.push({
      name: k.toString(),
      probability: probabilityBlack,
      probabilityRed: probabilityRed,
    });
  }

  return chartData;
}

const chartConfig = {
  probability: {
    label: "機率",
    color: "#FFB733",
  },
} satisfies ChartConfig;

export default function BinomialDistributionChart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // 新增狀態以控制柱狀圖的顯示
  const [showBlackBar, setShowBlackBar] = useState(true);
  const [showRedBar, setShowRedBar] = useState(true);

  // 計算初始資料
  useEffect(() => {
    const initialData = calculateBinomialDistribution(
      state.pBlack,
      state.pRed,
      state.n,
    );
    dispatch({ type: "SET_DATA", payload: initialData });
  }, []); // 只在初次渲染時計算一次

  // 更新分佈資料
  const updateChartData = (pBlack: number, pRed: number, n: number) => {
    const newData = calculateBinomialDistribution(pBlack, pRed, n);
    dispatch({ type: "SET_DATA", payload: newData });
  };

  // 處理黑色按鈕的機率改變
  const handlePBlackChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPBlack = parseFloat(event.target.value);
    if (newPBlack <= 1) {
      dispatch({ type: "SET_P_BLACK", payload: newPBlack });
      updateChartData(newPBlack, state.pRed, state.n); // 直接更新資料
    }
  };

  // 處理紅色按鈕的機率改變
  const handlePRedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPRed = parseFloat(event.target.value);
    if (newPRed <= 1) {
      dispatch({ type: "SET_P_RED", payload: newPRed });
      updateChartData(state.pBlack, newPRed, state.n); // 直接更新資料
    }
  };

  // 處理 n 的改變
  const handleNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newN = parseInt(event.target.value, 10);
    dispatch({ type: "SET_N", payload: newN });
    updateChartData(state.pBlack, state.pRed, newN); // 直接更新資料
  };

  // 計算 Y 軸的動態域，收斂到小數點後第一位
  const maxProbability = Math.max(
    Math.max(...state.data.map((d) => d.probability), 0),
    Math.max(...state.data.map((d) => d.probabilityRed), 0),
  );
  const dynamicDomain = [
    0,
    Math.min(1, Math.ceil((maxProbability + 0.2) * 10) / 10), // 收斂到小數點後第一位
  ];

  // 計算二項分佈的期望值
  const averageBlack = Math.round(state.n * state.pBlack * 1000) / 1000;
  const averageRed = Math.round(state.n * state.pRed * 1000) / 1000;

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4">
        <div className="flex space-x-2">
          <label className="mr-2">
            點擊黑色按鈕的機率 (p):
            <Input
              type="number"
              step="0.01"
              value={state.pBlack}
              onChange={handlePBlackChange}
              // className="border rounded px-2 py-1 ml-2 bg-gray-100 text-gray-800 shadow"
              min={0}
              max={1}
            />
          </label>
          <label className="mr-2">
            點擊紅色按鈕的機率 (p):
            <Input
              type="number"
              step="0.01"
              value={state.pRed}
              onChange={handlePRedChange}
              // className="border rounded px-2 py-1 ml-2 bg-gray-100 text-gray-800 shadow"
              min={0}
              max={1}
            />
          </label>
        </div>

        <label className="mr-2">
          實驗次數 (n):
          <Input
            type="number"
            value={state.n}
            onChange={handleNChange}
            // className="border rounded px-2 py-1 ml-2 bg-gray-100 text-gray-800 shadow focus:ring focus:ring-blue-300"
            min={0}
          />
        </label>
      </div>
      {/* 添加 Shadcn 的 Switch 元件，並美化 */}
      <div className="mb-4 flex items-center space-x-4">
        <label className="flex items-center">
          <span className="mr-2">顯示黑色柱狀圖</span>
          <Switch
            checked={showBlackBar}
            onCheckedChange={setShowBlackBar}
            className="data-[state=checked]:bg-zinc-600 data-[state=unchecked]:bg-zinc-400"
          />
        </label>
        <label className="flex items-center">
          <span className="mr-2">顯示紅色柱狀圖</span>
          <Switch
            checked={showRedBar}
            onCheckedChange={setShowRedBar}
            className="data-[state=checked]:bg-red-500 data-[state=unchecked]:bg-red-400"
          />
        </label>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart
          data={state.data} // 使用合併後的資料
          margin={{
            top: 40,
            right: 20,
            left: 20,
            bottom: 40,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            label={{
              value: "成功次數",
              fontSize: 16,
              position: "insideBottom",
              offset: -18,
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            domain={dynamicDomain} // 使用動態域
            tickMargin={10}
            label={{
              value: "機率",
              fontSize: 16,
              angle: -90,
              position: "insideLeft",
              offset: 0,
            }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {showBlackBar && (
            <Bar
              dataKey="probability"
              fill="rgba(0, 0, 0, 0.7)" // 設置黑色柱狀圖的透明度
              radius={4}
            />
          )}
          {showRedBar && (
            <Bar
              dataKey="probabilityRed"
              fill="rgba(255, 0, 0, 0.7)" // 設置紅色柱狀圖的透明度
              radius={4}
            />
          )}
        </BarChart>
      </ChartContainer>
      {/* 顯示二項分佈的期望值 */}
      <div className="mt-4 text-lg font-semibold">
        成功點擊黑色按鈕的期望值: {averageBlack}
      </div>
      <div className="mt-4 text-lg font-semibold text-red-500">
        成功點擊紅色按鈕的期望值: {averageRed}
      </div>
    </div>
  );
}
