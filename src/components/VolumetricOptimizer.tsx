"use client";
import { useState } from "react";
import { Package } from "lucide-react";

const BOXES = [
  { name: "S1", l: 20, w: 15, h: 10 },
  { name: "M1", l: 30, w: 20, h: 15 },
  { name: "L1", l: 45, w: 30, h: 25 },
];

const PENALTY_RATE_PER_KG = 50;

export default function VolumetricOptimizer() {
  const [l, setL] = useState("");
  const [w, setW] = useState("");
  const [h, setH] = useState("");
  const [actualWeight, setActualWeight] = useState("");

  const length = parseFloat(l) || 0;
  const width = parseFloat(w) || 0;
  const height = parseFloat(h) || 0;
  const weight = parseFloat(actualWeight) || 0;

  const volumetricWeight = (length * width * height) / 5000;
  const deadWeight = Math.max(0, volumetricWeight - weight);
  const lostProfit = deadWeight * PENALTY_RATE_PER_KG;

  let perfectBox = null;
  for (const box of BOXES) {
    if (box.l >= length && box.w >= width && box.h >= height) {
      perfectBox = box;
      break;
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <Package className="text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800">Volumetric Optimizer</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Length (cm)</label>
              <input type="number" value={l} onChange={(e) => setL(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Width (cm)</label>
              <input type="number" value={w} onChange={(e) => setW(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
              <input type="number" value={h} onChange={(e) => setH(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl outline-none" placeholder="0" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Actual Weight (kg)</label>
            <input type="number" value={actualWeight} onChange={(e) => setActualWeight(e.target.value)} className="w-full p-3 border border-gray-200 rounded-xl outline-none" placeholder="0.0" />
          </div>
        </div>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex flex-col justify-center">
          {volumetricWeight > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2">
                <span className="text-gray-600">Volumetric Weight:</span>
                <span className="font-semibold">{volumetricWeight.toFixed(2)} kg</span>
              </div>
              {lostProfit > 0 ? (
                <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
                  <p className="text-red-700 text-sm mb-1">Hidden Shipping Cost</p>
                  <p className="text-red-800 font-bold text-lg">You are losing ₹{lostProfit.toFixed(2)} on this box!</p>
                </div>
              ) : (
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-green-800 font-bold">Perfectly optimized!</p>
                </div>
              )}
              {perfectBox && (
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <p className="text-blue-800 text-sm font-medium mb-1">Perfect Box Recommendation</p>
                  <p className="text-blue-900 font-bold text-lg">{perfectBox.name} ({perfectBox.l}x{perfectBox.w}x{perfectBox.h} cm)</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              <p>Enter dimensions to see insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
