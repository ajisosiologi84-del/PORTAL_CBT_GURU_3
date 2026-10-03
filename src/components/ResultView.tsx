import React, { useState } from 'react';
import {
  Download,
  ShieldCheck,
  CheckCircle2,
  LogOut,
  UploadCloud,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  Bell,
  ArrowRight,
  FileCheck,
  RotateCcw,
  Check,
  ShieldAlert,
  FolderUp,
  Info,
} from 'lucide-react';
import { DownloadAnimationModal } from './DownloadAnimationModal';

interface ResultViewProps {
  score: number;
  correctCount: number;
  incorrectCount: number;
  kkm: number;
  studentName: string;
  noPeserta: string;
  driveUploadUrl?: string;
  onDownloadEncryptedResult: () => void;
  onViewDiscussion?: () => void;
  onRestart: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  studentName,
  noPeserta,
  driveUploadUrl,
  onDownloadEncryptedResult,
  onRestart,
}) => {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [hasOpenedDrive, setHasOpenedDrive] = useState(false);
  const [showMandatoryNoticeModal, setShowMandatoryNoticeModal] = useState(true);
  const [showExitWarningModal, setShowExitWarningModal] = useState(false);

  const cleanName = studentName.replace(/[^a-zA-Z0-9]/g, '_');
  const resultFileName = `HASIL_CBT_${noPeserta}_${cleanName}.cbt`;

  const handleStartDownload = () => {
    setIsDownloadModalOpen(true);
  };

  const handleCompleteDownload = () => {
    onDownloadEncryptedResult();
    setHasDownloaded(true);
  };

  const handleOpenDrive = () => {
    setHasOpenedDrive(true);
    if (driveUploadUrl) {
      const targetUrl = driveUploadUrl.startsWith('http') ? driveUploadUrl : `https://${driveUploadUrl}`;
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleAttemptExit = () => {
    if (!hasDownloaded) {
      setShowExitWarningModal(true);
    } else {
      onRestart();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 fixed inset-0 z-40 overflow-y-auto p-3 sm:p-6 custom-scrollbar">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-fade-in p-5 sm:p-8 text-center relative border border-gray-100 my-auto space-y-5">
        {/* Background Ambient Accents */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-emerald-100/50 rounded-br-full -z-10 blur-xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-100/50 rounded-tl-full -z-10 blur-xl pointer-events-none" />

        {/* Top Success Badge */}
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-md shadow-emerald-200/50 border border-emerald-200">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3.5 py-1 rounded-full text-xs font-bold mb-2 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Mode Jawaban Terenkripsi CBT 2026
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Ujian Telah Selesai!
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Terima kasih <span className="font-extrabold text-slate-800">{studentName}</span> ({noPeserta})
          </p>
        </div>

        {/* EYE-CATCHING ANIMATED MANDATORY ACTION BANNER */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-2xl p-4 sm:p-5 text-white shadow-xl shadow-amber-500/20 text-left relative overflow-hidden animate-pulse-glow border-2 border-amber-300">
          {/* Shimmer light effect */}
          <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 animate-shimmer pointer-events-none" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-white/20 rounded-xl animate-ring inline-block">
                  <Bell className="w-5 h-5 text-amber-100" />
                </span>
                <span className="bg-white/25 text-white font-mono font-black text-[10px] sm:text-xs px-2.5 py-1 rounded-full uppercase tracking-wider">
                  ⚠️ PENGINGAT WAJIB SETELAH UJIAN
                </span>
              </div>
              <span className="text-[10px] font-extrabold bg-black/20 px-2.5 py-0.5 rounded-full text-amber-100">
                {hasDownloaded && hasOpenedDrive ? '🎉 2/2 Selesai' : hasDownloaded ? '⏳ 1/2 Selesai' : '🚨 0/2 Selesai'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-white/95 font-medium leading-relaxed">
              Sebelum menutup aplikasi, Anda <b>WAJIB MENDOWNLOAD</b> file hasil jawaban (<b>.cbt</b>) dan <b>MENGUPLOADNYA</b> ke folder Google Drive agar nilai ujian Anda tercatat resmi!
            </p>

            {/* Quick Action Buttons inside Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleStartDownload}
                className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer ${
                  hasDownloaded
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400'
                    : 'bg-white text-slate-900 hover:bg-amber-50'
                }`}
              >
                {hasDownloaded ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>1. Terunduh (.cbt)</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-amber-600 animate-bounce" />
                    <span>1. Wajib Unduh (.cbt)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleOpenDrive}
                className={`py-2.5 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer ${
                  hasOpenedDrive
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-400'
                    : 'bg-slate-900 hover:bg-black text-white border border-white/20'
                }`}
              >
                {hasOpenedDrive ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>2. Drive Terbuka</span>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4 text-sky-400 animate-float" />
                    <span>2. Upload ke Drive</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* STEP 1: Encrypted Download Card */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-md text-left space-y-3 relative overflow-hidden border border-emerald-500/40">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Langkah 1: Berkas Jawaban (.cbt)
            </p>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border ${
                hasDownloaded
                  ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                  : 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
              }`}
            >
              {hasDownloaded ? '✅ SUDAH DIUNDUH' : '⚠️ BELUM DIUNDUH'}
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Berkas terenkripsi digital ini berisi seluruh kunci pengerjaan Anda yang aman dari manipulasi.
          </p>
          <button
            onClick={handleStartDownload}
            className={`w-full font-extrabold py-3.5 px-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-xs active:scale-95 cursor-pointer group ${
              hasDownloaded
                ? 'bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/50'
                : 'bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white shadow-emerald-600/30'
            }`}
          >
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            <span>
              {hasDownloaded ? 'Unduh Ulang File Jawaban (.cbt)' : 'Unduh File Jawaban Sekarang (.cbt)'}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-bounce" />
          </button>
        </div>

        {/* STEP 2: Upload Hasil Jawaban Google Drive Card */}
        {driveUploadUrl ? (
          <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white p-4 sm:p-5 rounded-2xl shadow-md text-left space-y-3 border border-indigo-700/60">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                <UploadCloud className="w-4 h-4 text-indigo-400" /> Langkah 2: Upload ke Google Drive
              </p>
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Setelah mengunduh file <b>.cbt</b> di Langkah 1, klik tombol di bawah untuk membuka folder Google Drive dan mengunggah file tersebut.
            </p>
            <button
              type="button"
              onClick={handleOpenDrive}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-extrabold py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs active:scale-95 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 animate-float" />
              <span>Buka Google Drive &amp; Upload File (.cbt)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-left space-y-1.5">
            <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <UploadCloud className="w-4 h-4 text-slate-500" /> Langkah 2: Pengumpulan Berkas
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Link upload Google Drive belum disematkan oleh Guru. Silakan serahkan file <b>.cbt</b> yang telah Anda unduh langsung kepada Guru/Pengawas ujian.
            </p>
          </div>
        )}

        {/* Exit Action */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleAttemptExit}
            className="w-full min-h-[48px] bg-slate-900 hover:bg-slate-950 active:bg-black text-white font-extrabold py-3.5 px-5 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-98"
          >
            <LogOut className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Keluar dari Aplikasi (Kembali ke Halaman Utama)</span>
          </button>
        </div>

        <p className="text-[11px] text-gray-400 pt-1">
          <span>create: </span>
          <a
            href="https://lynk.id/ajisosiologi"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline font-bold text-blue-600"
          >
            @ajisosiologi
          </a>{' '}
          - Offline Secure Assessment System
        </p>
      </div>

      {/* POPUP MODAL PERINGATAN WAJIB SETELAH UJIAN (OTOMATIS MUNCUL) */}
      {showMandatoryNoticeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-7 shadow-2xl border-4 border-amber-400 space-y-4 text-center relative overflow-hidden text-slate-800 animate-in zoom-in-95 duration-200">
            {/* Header Alert */}
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3.5 text-left">
              <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-orange-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 shrink-0 animate-ring">
                <Bell className="w-6 h-6" />
              </div>
              <div>
                <span className="bg-amber-100 text-amber-900 font-mono font-black text-[10px] px-2.5 py-0.5 rounded-full border border-amber-300 uppercase tracking-wider inline-block">
                  🚨 INSTRUKSI WAJIB PASCA UJIAN
                </span>
                <h3 className="font-black text-base sm:text-lg text-slate-900 mt-0.5">
                  Wajib Unduh &amp; Upload Jawaban!
                </h3>
              </div>
            </div>

            {/* Instruction Body */}
            <p className="text-xs sm:text-sm text-slate-600 text-left leading-relaxed font-medium">
              Selamat, <b className="text-slate-900">{studentName}</b>! Anda telah menyelesaikan ujian. Agar hasil ujian Anda sah dan tercatat di rekapan guru, selesaikan <b>2 langkah wajib</b> berikut:
            </p>

            {/* Step 1 Card in Modal */}
            <div className={`p-3.5 rounded-2xl border text-left transition-all space-y-2 ${
              hasDownloaded ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50/80 border-amber-300 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5 text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[11px] font-black">1</span>
                  Unduh Berkas Jawaban Terenkripsi (.cbt)
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  hasDownloaded ? 'bg-emerald-200 text-emerald-800' : 'bg-amber-200 text-amber-900 animate-pulse'
                }`}>
                  {hasDownloaded ? '✅ Sudah Diunduh' : '⚠️ Wajib Pertama'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                File <b>{resultFileName}</b> berisi seluruh jawaban Anda dalam format aman terenkripsi.
              </p>
              <button
                type="button"
                onClick={handleStartDownload}
                className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 ${
                  hasDownloaded
                    ? 'bg-white border border-emerald-400 text-emerald-700 hover:bg-emerald-50'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>{hasDownloaded ? 'Unduh Ulang File .cbt' : 'Unduh File Jawaban (.cbt) Sekarang'}</span>
              </button>
            </div>

            {/* Step 2 Card in Modal */}
            <div className={`p-3.5 rounded-2xl border text-left transition-all space-y-2 ${
              hasOpenedDrive ? 'bg-indigo-50 border-indigo-300' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black flex items-center gap-1.5 text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[11px] font-black">2</span>
                  Upload Berkas ke Google Drive Guru
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                  hasOpenedDrive ? 'bg-indigo-200 text-indigo-900' : 'bg-slate-200 text-slate-700'
                }`}>
                  {hasOpenedDrive ? '✅ Sudah Dibuka' : '☁️ Langkah Kedua'}
                </span>
              </div>
              <p className="text-[11px] text-slate-600">
                Setelah mengunduh file di Langkah 1, unggah berkas tersebut ke link folder Google Drive yang ditentukan.
              </p>
              <button
                type="button"
                onClick={handleOpenDrive}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <UploadCloud className="w-4 h-4 animate-float" />
                <span>Buka Google Drive &amp; Upload</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowMandatoryNoticeModal(false)}
                className="w-full bg-slate-900 hover:bg-black active:bg-slate-950 text-white font-black px-6 py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Saya Mengerti &amp; Akan Melakukannya</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PERINGATAN KELUAR JIKA BELUM DOWNLOAD (EXIT WARNING INTERCEPTOR) */}
      {showExitWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-4 border-red-500 space-y-4 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto shadow-inner border border-red-300 animate-bounce">
              <AlertTriangle className="w-10 h-10" />
            </div>

            <div className="space-y-1.5">
              <span className="bg-red-100 text-red-900 font-mono font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                🚨 PERINGATAN: BELUM DOWNLOAD JAWABAN!
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                File Jawaban Belum Diunduh!
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Anda belum mengunduh file hasil jawaban (<b>.cbt</b>). Jika Anda keluar sekarang, berkas lokal mungkin hilang dan tidak dapat diunggah ke Google Drive guru.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-300 p-3 rounded-2xl text-left text-xs text-amber-950 font-semibold space-y-1">
              <p>💡 <b>Saran Terbaik:</b></p>
              <p className="text-[11px] text-amber-900 font-normal">
                Klik tombol <b>"Unduh File Sekarang"</b> di bawah agar file tersimpan di perangkat Anda sebelum keluar.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowExitWarningModal(false);
                  handleStartDownload();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-black py-3.5 px-4 rounded-2xl text-xs sm:text-sm transition shadow-lg active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Unduh File Jawaban Sekarang (.cbt)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowExitWarningModal(false);
                  onRestart();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-2xl text-xs transition cursor-pointer"
              >
                Saya Yakin Tetap Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Download Progress Animation Modal */}
      <DownloadAnimationModal
        isOpen={isDownloadModalOpen}
        title="Mengunduh Hasil Jawaban (.cbt)"
        subtitle="Memproses stempel digital & enkripsi hasil ujian..."
        fileName={resultFileName}
        fileType="cbt"
        onComplete={handleCompleteDownload}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
};
