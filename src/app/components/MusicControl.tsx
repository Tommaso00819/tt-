import { Play, Pause, Music2, Volume2 } from 'lucide-react';

interface MusicControlProps {
  songs: string[];
  currentSong: number;
  isPlaying: boolean;
  onSelectSong: (index: number) => void;
  onStop: () => void;
}

export function MusicControl({ songs, currentSong, isPlaying, onSelectSong, onStop }: MusicControlProps) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3">
        {songs.map((song, index) => (
          <button
            key={index}
            onClick={() => isPlaying && currentSong === index ? onStop() : onSelectSong(index)}
            className="group relative overflow-hidden p-4 rounded-xl transition-all transform hover:scale-[1.02] text-white border-2"
            style={{
              background: isPlaying && currentSong === index
                ? 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)'
                : 'linear-gradient(135deg, #FEDA7C20 0%, #E36C1A20 100%)',
              borderColor: isPlaying && currentSong === index ? '#E54312' : '#E36C1A',
              color: isPlaying && currentSong === index ? '#FFFFFF' : '#192C32'
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="p-2.5 rounded-lg" style={{
                  background: isPlaying && currentSong === index
                    ? 'rgba(255, 255, 255, 0.2)'
                    : 'linear-gradient(135deg, #FEDA7C 0%, #E36C1A 100%)'
                }}>
                  <Music2 className="w-5 h-5" style={{
                    color: isPlaying && currentSong === index ? '#FFFFFF' : '#FFFFFF'
                  }} />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">
                    {song}
                  </p>
                  <p className="text-xs" style={{
                    color: isPlaying && currentSong === index ? 'rgba(255, 255, 255, 0.8)' : '#7EB6A9'
                  }}>
                    {isPlaying && currentSong === index ? 'In riproduzione...' : 'Premi per riprodurre'}
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-full" style={{
                background: isPlaying && currentSong === index
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'linear-gradient(135deg, #FEDA7C 0%, #E36C1A 100%)'
              }}>
                {isPlaying && currentSong === index ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </div>
            </div>
            {isPlaying && currentSong === index && (
              <div className="absolute bottom-0 left-0 w-full h-1" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
                <div className="h-full bg-white animate-pulse" style={{ width: '60%' }} />
              </div>
            )}
          </button>
        ))}
      </div>

      {isPlaying && (
        <div className="rounded-xl p-4 shadow-lg" style={{ background: 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
                <Volume2 className="w-5 h-5 text-white animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Ora in riproduzione</p>
                <p className="text-sm font-bold text-white">{songs[currentSong]}</p>
              </div>
            </div>
            <button
              onClick={onStop}
              className="px-4 py-2 bg-white font-semibold text-sm rounded-lg hover:opacity-90 transition-all shadow-md"
              style={{ color: '#E54312' }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
