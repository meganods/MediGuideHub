"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Gauge } from "lucide-react";

interface ArticleAudioPlayerProps {
  title: string;
  content: string; // plain text or html
  authorName?: string;
}

export default function ArticleAudioPlayer({ title, content, authorName }: ArticleAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);
  const [isSupported, setIsSupported] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const chunksRef = useRef<string[]>([]);
  const currentChunkIndex = useRef<number>(0);
  const totalChunks = useRef<number>(1);

  // Strip HTML to get clean readable speech text
  const cleanText = (html: string) => {
    return html
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "and")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim();
  };

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Split long text into manageable natural sentences (SpeechSynthesis has character limits per utterance)
  const prepareChunks = () => {
    const rawContent = cleanText(content);
    const fullSpeech = `Now reading: ${title}. ${authorName ? `Written by ${authorName}.` : ""} ${rawContent}`;
    
    // Split on sentence boundaries
    const sentences = fullSpeech.match(/[^.!?]+[.!?]+(\s|$)/g) || [fullSpeech];
    chunksRef.current = sentences.map((s) => s.trim()).filter((s) => s.length > 0);
    totalChunks.current = chunksRef.current.length || 1;
    currentChunkIndex.current = 0;
  };

  const speakChunk = (index: number) => {
    if (!("speechSynthesis" in window) || index >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      currentChunkIndex.current = 0;
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(chunksRef.current[index]);
    utteranceRef.current = utterance;
    utterance.rate = rate;
    utterance.volume = isMuted ? 0 : 1;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      (v) => (v.lang.startsWith("en") && (v.name.includes("Natural") || v.name.includes("Google") || v.name.includes("Samantha") || v.name.includes("Daniel")))
    ) || voices.find((v) => v.lang.startsWith("en"));

    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onend = () => {
      currentChunkIndex.current += 1;
      const pct = Math.min(100, Math.round((currentChunkIndex.current / totalChunks.current) * 100));
      setProgress(pct);

      if (currentChunkIndex.current < chunksRef.current.length && isPlaying) {
        speakChunk(currentChunkIndex.current);
      } else {
        setIsPlaying(false);
        setIsPaused(false);
        setProgress(100);
      }
    };

    utterance.onerror = (e) => {
      if (e.error !== "canceled" && e.error !== "interrupted") {
        console.warn("Speech synthesis error:", e);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (!("speechSynthesis" in window)) return;

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume();
        setIsPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsPaused(true);
      }
    } else {
      prepareChunks();
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(0);
      speakChunk(0);
    }
  };

  const handleReset = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    currentChunkIndex.current = 0;
  };

  const handleRateChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      // Re-trigger current chunk with new rate
      speakChunk(currentChunkIndex.current);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="my-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#113F48]/5 via-[#C9A15A]/5 to-transparent border border-stone-200/80 shadow-xs transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: Indicator & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#113F48] text-[#C9A15A] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Volume2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#113F48]">
                Listen to this guide
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#C9A15A] bg-[#C9A15A]/10 px-2 py-0.5 rounded-full">
                <Sparkles className="h-3 w-3" /> Audio Edition
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              {isPlaying ? (isPaused ? "Audio paused" : "Now playing...") : "Hands-free audio narration"}
            </p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center flex-wrap gap-2 sm:gap-3">
          {/* Rate Selector */}
          <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
            {[1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => handleRateChange(speed)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  rate === speed
                    ? "bg-[#113F48] text-white"
                    : "text-stone-600 hover:text-[#113F48] hover:bg-stone-100"
                }`}
                aria-label={`Playback speed ${speed}x`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Reset button */}
          {isPlaying && (
            <button
              type="button"
              onClick={handleReset}
              className="p-2.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-[#113F48] hover:bg-stone-100 transition-colors shadow-xs cursor-pointer"
              title="Restart from beginning"
              aria-label="Restart audio"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}

          {/* Play / Pause main button */}
          <button
            type="button"
            onClick={togglePlay}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#113F48] hover:bg-[#0D3037] text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer hover:shadow-lg"
            aria-label={isPlaying ? (isPaused ? "Resume audio" : "Pause audio") : "Play audio guide"}
          >
            {isPlaying && !isPaused ? (
              <>
                <Pause className="h-4 w-4 text-[#C9A15A]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 text-[#C9A15A] fill-[#C9A15A]" />
                <span>{isPaused ? "Resume" : "Listen Now"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress & Wave Equalizer */}
      {isPlaying && (
        <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center gap-3">
          {/* Animated sound wave */}
          <div className="flex items-center gap-0.5 h-4">
            <span className={`w-1 bg-[#C9A15A] rounded-full transition-all ${!isPaused ? "animate-pulse h-4" : "h-1.5"}`} />
            <span className={`w-1 bg-[#113F48] rounded-full transition-all ${!isPaused ? "animate-pulse delay-75 h-3" : "h-2"}`} />
            <span className={`w-1 bg-[#C9A15A] rounded-full transition-all ${!isPaused ? "animate-pulse delay-150 h-5" : "h-1.5"}`} />
            <span className={`w-1 bg-[#113F48] rounded-full transition-all ${!isPaused ? "animate-pulse delay-100 h-2.5" : "h-2"}`} />
          </div>

          {/* Progress bar */}
          <div className="flex-1 bg-stone-200/70 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#113F48] to-[#C9A15A] h-full transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="text-[11px] font-mono font-bold text-stone-500 min-w-[36px] text-right">
            {progress}%
          </span>
        </div>
      )}
    </div>
  );
}
