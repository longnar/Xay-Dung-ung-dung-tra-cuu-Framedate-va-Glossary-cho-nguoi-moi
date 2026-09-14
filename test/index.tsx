import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// Asset imports
import logo from '../asset/IdolShowdownNF_logo.png';
import collageBackground from '../asset/IdolShowdownNextFesBiboo_1.png';
import skyTemplate from '../asset/Next-Fes-SkyTemplate.png';
import icon from '../asset/IdolShowdownIcon.png';

// Dev notes for the media playback section
const devNotes = [
  "Được phát triển bởi Besto Games - 1 đội ngũ indie, với niềm đam mê game đối kháng và Idol của mình họ đã dành trọn 2 năm để phát triển tựa game Idol Showdown này.",
  "Idol Showdown Next Fes mang đến dàn nhân vật Hololive đa dạng với các đòn đánh độc đáo, được trau chuốt tỉ mỉ từ âm thanh, hình ảnh đến cơ chế chiến đấu.",
  "Trải nghiệm những trận đấu nảy lửa trực tuyến với hệ thống Rollback Netcode cực kỳ mượt mà, đảm bảo độ trễ thấp nhất cho các game thủ chuyên nghiệp.",
  "Để bắt đầu trải nghiệm, hãy chọn khám phá danh sách Nhân vật hoặc tìm hiểu các Định nghĩa/Thuật ngữ trong game ở phía dưới nhé!"
];

export const TestPageScreen = (): JSX.Element => {
  // Mobile navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Media playback state
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0); // 0 to 100
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio track duration simulated as 10s per note (total 40s)
  const TRACK_DURATION = 10; // seconds

  // Handle play/pause toggle
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  // Next and prev track navigation
  const nextTrack = () => {
    setProgress(0);
    setCurrentTrack((prev) => (prev + 1) % devNotes.length);
  };

  const prevTrack = () => {
    setProgress(0);
    setCurrentTrack((prev) => (prev - 1 + devNotes.length) % devNotes.length);
  };

  const firstTrack = () => {
    setProgress(0);
    setCurrentTrack(0);
  };

  const lastTrack = () => {
    setProgress(0);
    setCurrentTrack(devNotes.length - 1);
  };

  // Effect for progress bar animation
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            // Move to next note on complete
            setCurrentTrack((curr) => (curr + 1) % devNotes.length);
            return 0;
          }
          return prev + 1;
        });
      }, 100); // 100ms * 100 steps = 10 seconds per note
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Format progress time
  const formatTime = (trackIndex: number, currentProgress: number) => {
    const elapsedSeconds = Math.floor((currentProgress / 100) * TRACK_DURATION);
    const elapsedMin = Math.floor(elapsedSeconds / 60);
    const elapsedSec = elapsedSeconds % 60;
    
    return `${elapsedMin}:${elapsedSec.toString().padStart(2, '0')}`;
  };

  const formatTotalTime = () => {
    const totalSeconds = devNotes.length * TRACK_DURATION;
    const totalMin = Math.floor(totalSeconds / 60);
    const totalSec = totalSeconds % 60;
    return `${totalMin}:${totalSec.toString().padStart(2, '0')}`;
  };

  // Handle timeline track click
  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.min(Math.max((clickX / rect.width) * 100, 0), 100);
    setProgress(percentage);
  };

  return (
    <div className="relative min-h-screen text-white font-['Outfit'] antialiased overflow-x-hidden selection:bg-cyan-500 selection:text-slate-900">
      
      {/* 0. FIXED BACKGROUND COLLAGE */}
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <img 
          src={collageBackground} 
          alt="" 
          className="w-full h-full object-cover opacity-25"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/85 to-slate-950/95" />
      </div>

      {/* 1. TOP NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 w-full border-b border-cyan-500/10 bg-slate-950/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo on Left */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <Link to="/test" className="flex items-center gap-3 group focus:outline-none">
                <img 
                  src={icon} 
                  alt="Idol Showdown Icon" 
                  className="h-10 w-10 md:h-12 md:w-12 object-contain image-render-pixelated group-hover:scale-110 transition-transform duration-300"
                  style={{ imageRendering: 'pixelated' }}
                />
                <span className="font-['Pixelify_Sans'] text-lg md:text-xl font-bold tracking-wider text-cyan-400 group-hover:text-white transition-colors duration-300">
                  NEXT FES
                </span>
              </Link>
            </div>

            {/* Right-aligned Navigation Links and Badges */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 border-r border-slate-800 pr-6">
                <a 
                  href="https://www.idolshowdownreplay.games" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-['Pixelify_Sans'] text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
                >
                  Replay
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a 
                  href="#news" 
                  className="font-['Pixelify_Sans'] text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
                >
                  News
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a 
                  href="#contacts" 
                  className="font-['Pixelify_Sans'] text-lg font-medium text-slate-300 hover:text-cyan-400 transition-colors duration-200 relative group py-1"
                >
                  Contacts
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>

              {/* Logo Badges cropped from Collage Sprite */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://cover-corp.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-[60px] h-[40px] bg-no-repeat transition-transform hover:scale-105 border border-cyan-500/10 rounded"
                  style={{
                    backgroundImage: `url(${collageBackground})`,
                    backgroundSize: '960px 320px',
                    backgroundPosition: '-815px -50px',
                  }}
                  title="holo Indie (COVER Corp.)"
                  aria-label="holo Indie website"
                />
                <a 
                  href="https://twitter.com/bestogames" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-[65px] h-[40px] bg-no-repeat transition-transform hover:scale-105 border border-cyan-500/10 rounded"
                  style={{
                    backgroundImage: `url(${collageBackground})`,
                    backgroundSize: '960px 320px',
                    backgroundPosition: '-880px -50px',
                  }}
                  title="Besto Game Team"
                  aria-label="Besto Game Team website"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-cyan-400 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 transition-colors"
                aria-expanded={mobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/95 backdrop-blur-md border-b border-cyan-500/10 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="https://www.idolshowdownreplay.games" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="block py-2 font-['Pixelify_Sans'] text-base font-medium text-slate-300 hover:text-cyan-400 transition-all"
            >
              Replay
            </a>
            <a 
              href="#news" 
              className="block py-2 font-['Pixelify_Sans'] text-base font-medium text-slate-300 hover:text-cyan-400 transition-all"
            >
              News
            </a>
            <a 
              href="#contacts" 
              className="block py-2 font-['Pixelify_Sans'] text-base font-medium text-slate-300 hover:text-cyan-400 transition-all"
            >
              Contacts
            </a>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-900">
              <a 
                href="https://cover-corp.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-[60px] h-[40px] bg-no-repeat border border-cyan-500/10 rounded"
                style={{
                  backgroundImage: `url(${collageBackground})`,
                  backgroundSize: '960px 320px',
                  backgroundPosition: '-815px -50px',
                }}
                aria-label="holo Indie website"
              />
              <a 
                href="https://twitter.com/bestogames" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-[65px] h-[40px] bg-no-repeat border border-cyan-500/10 rounded"
                style={{
                  backgroundImage: `url(${collageBackground})`,
                  backgroundSize: '960px 320px',
                  backgroundPosition: '-880px -50px',
                }}
                aria-label="Besto Game Team website"
              />
            </div>
          </div>
        )}
      </nav>

      {/* 2. HERO / HEADER SECTION */}
      <header className="relative w-full min-h-[50vh] md:min-h-[70vh] flex items-center py-12 md:py-20 bg-transparent z-10">
        {/* Content Card (Overlapping layout on large screens, stacked below on mobile) */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="w-full md:max-w-[420px] bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-6 lg:p-8 shadow-2xl shadow-cyan-950/50 hover:border-cyan-400/40 hover:shadow-cyan-400/20 transition-all duration-300 flex flex-col justify-between">
            <div>
              {/* Game Title Logo */}
              <div className="mb-6 flex justify-center md:justify-start">
                <img 
                  src={logo} 
                  alt="Idol Showdown Next Fes Title Logo" 
                  className="w-full max-w-[280px] lg:max-w-[320px] h-auto object-contain hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                />
              </div>

              {/* Metadata Text */}
              <div className="space-y-3 text-slate-300 text-sm lg:text-base border-l-2 border-cyan-500/40 pl-4 mb-8">
                <p><span className="text-cyan-400 font-semibold">Date Release:</span> 6 May, 2023</p>
                <p><span className="text-cyan-400 font-semibold">Last update:</span> 7 June, 2026</p>
                <p><span className="text-cyan-400 font-semibold">Developer:</span> Besto Game Team</p>
              </div>
            </div>

            {/* Prominent turquoise/cyan Download Button */}
            <a 
              href="https://store.steampowered.com/app/1742020/Idol_Showdown/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-full flex items-center justify-center py-3.5 px-6 border-0 rounded-xl overflow-hidden font-['Pixelify_Sans'] text-xl font-bold tracking-wider text-slate-950 bg-gradient-to-r from-cyan-400 to-teal-400 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/40 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 active:scale-[0.98] transition-all duration-300"
            >
              {/* Button inner glow animation */}
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              Download
            </a>
          </div>
        </div>
      </header>

      {/* 3. INFORMATION & PLAYBACK SECTION */}
      <section 
        id="news" 
        className="relative py-20 px-4 md:px-8 bg-transparent overflow-hidden flex flex-col items-center justify-center z-10"
      >
        {/* Main box container */}
        <div className="w-full max-w-4xl mx-auto">
          
          {/* Semi-transparent blue glowing message box with decoration */}
          <div className="relative border border-cyan-500/20 bg-slate-950/80 rounded-2xl p-8 md:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)] hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] backdrop-blur-md transition-all duration-500 text-center flex flex-col justify-center items-center">
            
            {/* Left and Right decoration arrow indicators inside the box */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/30 text-4xl hidden lg:block select-none animate-pulse font-mono">&lt;&lt;&lt;</div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-500/30 text-4xl hidden lg:block select-none animate-pulse font-mono">&gt;&gt;&gt;</div>

            {/* Character art quote highlight indicator */}
            <div className="w-12 h-1 bg-cyan-400 shadow-[0_0_8px_#00f0ff] mb-6 rounded-full" />

            {/* Developer text displaying current track / dev note without any scrollbar */}
            <p className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed tracking-wide text-cyan-100 font-sans max-w-2xl min-h-[90px] flex items-center justify-center transition-all duration-300 overflow-hidden text-ellipsis">
              {devNotes[currentTrack]}
            </p>

            <div className="w-12 h-1 bg-cyan-400 shadow-[0_0_8px_#00f0ff] mt-6 rounded-full" />
          </div>

          {/* Underneath Media Playback Control Bar */}
          <div className="mt-8 border border-cyan-500/20 bg-slate-950/80 backdrop-blur-md rounded-xl p-4 shadow-xl shadow-cyan-950/40 flex flex-col md:flex-row items-center gap-4 md:gap-8 justify-between">
            
            {/* Progress track */}
            <div className="w-full flex-grow flex items-center gap-4">
              <span className="font-mono text-xs text-slate-400 select-none">
                {formatTime(currentTrack, progress)}
              </span>
              
              {/* Clickable progress slider line */}
              <div 
                onClick={handleTimelineClick}
                className="relative h-2 w-full bg-slate-800 rounded-full cursor-pointer hover:bg-slate-700 transition-colors"
              >
                {/* Active progress cyan indicator */}
                <div 
                  className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full shadow-[0_0_8px_#00f0ff]"
                  style={{ width: `${progress}%` }}
                />
                
                {/* Slider knob */}
                <div 
                  className="absolute h-4 w-4 -mt-1 bg-white border-2 border-cyan-400 rounded-full shadow-[0_0_6px_#00f0ff] hover:scale-125 transition-transform"
                  style={{ left: `calc(${progress}% - 8px)` }}
                />
              </div>

              <span className="font-mono text-xs text-slate-400 select-none">
                {formatTotalTime()}
              </span>
            </div>

            {/* Playback Control Keys */}
            <div className="flex items-center gap-4 flex-shrink-0">
              {/* Skip to first track (<<) */}
              <button 
                onClick={firstTrack}
                title="Go to beginning"
                className="p-2 text-slate-400 hover:text-cyan-400 active:scale-95 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>

              {/* Prev track (<) */}
              <button 
                onClick={prevTrack}
                title="Previous track"
                className="p-2 text-slate-400 hover:text-cyan-400 active:scale-95 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Center Play/Pause button */}
              <button 
                onClick={togglePlay}
                title={isPlaying ? "Pause autoplay" : "Start autoplay"}
                className="p-3 bg-cyan-500 text-slate-950 rounded-full hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_0_10px_rgba(6,182,212,0.4)] focus:outline-none"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </button>

              {/* Next track (>) */}
              <button 
                onClick={nextTrack}
                title="Next track"
                className="p-2 text-slate-400 hover:text-cyan-400 active:scale-95 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Skip to last track (>>) */}
              <button 
                onClick={lastTrack}
                title="Go to end"
                className="p-2 text-slate-400 hover:text-cyan-400 active:scale-95 transition-all focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CHOICE DIALOG SECTION */}
      <section className="relative py-20 px-4 md:px-8 bg-transparent flex justify-center items-center z-10">
        <div className="w-full max-w-4xl mx-auto text-center flex flex-col items-center">
          
          {/* Choice Prompt content box */}
          <div className="bg-slate-950/80 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 md:p-12 mb-10 max-w-3xl shadow-xl shadow-cyan-950/20">
            <h3 className="font-['Pixelify_Sans'] text-2xl md:text-3xl font-bold tracking-wider text-cyan-400 mb-6 uppercase">
              // Choose Your Path
            </h3>
            <p className="text-lg md:text-xl font-normal leading-relaxed text-slate-300 font-sans">
              Đây là một tựa game đối kháng (Fighting Game) sở hữu lối chơi vô cùng mượt mà, nhưng lại cực kỳ thân thiện và dễ dàng tiếp cận ngay cả khi bạn là người mới bắt đầu bước chân vào thể loại này.
              <br />
              <span className="text-white font-medium inline-block mt-4">
                Để bắt đầu trải nghiệm, bạn muốn khám phá danh sách Nhân vật trước hay tìm hiểu về các Định nghĩa/Thuật ngữ trong game trước?
              </span>
            </p>
          </div>

          {/* Action buttons (Retro Black & White styled, Pixel Typography) */}
          <div className="flex flex-col sm:flex-row gap-6 w-full max-w-lg justify-center">
            
            {/* Button 1: Character selection path */}
            <Link 
              to="/select" 
              className="flex-1 flex justify-center items-center px-8 py-5 border-[4px] border-white bg-black font-['Pixelify_Sans'] text-2xl font-semibold tracking-wider text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_4px_0_#ffffff,0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              Character
            </Link>

            {/* Button 2: Glossary selection path */}
            <Link 
              to="/glossary" 
              className="flex-1 flex justify-center items-center px-8 py-5 border-[4px] border-white bg-black font-['Pixelify_Sans'] text-2xl font-semibold tracking-wider text-white hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-[0_4px_0_#ffffff,0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300"
            >
              Glossary
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Contact details */}
      <footer id="contacts" className="relative bg-slate-950/90 py-12 px-4 border-t border-slate-900/60 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Besto Game Team. Fan-made game project. Not affiliated with COVER Corp.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://twitter.com/bestogames" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              Twitter
            </a>
            <a href="https://store.steampowered.com/app/1742020/Idol_Showdown/" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              Steam
            </a>
            <a href="mailto:contact@bestogame.team" className="text-slate-500 hover:text-cyan-400 text-sm transition-colors">
              Contact Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
