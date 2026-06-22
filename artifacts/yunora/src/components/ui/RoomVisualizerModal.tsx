import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Download, RotateCcw, ZoomIn, ZoomOut, Move, Eye, RefreshCcw } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  productImage: string;
  productName: string;
}

interface Pos { x: number; y: number; w: number; h: number }

const SAMPLE_ROOMS = [
  { label: "Living Room",  color: "#C9B99A", emoji: "🛋️" },
  { label: "Bedroom",      color: "#A8BBA8", emoji: "🛏️" },
  { label: "Dining Room",  color: "#B8A898", emoji: "🍽️" },
];

export default function RoomVisualizerModal({ open, onClose, productImage, productName }: Props) {
  const [roomSrc,    setRoomSrc]    = useState<string | null>(null);
  const [stage,      setStage]      = useState<"upload" | "compose">("upload");
  const [opacity,    setOpacity]    = useState(90);
  const [pos,        setPos]        = useState<Pos>({ x: 80, y: 80, w: 200, h: 200 });
  const [dragging,   setDragging]   = useState(false);
  const [resizing,   setResizing]   = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ mx: 0, my: 0, pos: { x: 0, y: 0, w: 0, h: 0 } });
  const [downloaded, setDownloaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* Reset on open */
  useEffect(() => {
    if (open) { setStage("upload"); setRoomSrc(null); setOpacity(90); }
  }, [open]);

  /* Escape to close */
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  /* ── File upload ── */
  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setRoomSrc(url);
    setStage("compose");
    setPos({ x: 60, y: 60, w: 240, h: 240 });
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  /* ── Drag product image ── */
  const getRelPos = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const onProductMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const rp = getRelPos(e.clientX, e.clientY);
    setDragOffset({ x: rp.x - pos.x, y: rp.y - pos.y });
    setDragging(true);
  };
  const onProductTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    const t = e.touches[0];
    const rp = getRelPos(t.clientX, t.clientY);
    setDragOffset({ x: rp.x - pos.x, y: rp.y - pos.y });
    setDragging(true);
  };

  /* ── Resize handle ── */
  const onResizeMouseDown = (handle: string) => (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    setResizing(handle);
    setResizeStart({ mx: e.clientX, my: e.clientY, pos: { ...pos } });
  };
  const onResizeTouchStart = (handle: string) => (e: React.TouchEvent) => {
    e.stopPropagation();
    const t = e.touches[0];
    setResizing(handle);
    setResizeStart({ mx: t.clientX, my: t.clientY, pos: { ...pos } });
  };

  /* ── Global mouse/touch move ── */
  useEffect(() => {
    const bounds = () => containerRef.current?.getBoundingClientRect();

    const handleMove = (clientX: number, clientY: number) => {
      const rect = bounds();
      if (!rect) return;
      if (dragging) {
        const nx = Math.max(0, Math.min(rect.width  - pos.w, clientX - rect.left - dragOffset.x));
        const ny = Math.max(0, Math.min(rect.height - pos.h, clientY - rect.top  - dragOffset.y));
        setPos(p => ({ ...p, x: nx, y: ny }));
      }
      if (resizing) {
        const dx = clientX - resizeStart.mx;
        const dy = clientY - resizeStart.my;
        const sp = resizeStart.pos;
        const MIN = 60;
        if (resizing === "br") {
          setPos({ x: sp.x, y: sp.y, w: Math.max(MIN, sp.w + dx), h: Math.max(MIN, sp.h + dy) });
        } else if (resizing === "bl") {
          const nw = Math.max(MIN, sp.w - dx);
          setPos({ x: sp.x + sp.w - nw, y: sp.y, w: nw, h: Math.max(MIN, sp.h + dy) });
        } else if (resizing === "tr") {
          const nh = Math.max(MIN, sp.h - dy);
          setPos({ x: sp.x, y: sp.y + sp.h - nh, w: Math.max(MIN, sp.w + dx), h: nh });
        } else if (resizing === "tl") {
          const nw = Math.max(MIN, sp.w - dx);
          const nh = Math.max(MIN, sp.h - dy);
          setPos({ x: sp.x + sp.w - nw, y: sp.y + sp.h - nh, w: nw, h: nh });
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => { if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY); };
    const stopDrag = () => { setDragging(false); setResizing(null); };

    window.addEventListener("mousemove",  onMouseMove);
    window.addEventListener("mouseup",    stopDrag);
    window.addEventListener("touchmove",  onTouchMove, { passive: true });
    window.addEventListener("touchend",   stopDrag);
    return () => {
      window.removeEventListener("mousemove",  onMouseMove);
      window.removeEventListener("mouseup",    stopDrag);
      window.removeEventListener("touchmove",  onTouchMove);
      window.removeEventListener("touchend",   stopDrag);
    };
  }, [dragging, resizing, dragOffset, resizeStart, pos.w, pos.h]);

  /* ── Download ── */
  const handleDownload = async () => {
    if (!roomSrc || !containerRef.current) return;
    const canvas = document.createElement("canvas");
    const rect = containerRef.current.getBoundingClientRect();
    canvas.width  = rect.width  * 2;
    canvas.height = rect.height * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(2, 2);

    const loadImg = (src: string) => new Promise<HTMLImageElement>(res => {
      const img = new Image(); img.crossOrigin = "anonymous";
      img.onload = () => res(img); img.src = src;
    });

    const roomImg = await loadImg(roomSrc);
    ctx.drawImage(roomImg, 0, 0, rect.width, rect.height);
    ctx.globalAlpha = opacity / 100;
    const prodImg = await loadImg(productImage);
    ctx.drawImage(prodImg, pos.x, pos.y, pos.w, pos.h);

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg", 0.92);
    link.download = `yunora-room-preview-${Date.now()}.jpg`;
    link.click();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.22 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            style={{ maxHeight: "92vh" }}
            onClick={e => e.stopPropagation()}>

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#E8DDD0] shrink-0" style={{ background: "#FDFCFA" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/15 flex items-center justify-center">
                  <Eye className="h-4 w-4 text-[#D4AF37]"/>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-[#3A2A20]">View In Your Room</h2>
                  <p className="text-[10px] text-[#9E8A78]">{productName}</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#F5F0EA] flex items-center justify-center hover:bg-[#E8DDD0] transition-colors">
                <X className="h-4 w-4 text-[#3A2A20]"/>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {stage === "upload" ? (
                /* ── UPLOAD STAGE ── */
                <div className="p-5 flex flex-col gap-4">
                  {/* Upload zone */}
                  <div
                    onDrop={onDrop} onDragOver={e => e.preventDefault()}
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#D8C3A5] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all group min-h-[200px]">
                    <div className="w-14 h-14 rounded-2xl bg-[#F5F0EA] group-hover:bg-[#D4AF37]/10 flex items-center justify-center transition-colors">
                      <Upload className="h-6 w-6 text-[#D4AF37]"/>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-[#3A2A20] mb-1">Upload Your Room Photo</p>
                      <p className="text-xs text-[#9E8A78]">Drag & drop or click to browse · JPG, PNG · Max 10MB</p>
                    </div>
                    <span className="px-4 py-1.5 bg-[#3A2A20] text-white text-xs font-bold rounded-xl">Choose Photo</span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange}/>

                  {/* Or use sample room */}
                  <div>
                    <p className="text-xs font-bold text-[#9E8A78] mb-2 tracking-wider text-center">— OR TRY A SAMPLE ROOM —</p>
                    <div className="grid grid-cols-3 gap-2">
                      {SAMPLE_ROOMS.map(room => (
                        <button key={room.label}
                          onClick={() => {
                            /* Generate a colored sample room via canvas */
                            const c = document.createElement("canvas");
                            c.width = 800; c.height = 600;
                            const ctx = c.getContext("2d")!;
                            const grad = ctx.createLinearGradient(0, 0, 0, 600);
                            grad.addColorStop(0, room.color + "cc");
                            grad.addColorStop(1, room.color + "55");
                            ctx.fillStyle = grad;
                            ctx.fillRect(0, 0, 800, 600);
                            /* Floor line */
                            ctx.fillStyle = "rgba(0,0,0,0.06)";
                            ctx.fillRect(0, 450, 800, 150);
                            /* Wall line */
                            ctx.strokeStyle = "rgba(0,0,0,0.08)";
                            ctx.lineWidth = 2;
                            ctx.beginPath(); ctx.moveTo(0, 450); ctx.lineTo(800, 450); ctx.stroke();
                            setRoomSrc(c.toDataURL());
                            setStage("compose");
                            setPos({ x: 60, y: 60, w: 240, h: 240 });
                          }}
                          className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-[#E8DDD0] hover:border-[#D4AF37] hover:bg-[#FAF8F5] transition-all">
                          <span className="text-2xl">{room.emoji}</span>
                          <span className="text-[10px] font-semibold text-[#6B5744]">{room.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tips */}
                  <div className="bg-[#F8F5F0] rounded-2xl p-4">
                    <p className="text-[10px] font-bold text-[#D4AF37] tracking-widest mb-2">TIPS FOR BEST RESULTS</p>
                    {[
                      "Use a well-lit, clear photo of your room",
                      "Take the photo straight-on (not at an angle)",
                      "Higher resolution photos look better",
                    ].map(t => (
                      <p key={t} className="text-xs text-[#6B5744] flex items-start gap-1.5 mb-1">
                        <span className="text-[#D4AF37] mt-0.5 shrink-0">✦</span> {t}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                /* ── COMPOSE STAGE ── */
                <div className="flex flex-col lg:flex-row h-full">
                  {/* Canvas area */}
                  <div className="flex-1 min-h-[300px] lg:min-h-0 p-3 relative" style={{ background: "#1a1a1a" }}>
                    <div ref={containerRef}
                      className="relative w-full h-full overflow-hidden rounded-2xl select-none"
                      style={{ aspectRatio: "4/3", cursor: dragging ? "grabbing" : "default" }}>
                      {/* Room background */}
                      <img src={roomSrc!} alt="Your room" className="absolute inset-0 w-full h-full object-cover"/>

                      {/* Product overlay */}
                      <div
                        style={{ position: "absolute", left: pos.x, top: pos.y, width: pos.w, height: pos.h, opacity: opacity / 100, cursor: dragging ? "grabbing" : "grab", touchAction: "none" }}
                        onMouseDown={onProductMouseDown}
                        onTouchStart={onProductTouchStart}>
                        <img src={productImage} alt={productName}
                          className="w-full h-full object-contain pointer-events-none select-none"
                          style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.3))" }}
                          draggable={false}/>

                        {/* Border */}
                        <div className="absolute inset-0 border-2 border-white/60 rounded-sm pointer-events-none"/>

                        {/* Resize handles */}
                        {[
                          { id: "tl", style: { top: -6, left: -6,     cursor: "nw-resize" } },
                          { id: "tr", style: { top: -6, right: -6,    cursor: "ne-resize" } },
                          { id: "bl", style: { bottom: -6, left: -6,  cursor: "sw-resize" } },
                          { id: "br", style: { bottom: -6, right: -6, cursor: "se-resize" } },
                        ].map(h => (
                          <div key={h.id}
                            className="absolute w-3.5 h-3.5 bg-white border-2 border-[#D4AF37] rounded-sm shadow-md z-10"
                            style={{ ...h.style, touchAction: "none" }}
                            onMouseDown={onResizeMouseDown(h.id)}
                            onTouchStart={onResizeTouchStart(h.id)}
                            onClick={e => e.stopPropagation()}/>
                        ))}

                        {/* Move icon */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="bg-black/30 rounded-full p-1">
                            <Move className="h-3 w-3 text-white opacity-70"/>
                          </div>
                        </div>
                      </div>

                      {/* Overlay label */}
                      <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-sm text-white text-[9px] font-medium px-2 py-1 rounded-full pointer-events-none">
                        Drag to move · Corner to resize
                      </div>
                    </div>
                  </div>

                  {/* Controls panel */}
                  <div className="w-full lg:w-56 p-4 flex flex-col gap-3 shrink-0 border-t lg:border-t-0 lg:border-l border-[#E8DDD0]" style={{ background: "#FDFCFA" }}>
                    <div>
                      <p className="text-[9px] font-bold text-[#D4AF37] tracking-widest mb-2">PRODUCT</p>
                      <div className="flex items-center gap-2 p-2 bg-[#F5F0EA] rounded-xl">
                        <img src={productImage} className="w-10 h-10 object-cover rounded-lg shrink-0"/>
                        <p className="text-xs font-semibold text-[#3A2A20] leading-tight line-clamp-2">{productName}</p>
                      </div>
                    </div>

                    {/* Opacity */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[9px] font-bold text-[#9E8A78] tracking-wider uppercase">Opacity</p>
                        <span className="text-xs font-bold text-[#3A2A20]">{opacity}%</span>
                      </div>
                      <input type="range" min={20} max={100} value={opacity} onChange={e => setOpacity(Number(e.target.value))}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{ accentColor: "#D4AF37", background: `linear-gradient(to right, #D4AF37 ${opacity}%, #E8DDD0 ${opacity}%)` }}/>
                    </div>

                    {/* Quick size controls */}
                    <div>
                      <p className="text-[9px] font-bold text-[#9E8A78] tracking-wider uppercase mb-1.5">Size</p>
                      <div className="flex gap-1.5">
                        <button onClick={() => setPos(p => ({ ...p, w: Math.max(60, p.w - 20), h: Math.max(60, p.h - 20) }))}
                          className="flex-1 h-7 rounded-lg bg-[#F5F0EA] flex items-center justify-center hover:bg-[#E8DDD0] transition-colors">
                          <ZoomOut className="h-3.5 w-3.5 text-[#6B5744]"/>
                        </button>
                        <button onClick={() => setPos(p => ({ ...p, w: p.w + 20, h: p.h + 20 }))}
                          className="flex-1 h-7 rounded-lg bg-[#F5F0EA] flex items-center justify-center hover:bg-[#E8DDD0] transition-colors">
                          <ZoomIn className="h-3.5 w-3.5 text-[#6B5744]"/>
                        </button>
                        <button onClick={() => setPos({ x: 60, y: 60, w: 200, h: 200 })}
                          className="flex-1 h-7 rounded-lg bg-[#F5F0EA] flex items-center justify-center hover:bg-[#E8DDD0] transition-colors">
                          <RotateCcw className="h-3.5 w-3.5 text-[#6B5744]"/>
                        </button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 mt-auto pt-2">
                      <button onClick={handleDownload}
                        className={`w-full h-9 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${downloaded ? "bg-[#6B9E6E] text-white" : "bg-[#3A2A20] text-white hover:bg-[#4a3830]"}`}>
                        <Download className="h-3.5 w-3.5"/>
                        {downloaded ? "Downloaded ✓" : "Save Image"}
                      </button>
                      <button onClick={() => { setStage("upload"); setRoomSrc(null); }}
                        className="w-full h-9 rounded-xl border-2 border-[#D8C3A5] text-xs font-bold text-[#6B5744] flex items-center justify-center gap-2 hover:border-[#3A2A20] transition-colors">
                        <RefreshCcw className="h-3.5 w-3.5"/>
                        Try Another Room
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
