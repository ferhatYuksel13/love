import React, { useState } from 'react';
import { useEffect } from 'react';
import { Heart } from 'lucide-react';

// Yedek aşk sözleri (API çalışmazsa)
const fallbackLoveSayings = [
  {
    content: "Aşk, iki ruhun tek vücutta yaşamasıdır.",
    author: "Aristoteles"
  },
  {
    content: "Sevmek ve sevilmek hayattaki en büyük mutluluktur.",
    author: "Victor Hugo"
  },
  {
    content: "Aşk, kalbin müziğidir.",
    author: "Platon"
  },
  {
    content: "Sen benim ruhuma dokunabilen tek insansın.",
    author: "Pablo Neruda"
  },
  {
    content: "Aşk, hayatın anlam bulduğu yerdir.",
    author: "Rumi"
  },
  {
    content: "Seni sevmek, nefes almak kadar doğal.",
    author: "Nazim Hikmet"
  },
  {
    content: "Aşk, ruhun ruhla konuşmasıdır.",
    author: "Ibn Arabi"
  },
  {
    content: "Sen benim için güneşsin, sensiz karanlık.",
    author: "Orhan Veli"
  },
  {
    content: "Aşk, iki kalbin tek ritimde atmasıdır.",
    author: "Yunus Emre"
  },
  {
    content: "Sevgi, hayatın en güzel şarkısıdır.",
    author: "Cemal Süreya"
  },
  {
    content: "Sen benim dünyamın merkezisin.",
    author: "Attila İlhan"
  },
  {
    content: "Aşk, zamansızlığın ta kendisidir.",
    author: "Turgut Uyar"
  },
  {
    content: "Seni sevmek, yaşamaya değer kılar hayatı.",
    author: "Cahit Sıtkı"
  },
  {
    content: "Aşk, ruhun özgürlüğüdür.",
    author: "Pir Sultan Abdal"
  },
  {
    content: "Sen benim sonsuzluğumsun.",
    author: "Edip Cansever"
  },
  {
    content: "Sevmek, var olmanın en güzel halidir.",
    author: "Ece Ayhan"
  },
  {
    content: "Aşk, kalbin dilidir.",
    author: "Aşık Veysel"
  },
  {
    content: "Sen benim hayallerimin gerçeğisin.",
    author: "Sezai Karakoç"
  },
  {
    content: "Aşk, iki gönlün birleşmesidir.",
    author: "Fuzuli"
  },
  {
    content: "Seni sevmek, cennet gibi bir şey.",
    author: "İlhan Berk"
  },
  {
    content: "Aşk, hayatın en büyük mucizesidir.",
    author: "Melih Cevdet"
  },
  {
    content: "Sen benim kalbimin sahibisin.",
    author: "Behçet Necatigil"
  },
  {
    content: "Sevgi, ruhun gıdasıdır.",
    author: "Oktay Rifat"
  },
  {
    content: "Aşk, sonsuzluğun kapısıdır.",
    author: "Necip Fazıl"
  },
  {
    content: "Sen benim varoluş sebebimsin.",
    author: "Hilmi Yavuz"
  },
  {
    content: "Aşk, kalbin en derin sesidir.",
    author: "Ümit Yaşar"
  },
  {
    content: "Seni sevmek, yaşamın anlamıdır.",
    author: "Gülten Akın"
  },
  {
    content: "Aşk, iki ruhun dansıdır.",
    author: "Sunay Akın"
  },
  {
    content: "Sen benim en güzel şiirimsin.",
    author: "Murathan Mungan"
  },
  {
    content: "Sevgi, hayatın rengidir.",
    author: "Tomris Uyar"
  },
  {
    content: "Aşk, kalbin özgürlük çığlığıdır.",
    author: "Küçük İskender"
  },
  {
    content: "Sen benim ruhuma dokunansın.",
    author: "Metin Altıok"
  },
  {
    content: "Aşk, hayatın en güzel hediyesidir.",
    author: "Lale Müldür"
  },
  {
    content: "Seni sevmek, var olmanın sebebi.",
    author: "Birhan Keskin"
  },
  {
    content: "Aşk, ruhun en saf halidir.",
    author: "Haydar Ergülen"
  },
  {
    content: "Sen benim kalbimin melodisisin.",
    author: "Gülseli İnal"
  },
  {
    content: "Sevgi, hayatın en büyük gücüdür.",
    author: "Özdemir Asaf"
  },
  {
    content: "Aşk, iki kalbin tek hikayesidir.",
    author: "Sait Faik"
  },
  {
    content: "Sen benim düşlerimin kraliçesisin.",
    author: "Refik Halit"
  },
  {
    content: "Aşk, ruhun en derin nefesidir.",
    author: "Ahmet Haşim"
  },
  {
    content: "Seni sevmek, yaşamaya değer.",
    author: "Yahya Kemal"
  },
  {
    content: "Aşk, kalbin en güzel türküsüdür.",
    author: "Faruk Nafiz"
  },
  {
    content: "Sen benim hayatımın anlamısın.",
    author: "Ziya Osman"
  },
  {
    content: "Sevgi, ruhun en güzel çiçeğidir.",
    author: "Ahmet Muhip"
  },
  {
    content: "Aşk, iki gönlün birleşen nağmesidir.",
    author: "Tevfik Fikret"
  },
  {
    content: "Sen benim sonsuz aşkımsın.",
    author: "Abdülhak Hamit"
  },
  {
    content: "Aşk, hayatın en güzel şarkısıdır.",
    author: "Recaizade Mahmut"
  },
  {
    content: "Seni sevmek, cennetin ta kendisi.",
    author: "Şinasi"
  },
  {
    content: "Aşk, ruhun en derin sırrıdır.",
    author: "Namık Kemal"
  },
  {
    content: "Sen benim kalbimin tek sahibisin.",
    author: "Ziya Paşa"
  }
];

function App() {
  const [quotes, setQuotes] = useState(fallbackLoveSayings);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // API'den aşk sözleri çek
  const fetchLoveQuotes = async () => {
    setIsLoading(true);
    try {
      // Quotable API'den aşk temalı sözler çek
      const response = await fetch('https://api.quotable.io/quotes?tags=love&limit=50');
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        setQuotes(data.results);
      }
    } catch (error) {
      console.log('API çalışmıyor, yedek sözler kullanılıyor:', error);
      // Yedek sözler zaten yüklü
    } finally {
      setIsLoading(false);
    }
  };

  // Sayfa yüklendiğinde API'den veri çek
  useEffect(() => {
    fetchLoveQuotes();
  }, []);
  const handleHeartClick = () => {
    setIsClicked(true);
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
    
    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-rose-300 to-red-400 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Ana Başlık */}
        <div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Hayatımın Anlamı
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-rose-100 mb-4">
            Güzel Kadınım
          </h2>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
            Seni çok seviyorum. Sana olan aşkımı nasıl anlatsam bilemiyorum, 
            belki şöyle anlatabilirım:
          </p>
        </div>

        {/* Kalp Butonu */}
        <div className="flex justify-center">
          <button
            onClick={handleHeartClick}
            className={`group relative bg-gradient-to-br from-pink-400 to-red-500 hover:from-pink-500 hover:to-red-600 
                       rounded-full p-6 shadow-2xl transition-all duration-300 transform hover:scale-110 
                       ${isClicked ? 'scale-95' : ''} focus:outline-none focus:ring-4 focus:ring-pink-300/50`}
          >
            <Heart 
              className={`w-16 h-16 text-white transition-all duration-300 
                         ${isClicked ? 'fill-current scale-125' : 'group-hover:fill-current'}`} 
            />
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Aşk Sözü */}
        <div className="bg-white/25 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30 min-h-[200px] flex flex-col justify-center">
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Heart className="w-8 h-8 text-pink-200 animate-pulse fill-current" />
              <span className="ml-2 text-white">Aşk sözleri yükleniyor...</span>
            </div>
          ) : (
            <>
          <blockquote className="text-lg md:text-xl text-white font-medium mb-4 italic leading-relaxed">
                "{quotes[currentQuote].content}"
          </blockquote>
          <cite className="text-rose-100 font-semibold text-base md:text-lg">
                — {quotes[currentQuote].author}
          </cite>
            </>
          )}
        </div>

        {/* Alt Mesaj */}
        <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/30">
          <p className="text-2xl md:text-3xl font-bold text-white">
            İşte böyle seviyorum seni ömrüm 💕
          </p>
        </div>

        {/* Dekoratif Kalpler */}
        <div className="absolute top-10 left-10 opacity-30">
          <Heart className="w-8 h-8 text-pink-300 fill-current animate-pulse" />
        </div>
        <div className="absolute top-20 right-20 opacity-30">
          <Heart className="w-6 h-6 text-red-300 fill-current animate-pulse" style={{animationDelay: '1s'}} />
        </div>
        <div className="absolute bottom-20 left-20 opacity-30">
          <Heart className="w-10 h-10 text-rose-300 fill-current animate-pulse" style={{animationDelay: '2s'}} />
        </div>
        <div className="absolute bottom-32 right-16 opacity-30">
          <Heart className="w-7 h-7 text-pink-400 fill-current animate-pulse" style={{animationDelay: '0.5s'}} />
        </div>
      </div>
    </div>
  );
}

export default App;