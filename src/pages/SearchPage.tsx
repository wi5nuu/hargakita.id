import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { komoditasList, kotaList } from '@/data';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = inputValueState(query);

  function inputValueState(initial: string) {
    const [val, setVal] = useState(initial);
    useEffect(() => setVal(initial), [initial]);
    return [val, setVal] as const;
  }

  const results = {
    komoditas: komoditasList.filter(k => k.nama.toLowerCase().includes(query.toLowerCase())),
    kota: kotaList.filter(k => k.nama.toLowerCase().includes(query.toLowerCase())),
  };

  const hasResults = results.komoditas.length > 0 || results.kota.length > 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ q: inputValue });
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-6">
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Hasil Pencarian</h1>
          
          <form onSubmit={handleSearch} className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cari kota atau komoditas..."
              className="pl-12 h-14 text-lg rounded-2xl border-gray-200 shadow-sm focus:ring-primary focus:border-primary"
            />
          </form>
        </div>

        {query ? (
          <div className="space-y-8">
            {hasResults ? (
              <>
                {/* Komoditas Results */}
                {results.komoditas.length > 0 && (
                  <section>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                      Komoditas ({results.komoditas.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {results.komoditas.map(k => (
                        <Link
                          key={k.id}
                          to={`/harga/${k.id}`}
                          className="flex flex-col p-5 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow group"
                        >
                          <div>
                            <span className="font-bold text-gray-900 block text-lg group-hover:text-primary transition-colors">{k.nama}</span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest">{k.kategori}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Kota Results */}
                {results.kota.length > 0 && (
                  <section>
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Kota & Kabupaten ({results.kota.length})
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {results.kota.map(k => (
                        <Link
                          key={k.id}
                          to={`/kota/${k.id}`}
                          className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow group"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary/10 transition-colors">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="font-bold text-gray-900 block">{k.nama}</span>
                            <span className="text-xs text-gray-500 uppercase">{k.region}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Tidak ada hasil ditemukan</h3>
                <p className="text-gray-500">
                  Maaf, pencarian untuk "{query}" tidak membuahkan hasil. <br />
                  Coba kata kunci lain atau periksa kembali ejaan Anda.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 italic">Masukkan kata kunci untuk mulai mencari...</p>
          </div>
        )}
      </div>
    </main>
  );
}
