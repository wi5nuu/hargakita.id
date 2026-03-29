import { useState, useEffect, useCallback } from 'react';
import { Query, ID } from 'appwrite';
import type { Komoditas, LaporanWarga } from '@/types';
import { komoditasList, laporanWargaList, generateTrenData } from '@/data';
import { databases, APPWRITE_CONFIG, client } from '@/lib/appwrite';

// Cache dimatikan saat development agar data Real-Time Appwrite langsung terlihat
const CACHE_DURATION = import.meta.env.DEV ? 0 : 30 * 60 * 1000; 

interface CacheData<T> {
  data: T;
  timestamp: number;
}

export function useCachedData<T>(key: string, fetcher: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCachedData = useCallback((): T | null => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      const { data, timestamp }: CacheData<T> = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch {
      return null;
    }
  }, [key]);

  const setCachedData = useCallback((data: T) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
    } catch {
      // Ignore storage errors
    }
  }, [key]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Cek cache dulu
    const cached = getCachedData();
    if (cached) {
      setData(cached);
      setLoading(false);
    }

    try {
      const result = await fetcher();
      setData(result);
      setCachedData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      // If we have cached data, don't show error to user
      if (!cached) {
        setData(null);
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher, getCachedData, setCachedData]);

  useEffect(() => {
    loadData();
  }, deps);

  return { data, loading, error, refresh: loadData };
}

export function useHargaKomoditas() {
  const fetcher = useCallback(async (): Promise<Komoditas[]> => {
    try {
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.komoditas,
        [Query.orderDesc('harga'), Query.limit(100)]
      );
      
      if (response.documents.length === 0) {
        console.warn('Appwrite database is empty, falling back to mock data.');
        return komoditasList;
      }

      return response.documents as unknown as Komoditas[];
    } catch (error) {
      console.error('Appwrite fetch error:', error);
      return komoditasList; // Fallback to mock data on error
    }
  }, []);

  const result = useCachedData<Komoditas[]>('harga_komoditas', fetcher, []);

  // Real-time subscription
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${APPWRITE_CONFIG.databaseId}.collections.${APPWRITE_CONFIG.collections.komoditas}.documents`,
      (response) => {
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          console.log('Real-time update received:', response.payload);
          result.refresh();
        }
      }
    );

    return () => unsubscribe();
  }, [result.refresh]);

  return result;
}

export function useTrenHarga(komoditasId: string, days: number = 30) {
  const [data, setData] = useState<{ labels: string[]; data: number[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTren = async () => {
      setLoading(true);
      // Simulasi API call - In production, fetch from historical database table
      await new Promise(resolve => setTimeout(resolve, 300));
      setData(generateTrenData(days));
      setLoading(false);
    };

    loadTren();
  }, [komoditasId, days]);

  return { data, loading };
}

export function useLaporanWarga() {
  const fetcher = useCallback(async (): Promise<LaporanWarga[]> => {
    try {
      const response = await databases.listDocuments(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.laporan,
        [Query.orderDesc('$createdAt'), Query.limit(20)]
      );
      
      if (response.documents.length === 0) {
        return laporanWargaList;
      }
      
      return response.documents as unknown as LaporanWarga[];
    } catch (error) {
      console.error('Appwrite laporan error:', error);
      return laporanWargaList;
    }
  }, []);

  return useCachedData<LaporanWarga[]>('laporan_warga', fetcher, []);
}

export function useSubmitLaporan() {
  const [submitting, setSubmitting] = useState(false);

  const submit = async (data: Partial<LaporanWarga>) => {
    setSubmitting(true);
    try {
      await databases.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collections.laporan,
        ID.unique(),
        {
          ...data,
          status: 'menunggu',
          tanggal: new Date().toISOString(),
        }
      );
      return true;
    } catch (error) {
      console.error('Appwrite submit error:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  };

  return { submit, submitting };
}

export function useGeolocation() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = useCallback(() => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation tidak didukung di browser ini');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        
        // Simulasi reverse geocoding - dalam produksi gunakan API geocoding
        try {
          await new Promise(resolve => setTimeout(resolve, 500));
          // Mock data - dalam produksi ini akan mengembalikan kota berdasarkan koordinat
          const mockCities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];
          const randomCity = mockCities[Math.floor(Math.random() * mockCities.length)];
          setCity(randomCity);
        } catch {
          setError('Gagal mendeteksi kota');
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(err.message || 'Gagal mendapatkan lokasi');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  return { location, city, loading, error, detectLocation };
}

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function useLastUpdated() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30 * 60 * 1000); // Update setiap 30 menit

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = useCallback(() => {
    return lastUpdated.toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZoneName: 'short'
    });
  }, [lastUpdated]);

  return { lastUpdated, formatLastUpdated };
}
