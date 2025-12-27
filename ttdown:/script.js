async function download() {
  const url = document.getElementById("tiktokUrl").value;
  const result = document.getElementById("result");

  // reset tampilan dulu biar rapih
  result.innerHTML = "";
  document.getElementById("banner-ad").style.display = "none";
  document.getElementById("sticky-ad").style.display = "none";

  if (!url.includes("tiktok")) {
    result.innerHTML = "❌ Link TikTok tidak valid";
    return;
  }

  result.innerHTML = "⏳ Sedang memproses...";

  try {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data.data) {
      result.innerHTML = "❌ Gagal mengambil data video";
      return;
    }

    const videoUrl = data.data.play; // tanpa watermark

    // tampilkan hasil download
    result.innerHTML = `
      🎉 <b>Berhasil!</b><br><br>
      <a href="${videoUrl}" target="_blank" download style="color:#22c55e;font-weight:600;">
        Klik di sini untuk download video
      </a>
    `;

    // ==== tampilkan iklan ====
    document.getElementById("banner-ad").style.display = "block";
    document.getElementById("sticky-ad").style.display = "flex";

  } catch (err) {
    console.error(err);
    result.innerHTML = "⚠️ Terjadi kesalahan. Coba link lain.";
  }
}

function closeStickyAd() {
  document.getElementById("sticky-ad").style.display = "none";
}