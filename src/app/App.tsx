import { useState, useRef } from 'react';
import { BluetoothControl } from './components/BluetoothControl';
import { ControlSlider } from './components/ControlSlider';
import { MusicControl } from './components/MusicControl';
import { TabButton } from './components/TabButton';
import { Tabs, TabsContent, TabsList } from '@radix-ui/react-tabs';
import {
  Lightbulb,
  Settings,
  Music,
  Sparkles,
  Home
} from 'lucide-react';

interface DeviceState {
  stepper: number;
  led1: number;
  led2: number;
  musicEnabled: boolean;
  currentSong: number;
}

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const deviceRef = useRef<BluetoothDevice | null>(null);
  const characteristicRef = useRef<BluetoothRemoteGATTCharacteristic | null>(null);

  const [state, setState] = useState<DeviceState>({
    stepper: 50,
    led1: 75,
    led2: 60,
    musicEnabled: false,
    currentSong: 0
  });

  const songs = [
    'Astro del Ciel',
    'Jingle Bells',
    'Tu Scendi dalle Stelle',
    'White Christmas',
    'Deck the Halls'
  ];

  const handleConnect = async (device: BluetoothDevice) => {
    try {
      deviceRef.current = device;
      const server = await device.gatt?.connect();

      // HM-10 BLE Service and Characteristic UUIDs
      const service = await server?.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
      const characteristic = await service?.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

      if (characteristic) {
        characteristicRef.current = characteristic;
        setIsConnected(true);
      }
    } catch (error) {
      console.error('Errore durante la connessione BLE:', error);
    }
  };

  const handleDisconnect = () => {
    deviceRef.current?.gatt?.disconnect();
    deviceRef.current = null;
    characteristicRef.current = null;
    setIsConnected(false);
  };

  const sendCommand = async (command: string) => {
    if (!characteristicRef.current) return;

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(command + '\n');
      await characteristicRef.current.writeValue(data);
    } catch (error) {
      console.error('Errore invio comando:', error);
    }
  };

  const updateState = (key: keyof DeviceState, value: number | boolean) => {
    setState(prev => ({ ...prev, [key]: value }));

    if (typeof value === 'number') {
      sendCommand(`${key.toUpperCase()}:${value}`);
    } else {
      sendCommand(`${key.toUpperCase()}:${value ? '1' : '0'}`);
    }
  };

  const selectSong = (songIndex: number) => {
    setState(prev => ({ ...prev, currentSong: songIndex, musicEnabled: true }));
    sendCommand(`SONG:${songIndex}`);
  };

  const stopMusic = () => {
    setState(prev => ({ ...prev, musicEnabled: false }));
    sendCommand(`MUSIC:0`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto p-4 pb-8">
        {/* Header */}
        <div className="text-center pt-8 pb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl shadow-lg mb-4" style={{ background: 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)' }}>
            <Home className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-2" style={{
            background: 'linear-gradient(90deg, #E54312 0%, #E36C1A 50%, #7EB6A9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            TechNativity
          </h1>
          <p className="text-sm font-medium" style={{ color: '#192C32' }}>Di Tommaso Graziano Bazzanella</p>
        </div>

        {/* Bluetooth Connection Card */}
        <div className="mb-6">
          <BluetoothControl
            onConnect={handleConnect}
            onDisconnect={handleDisconnect}
            isConnected={isConnected}
          />
        </div>

        {/* Main Control Tabs */}
        <Tabs defaultValue="lighting" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white rounded-xl shadow-md p-1.5 mb-6 border-2" style={{ borderColor: '#7EB6A9' }}>
            <TabButton
              value="lighting"
              icon={Lightbulb}
              label="Luci"
              gradientActive="linear-gradient(135deg, #FEDA7C 0%, #E36C1A 100%)"
              colorInactive="#192C32"
            />
            <TabButton
              value="motion"
              icon={Settings}
              label="Movimento"
              gradientActive="linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)"
              colorInactive="#192C32"
            />
            <TabButton
              value="music"
              icon={Music}
              label="Musica"
              gradientActive="linear-gradient(135deg, #E54312 0%, #E36C1A 100%)"
              colorInactive="#192C32"
            />
          </TabsList>

          {/* Lighting Tab */}
          <TabsContent value="lighting" className="space-y-4 mt-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden" style={{ borderColor: '#7EB6A9' }}>
              <div className="p-4" style={{ background: 'linear-gradient(135deg, #FEDA7C 0%, #E36C1A 100%)' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lightbulb className="w-6 h-6" />
                  Illuminazione LED
                </h2>
                <p className="text-white/90 text-sm mt-1">Controlla l'intensità delle luci del presepe</p>
              </div>
              <div className="p-6 space-y-4">
                <div className="rounded-xl p-1" style={{ background: 'linear-gradient(135deg, #FEDA7C20 0%, #E36C1A20 100%)' }}>
                  <ControlSlider
                    label="LED Ambiente - Luce Calda"
                    icon={Lightbulb}
                    value={state.led1}
                    onChange={(v) => updateState('led1', v)}
                    color="warm"
                  />
                </div>
                <div className="rounded-xl p-1" style={{ background: 'linear-gradient(135deg, #7EB6A920 0%, #192C3220 100%)' }}>
                  <ControlSlider
                    label="LED Stella - Luce Fredda"
                    icon={Sparkles}
                    value={state.led2}
                    onChange={(v) => updateState('led2', v)}
                    color="cool"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Motion Tab */}
          <TabsContent value="motion" className="space-y-4 mt-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden" style={{ borderColor: '#7EB6A9' }}>
              <div className="p-4" style={{ background: 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Motore Stepper
                </h2>
                <p className="text-white/90 text-sm mt-1">Gestisci il movimento delle figure animate</p>
              </div>
              <div className="p-6">
                <div className="rounded-xl p-1" style={{ background: 'linear-gradient(135deg, #7EB6A920 0%, #192C3220 100%)' }}>
                  <ControlSlider
                    label="Velocità Rotazione"
                    icon={Settings}
                    value={state.stepper}
                    onChange={(v) => updateState('stepper', v)}
                    color="motion"
                  />
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button
                    onClick={() => updateState('stepper', 0)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 border-2"
                    style={{ backgroundColor: '#192C32', borderColor: '#7EB6A9' }}
                  >
                    Stop
                  </button>
                  <button
                    onClick={() => updateState('stepper', 50)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: '#7EB6A9' }}
                  >
                    Medio
                  </button>
                  <button
                    onClick={() => updateState('stepper', 100)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #7EB6A9 0%, #E36C1A 100%)' }}
                  >
                    Max
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Music Tab */}
          <TabsContent value="music" className="space-y-4 mt-6">
            <div className="bg-white rounded-2xl shadow-lg border-2 overflow-hidden" style={{ borderColor: '#7EB6A9' }}>
              <div className="p-4" style={{ background: 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)' }}>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Music className="w-6 h-6" />
                  Canzoni Natalizie
                </h2>
                <p className="text-white/90 text-sm mt-1">Riproduci melodie natalizie tramite buzzer</p>
              </div>
              <div className="p-6">
                <MusicControl
                  songs={songs}
                  currentSong={state.currentSong}
                  isPlaying={state.musicEnabled}
                  onSelectSong={selectSong}
                  onStop={stopMusic}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-8 text-center bg-white rounded-xl p-4 border-2 shadow-md" style={{ borderColor: '#7EB6A9' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#7EB6A9' }} />
            <p className="text-xs font-bold" style={{ color: '#192C32' }}>Modulo HM-10 BLE</p>
          </div>
          <p className="text-xs font-medium" style={{ color: '#7EB6A9' }}>
            Service UUID: 0000FFE0-0000-1000-8000-00805F9B34FB
          </p>
          <p className="text-xs mt-1" style={{ color: '#192C32', opacity: 0.6 }}>Bluetooth Low Energy 4.0</p>
        </div>
      </div>
    </div>
  );
}