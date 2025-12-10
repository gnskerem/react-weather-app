import { useState } from 'react';
import { useWeather } from './hooks/useWeather'; // Kendi yazdığımız beyni içeri alıyoruz

function App() {
  const [city, setCity] = useState(''); // Arama kutusundaki yazıyı tutar
  
  // Hook'tan gelen güçleri kullanıyoruz
  const { weatherData, loading, error, fetchWeather } = useWeather();

  // Arama butonuna basınca çalışacak fonksiyon
  const handleSearch = (e) => {
    e.preventDefault(); // Sayfanın yenilenmesini engeller
    if (city.trim()) {  // Boşluk kontrolü yap
      fetchWeather(city); // Hook'a "Git bu şehri bul" emri ver
      setCity(''); // Kutuyu temizle
    }
  };

  return (
    // Ana kapsayıcı: Mavi gradient arka plan
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center p-4">
      
      {/* Kart: Beyaz, gölgeli kutu */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20">
        
        {/* Başlık */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Hava Durumu</h1>

        {/* Arama Formu */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <input
            type="text"
            placeholder="Şehir adı girin (Örn: Istanbul)..."
            className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white/50"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 rounded-xl hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-blue-500/30"
            disabled={loading} // Yüklenirken butona basılamasın
          >
            {loading ? '...' : 'Ara'}
          </button>
        </form>

        {/* --- DURUMA GÖRE DEĞİŞEN EKRANLAR --- */}

        {/* 1. Yükleniyor Animasyonu */}
        {loading && (
          <div className="flex flex-col items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500">Gökyüzüne bakılıyor...</p>
          </div>
        )}

        {/* 2. Hata Mesajı */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4" role="alert">
            <p className="font-bold">Hata!</p>
            <p>{error}</p>
          </div>
        )}

        {/* 3. Hava Durumu Verisi (Sadece veri varsa göster) */}
        {weatherData && !loading && (
          <div className="text-center animate-fade-in-up">
            
            {/* Şehir ve Ülke */}
            <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              {weatherData.name}, <span className="text-2xl text-gray-500">{weatherData.sys.country}</span>
            </h2>

            {/* İkon ve Sıcaklık */}
            <div className="flex flex-col items-center my-6">
              <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} 
                alt="weather icon"
                className="w-32 h-32 drop-shadow-lg"
              />
              <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {Math.round(weatherData.main.temp)}°
              </div>
              <p className="text-xl text-gray-600 capitalize mt-2 font-medium">
                {weatherData.weather[0].description}
              </p>
            </div>

            {/* Detaylar Kutusu (Nem ve Rüzgar) */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-gray-500 text-sm font-semibold uppercase">Nem Oranı</span>
                <span className="text-2xl font-bold text-blue-600 mt-1">% {weatherData.main.humidity}</span>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl flex flex-col items-center">
                <span className="text-gray-500 text-sm font-semibold uppercase">Rüzgar</span>
                <span className="text-2xl font-bold text-indigo-600 mt-1">{weatherData.wind.speed} km/s</span>
              </div>
            </div>

          </div>
        )}

        {/* Boş Durum (İlk Açılış) */}
        {!weatherData && !loading && !error && (
          <div className="text-center text-gray-400 py-10">
            <p>Hava durumunu öğrenmek için bir şehir arayın.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;