import { useState } from 'react';
import { getWeatherByCity } from '../services/weatherService'; // Az önce yazdığımız servisi çağırıyoruz

export const useWeather = () => {
  // STATE'LER (Durum Değişkenleri)
  const [weatherData, setWeatherData] = useState(null); // Hava durumu verisi
  const [loading, setLoading] = useState(false);        // Yükleniyor mu? (Spinner için)
  const [error, setError] = useState(null);             // Hata mesajı

  // FONKSİYON (Tetikleyici)
  const fetchWeather = async (city) => {
    setLoading(true); // 1. Yükleniyor animasyonunu başlat
    setError(null);   // 2. Eski hataları temizle
    setWeatherData(null); // 3. Eski veriyi temizle (isteğe bağlı)

    try {
      // Servise git, veriyi al
      const data = await getWeatherByCity(city);
      setWeatherData(data); // Başarılıysa veriyi kaydet
    } catch (err) {
      // Hata varsa yakala
      setError('Şehir bulunamadı veya bağlantı hatası!');
    } finally {
      // Başarılı da olsa başarısız da olsa yüklenme işlemini bitir
      setLoading(false);
    }
  };

  // Bu Hook'u kullanan sayfaya bu 4 özelliği veriyoruz
  return { weatherData, loading, error, fetchWeather };
};