"use client";

import { useEffect, useState, useRef } from "react";
import { Share2, Download, Check, Copy } from "lucide-react";
import { toPng } from "html-to-image";
import {
  selectBalance,
  selectPurchasedProducts,
  selectSpent,
  useSpendingStore,
} from "@/store/spending-store";
import { formatCurrency, formatNumber } from "@/lib/format";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const Receipt = () => {
  const selectedBillionaire = useSpendingStore((state) => state.selectedBillionaire);
  const receiptDate = useSpendingStore((state) => state.receiptDate);
  const receiptTransactionId = useSpendingStore(
    (state) => state.receiptTransactionId
  );
  const filteredProducts = useSpendingStore(selectPurchasedProducts);
  const spent = useSpendingStore(selectSpent);
  const balance = useSpendingStore(selectBalance);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [shareStatus, setShareStatus] = useState<"idle" | "success">("idle");
  const [copyStatus, setCopyStatus] = useState<"idle" | "success">("idle");
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "success">(
    "idle"
  );
  const [canShare, setCanShare] = useState(false);
  const [canCopy, setCanCopy] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share);
    setCanCopy("ClipboardItem" in window && !("ontouchstart" in window));
  }, []);

  const handleShare = async () => {
    if (!receiptRef.current || !navigator.share) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#fafafa",
        pixelRatio: 2,
      });

      const blob = await fetch(dataUrl).then((r) => r.blob());
      const file = new File([blob], "spendbox-receipt.png", {
        type: "image/png",
      });

      await navigator.share({
        title: "My SpendBox Receipt",
        text: `I spent ${formatCurrency(spent)} of ${
          selectedBillionaire?.name
        }'s fortune!`,
        files: [file],
      });

      setShareStatus("success");
      setTimeout(() => setShareStatus("idle"), 2000);
    } catch (error) {
      console.error("Share failed:", error);
    }
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#fafafa",
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "spendbox-receipt.png";
      link.href = dataUrl;
      link.click();

      setDownloadStatus("success");
      setTimeout(() => setDownloadStatus("idle"), 2000);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleCopy = async () => {
    if (!receiptRef.current) return;

    try {
      const dataUrl = await toPng(receiptRef.current, {
        backgroundColor: "#fafafa",
        pixelRatio: 2,
      });

      const blob = await fetch(dataUrl).then((r) => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);

      setCopyStatus("success");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div className="space-y-3">
      <div
        ref={receiptRef}
        className="bg-surface-50 dark:bg-surface-100 text-surface-700 p-4 rounded-xl shadow-sm font-mono"
      >
        <div className="py-2 text-center w-full pb-6">
          <h3 className="text-lg font-bold">SpendBox</h3>
          <p className="text-xs text-center">
            55-011 Sao Paulo, Brazil
            <br />
            Cristian Macedo
          </p>
        </div>

        <div className="flex justify-between text-xs uppercase">
          <span>
            <span className="font-bold">Transaction:</span> #{receiptTransactionId}
          </span>
          <span>
            <span className="font-bold">Date:</span> {receiptDate}
          </span>
        </div>

        <p className="text-xs uppercase mt-1">
          <span className="font-bold">Payment method:</span>{" "}
          {selectedBillionaire?.name || "None"}&apos;s Fortune
        </p>

        <Separator className="my-3 bg-surface-300 dark:bg-surface-300" />

        {/* Table header */}
        <div className="text-xs uppercase space-y-1">
          <div className="flex font-bold">
            <span className="w-[15%]">Qty</span>
            <span className="w-[5%]" />
            <span className="w-[50%]">Item</span>
            <span className="w-[30%] text-right">Amount</span>
          </div>

          {/* Table rows */}
          {filteredProducts.map((product) => (
            <div key={product.id} className="flex">
              <span className="w-[15%]">{formatNumber(product.count)}</span>
              <span className="w-[5%] lowercase">x</span>
              <span className="w-[50%] truncate">{product.name}</span>
              <span className="w-[30%] text-right">
                {formatCurrency(product.price * product.count)}
              </span>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <p className="text-center text-surface-400 py-4 italic">
              No items yet
            </p>
          )}
        </div>

        <Separator className="my-3 bg-surface-300 dark:bg-surface-300" />

        <div className="flex justify-between text-xs uppercase">
          <span className="font-bold">Subtotal:</span>
          <span>{formatCurrency(spent)}</span>
        </div>

        <div className="flex justify-between text-xs uppercase">
          <span className="font-bold">Remaining Balance:</span>
          <span>{formatCurrency(balance)}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        {canCopy && (
          <Button
            onClick={handleCopy}
            disabled={filteredProducts.length === 0}
            variant="outline"
            size="icon"
            className={cn(
              copyStatus === "success" && "border-primary-500 text-primary-600"
            )}
            title="Copy to clipboard"
          >
            {copyStatus === "success" ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
        <Button
          onClick={handleDownload}
          disabled={filteredProducts.length === 0}
          variant="outline"
          className={cn(
            "flex-1",
            downloadStatus === "success" &&
              "border-primary-500 text-primary-600"
          )}
        >
          {downloadStatus === "success" ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Downloaded!
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Download
            </>
          )}
        </Button>
        {canShare && (
          <Button
            onClick={handleShare}
            disabled={filteredProducts.length === 0}
            className={cn(
              "flex-1",
              shareStatus === "success" && "bg-primary-600 hover:bg-primary-600"
            )}
          >
            {shareStatus === "success" ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Shared!
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default Receipt;
