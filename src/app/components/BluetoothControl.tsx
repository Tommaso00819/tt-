import { useState, useEffect } from 'react';
import { Bluetooth, BluetoothConnected, BluetoothOff } from 'lucide-react';

interface BluetoothControlProps {
  onConnect: (device: BluetoothDevice) => void;
  onDisconnect: () => void;
  isConnected: boolean;
}

export function BluetoothControl({ onConnect, onDisconnect, isConnected }: BluetoothControlProps) {
  const [isScanning, setIsScanning] = useState(false);

  const connectBluetooth = async () => {
    try {
      setIsScanning(true);
      // HM-10 BLE Module - Service UUID
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }],
        optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
      });
      onConnect(device);
    } catch (error) {
      console.error('Errore connessione Bluetooth BLE:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden" style={{ borderColor: isConnected ? '#7EB6A9' : '#E5E7EB' }}>
      <div className="absolute inset-0 opacity-5" style={{ background: isConnected ? 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)' : '#E5E7EB' }} />
      <div className="relative flex items-center justify-between p-5">
        <div className="flex items-center gap-4">
          <div className="relative p-3 rounded-xl" style={{ background: isConnected ? 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)' : '#D1D5DB' }}>
            {isConnected ? (
              <>
                <BluetoothConnected className="w-7 h-7 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse border-2 border-white" style={{ backgroundColor: '#7EB6A9' }} />
              </>
            ) : (
              <BluetoothOff className="w-7 h-7 text-gray-600" />
            )}
          </div>
          <div>
            <p className="text-base font-bold" style={{ color: '#192C32' }}>
              {isConnected ? 'Arduino Mega Connesso' : 'Dispositivo Non Connesso'}
            </p>
            <p className="text-xs flex items-center gap-1 mt-0.5" style={{ color: isConnected ? '#7EB6A9' : '#9CA3AF' }}>
              <span className={`w-2 h-2 rounded-full`} style={{ backgroundColor: isConnected ? '#7EB6A9' : '#9CA3AF' }} />
              {isConnected ? 'Bluetooth attivo e pronto' : 'In attesa di connessione'}
            </p>
          </div>
        </div>
        <button
          onClick={isConnected ? onDisconnect : connectBluetooth}
          disabled={isScanning}
          className="px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: isConnected ? 'linear-gradient(135deg, #E54312 0%, #E36C1A 100%)' : 'linear-gradient(135deg, #7EB6A9 0%, #192C32 100%)' }}
        >
          {isScanning ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Ricerca...
            </span>
          ) : isConnected ? (
            'Disconnetti'
          ) : (
            'Connetti'
          )}
        </button>
      </div>
    </div>
  );
}
