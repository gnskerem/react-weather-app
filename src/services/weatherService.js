import axios from 'axios';

// 1. AXIOS INSTANCE (Özel Kurye Oluşturma)
// Her seferinde uzun uzun URL yazmamak için bir "temel ayar" yapıyoruz.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env dosyasındaki adresi okur
  params: {
    appid: import.meta.env.VITE_WEATHER_API_KEY, // .env dosyasındaki şifreyi okur
    units: 'metric', // Derece (Celsius) olsun
    lang: 'tr'       // Yanıtlar Türkçe gelsin
  }
});

// 2. DIŞARI AÇILAN FONKSİYON
export const getWeatherByCity = async (city) => {
  // Bu fonksiyon çağrıldığında:
  // "https://api.openweathermap.org/data/2.5/weather?q=Istanbul&..." adresine gider.
  const response = await apiClient.get('/weather', { 
    params: { q: city } 
  });
  
  return response.data; // Sadece işimize yarayan veriyi döndürür.
};