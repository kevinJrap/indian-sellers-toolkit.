"use client";
import { useState, useEffect, useRef } from "react";
import { MessageSquare, Copy, Check, Lock, Download, RefreshCw } from "lucide-react";
import * as XLSX from 'xlsx';

export default function PrivateOrderParser() {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("idle");
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [licenseKey, setLicenseKey] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const worker = useRef<Worker | null>(null);

  const VALID_KEY_HASH = "4b50c02ad8d39f60bc9166986eaf7bbf777e59b9a67a052ff6df84bc605c3167";

  useEffect(() => {
    worker.current = new Worker(new URL("../lib/worker.js", import.meta.url), { type: "module" });
    worker.current.addEventListener("message", (e) => {
      if (e.data.status === "complete") {
        setStatus("ready");
        const phone = e.data.text.match(/(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}/g)?.[0] || "Not found";
        const pincode = e.data.text.match(/\b\d{6}\b/g)?.[0] || "Not found";
        setParsedData([{ name: "Extracted via AI", phone, address: "Locally parsed", pincode, product: "Unknown" }]);
      } else if (e.data.status === "ready") {
        setStatus("ready");
      }
    });
  }, []);

  const handleParse = () => {
    setStatus("parsing");
    worker.current?.postMessage({ text });
  };

  const handleUnlock = async () => {
    try {
      const msgUint8 = new TextEncoder().encode(licenseKey.toUpperCase());
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashHex = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
      if (hashHex === VALID_KEY_HASH) setIsUnlocked(true);
    } catch {}
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="text-green-600" />
        <h2 className="text-2xl font-semibold text-gray-800">Private Order Parser</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-48 p-4 border rounded-xl" placeholder="Paste WhatsApp chat..."></textarea>
          <button onClick={handleParse} className="w-full py-3 bg-gray-900 text-white rounded-xl mt-4">Extract Details</button>
        </div>
        <div>
          {parsedData.length > 0 ? (
            <div>
              <p>Name: {parsedData[0].name}</p>
              <p>Phone: {parsedData[0].phone}</p>
              {!isUnlocked && (
                <div className="mt-4 p-4 bg-orange-50 rounded-lg">
                  <p><Lock size={14}/> Unlock Excel Export</p>
                  <input type="text" placeholder="License Key" onChange={(e) => setLicenseKey(e.target.value)} className="p-2 border rounded mt-2"/>
                  <button onClick={handleUnlock} className="bg-orange-600 text-white px-3 py-2 rounded ml-2">Unlock</button>
                </div>
              )}
            </div>
          ) : <p>Paste chat to extract data.</p>}
        </div>
      </div>
    </div>
  );
}
