"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Props = { photo: string; name: string };

export default function ProfileLaptop({ photo, name }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) return;

    const state = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      velX: 0,
      velY: 0,
      baseRotX: -14,
      baseRotY: 18,
      baseRotZ: -3,
    };

    const onMove = (e: PointerEvent) => {
      if (window.innerWidth < 768) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      state.targetX = x;
      state.targetY = y;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    let frame = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = now * 0.001;

      const ax = (state.targetX - state.currentX) * 4;
      const ay = (state.targetY - state.currentY) * 4;
      state.velX = (state.velX + ax * dt) * 0.86;
      state.velY = (state.velY + ay * dt) * 0.86;
      state.currentX += state.velX;
      state.currentY += state.velY;

      const driftX = Math.sin(t * 0.22) * 0.15 + Math.sin(t * 0.38) * 0.06;
      const driftY = Math.cos(t * 0.28) * 0.15 + Math.cos(t * 0.47) * 0.06;
      const driftZ = Math.sin(t * 0.17) * 0.18;

      const tx = state.targetX + driftX;
      const ty = state.targetY + driftY;

      const rx = state.baseRotX + ty * -7 + Math.sin(t * 0.5) * 1.2;
      const ry = state.baseRotY + tx * 9 + Math.cos(t * 0.42) * 1.2;
      const rz = state.baseRotZ + tx * 2.5 + driftZ * 3;
      const tz = -50 + Math.sin(t * 0.3) * 12;
      const tyPx = Math.cos(t * 0.18) * 6;

      scene.style.transform = `translate3d(0, ${tyPx}px, ${tz}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      className="laptop-container relative z-10 h-[26rem] w-[30rem] max-w-full sm:h-[30rem] sm:w-[36rem] md:h-[34rem] md:w-[42rem]"
      style={{ perspective: "1100px" }}
    >
      <div
        ref={sceneRef}
        className="absolute inset-0 origin-center will-change-transform"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Lid (screen) */}
        <div
          className="absolute bottom-[24%] left-[7%] right-[7%] top-0 origin-bottom"
          style={{
            transform: "rotateX(-16deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative h-full w-full rounded-t-[0.9rem] border-[0.3rem] border-b-0 border-[#0a0f1e] bg-[#0a0f1e] sm:border-[0.4rem]"
            style={{
              boxShadow:
                "0 -2px 20px rgba(56,189,248,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Screen bezel */}
            <div className="relative m-[3px] h-[calc(100%-6px)] overflow-hidden rounded-t-[0.5rem] bg-[#0c1222] sm:m-1 sm:h-[calc(100%-8px)]">
              {/* Webcam dot */}
              <span className="absolute left-1/2 top-1.5 z-20 h-[3px] w-5 -translate-x-1/2 rounded-full bg-[#1e293b]/80" />

              {/* IDE Layout */}
              <div className="flex h-full w-full">
                {/* Activity Bar */}
                <div className="hidden h-full w-9 flex-col items-center gap-2.5 border-r border-[#1a2332] bg-[#090e1a] py-3 sm:flex">
                  <div className="h-4 w-4 rounded-sm bg-[#1e293b]/80" />
                  <div className="h-4 w-4 rounded-sm bg-sky-500/30" />
                  <div className="h-4 w-4 rounded-sm bg-[#1e293b]/80" />
                  <div className="h-4 w-4 rounded-sm bg-[#1e293b]/80" />
                  <div className="mt-auto h-4 w-4 rounded-sm bg-[#1e293b]/80" />
                </div>

                {/* Editor + Panel */}
                <div className="flex flex-1 flex-col">
                  {/* Tab bar */}
                  <div className="flex h-7 items-center border-b border-[#1a2332] bg-[#090e1a]/70 px-2">
                    <div className="flex items-center gap-1.5 rounded-t bg-[#0c1222] px-2.5 py-0.5">
                      <span className="text-[8px] text-sky-400">TS</span>
                      <span className="text-[9px] text-slate-400">
                        profile.tsx
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                    {/* Code editor */}
                    <div className="flex-1 overflow-hidden p-2 font-mono text-[7px] leading-[1.5] text-slate-400 sm:p-3 sm:text-[9.5px]">
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          1
                        </span>
                        <span>
                          <span className="text-pink-400">const</span>{" "}
                          <span className="text-sky-300">developer</span>{" "}
                          <span className="text-white">=</span>{" "}
                          <span className="text-white">{"{"}</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          2
                        </span>
                        <span className="pl-3">
                          <span className="text-sky-100/80">name</span>
                          <span className="text-white">: </span>
                          <span className="text-amber-300/90">
                            &quot;{name}&quot;
                          </span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          3
                        </span>
                        <span className="pl-3">
                          <span className="text-sky-100/80">role</span>
                          <span className="text-white">: </span>
                          <span className="text-amber-300/90">
                            &quot;Software Engineer&quot;
                          </span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          4
                        </span>
                        <span className="pl-3">
                          <span className="text-sky-100/80">stack</span>
                          <span className="text-white">: </span>
                          <span className="text-white">[</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          5
                        </span>
                        <span className="pl-6">
                          <span className="text-amber-300/90">&quot;React&quot;</span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          6
                        </span>
                        <span className="pl-6">
                          <span className="text-amber-300/90">
                            &quot;Next.js&quot;
                          </span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          7
                        </span>
                        <span className="pl-6">
                          <span className="text-amber-300/90">&quot;Node&quot;</span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          8
                        </span>
                        <span className="pl-3">
                          <span className="text-white">]</span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          9
                        </span>
                        <span className="pl-3">
                          <span className="text-sky-100/80">location</span>
                          <span className="text-white">: </span>
                          <span className="text-amber-300/90">
                            &quot;Nepal&quot;
                          </span>
                          <span className="text-white">,</span>
                        </span>
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          10
                        </span>
                        <span className="pl-3">
                          <span className="text-white">{"}"}</span>
                          <span className="text-white">;</span>
                        </span>
                      </div>
                      <div className="mt-1 flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          11
                        </span>
                        <span />
                      </div>
                      <div className="flex">
                        <span className="mr-3 inline-block w-3 select-none text-right text-slate-600">
                          12
                        </span>
                        <span>
                          <span className="text-pink-400">export default</span>{" "}
                          <span className="text-sky-300">developer</span>
                          <span className="text-white">;</span>
                        </span>
                      </div>
                    </div>

                    {/* Profile panel */}
                    <div className="hidden h-full w-[42%] border-l border-[#1a2332] bg-[#090e1a]/50 p-2 sm:block sm:p-3">
                      <div className="relative mb-2 aspect-square w-full overflow-hidden rounded border border-[#1a2332] sm:mb-3">
                        <Image
                          src={photo}
                          alt={`Portrait of ${name}`}
                          fill
                          sizes="200px"
                          className="object-cover"
                          priority
                        />
                      </div>
                      <div className="space-y-1.5">
                        <div className="h-1.5 w-[75%] rounded-full bg-[#1a2332]" />
                        <div className="h-1.5 w-[55%] rounded-full bg-[#1a2332]" />
                        <div className="h-1.5 w-[65%] rounded-full bg-[#1a2332]" />
                        <div className="mt-2 h-1 w-[35%] rounded-full bg-sky-500/15" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen glow overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sky-500/[0.03] via-transparent to-purple-500/[0.02]" />
            </div>
          </div>
        </div>

        {/* Base (keyboard deck) */}
        <div
          className="absolute bottom-[8%] left-[3%] right-[3%] h-[16%] origin-top"
          style={{
            transform: "rotateX(-74deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            className="relative h-full w-full rounded-b-[0.9rem] rounded-t-sm border-[0.3rem] border-t-0 border-[#0a0f1e] bg-[#0a0f1e] sm:border-[0.4rem]"
            style={{
              boxShadow:
                "0 4px 30px rgba(56,189,248,0.08), inset 0 -1px 0 rgba(255,255,255,0.03)",
            }}
          >
            {/* Keyboard area hint */}
            <div className="absolute left-[12%] right-[12%] top-2 rounded bg-[#111827]/40 sm:top-2.5">
              <div className="flex flex-col gap-[2px] p-1.5 sm:p-2">
                {[...Array(4)].map((_, row) => (
                  <div key={row} className="flex justify-center gap-[3px]">
                    {[...Array(row === 3 ? 5 : 10)].map((_, key) => (
                      <div
                        key={key}
                        className="h-[3px] rounded-[1px] bg-[#1a2332]/60 sm:h-[4px] sm:rounded-sm"
                        style={{
                          width: row === 3 && key === 2 ? "40%" : undefined,
                          flex: row === 3 && key === 2 ? "none" : "1",
                          maxWidth: row === 3 && key === 2 ? "40%" : "6%",
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Trackpad */}
            <div className="absolute bottom-2 left-1/2 h-[35%] w-[28%] -translate-x-1/2 rounded border border-[#1a2332]/40 bg-[#0e1525]/50 sm:bottom-2.5" />

            {/* Blue accent line on front edge */}
            <div className="absolute bottom-0 left-[15%] right-[15%] h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-sky-500/40 to-transparent" />
          </div>
        </div>

        {/* Hinge shadow */}
        <div
          className="absolute bottom-[22%] left-[10%] right-[10%] h-1"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.4) 0%, transparent 70%)",
          }}
        />

        {/* Bottom shadow */}
        <div className="absolute bottom-[3%] left-[15%] right-[15%] h-8 rounded-[100%] bg-sky-400/[0.04] blur-xl" />
      </div>
    </div>
  );
}
