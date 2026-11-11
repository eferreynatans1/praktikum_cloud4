// 1. Mode Gelap / Terang
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = function() {
    const html = document.documentElement;
    const isLight = html.getAttribute('data-bs-theme') === 'light';
    html.setAttribute('data-bs-theme', isLight ? 'dark' : 'light');
    themeToggle.textContent = isLight ? 'Mode Terang' : 'Mode Gelap';
};

// 2. Cek Koneksi Server
document.getElementById('cekServerBtn').onclick = function() {
    const jam = new Date().toLocaleTimeString('id-ID');
    document.getElementById('statusPesan').textContent = '✓ Server merespons normal (Ping: 14ms) pukul ' + jam;
};

// 3. Sembunyikan / Tampilkan Biodata
const toggleBioBtn = document.getElementById('toggleBioBtn');
const biodataDetail = document.getElementById('biodataDetail');
toggleBioBtn.onclick = function() {
    const hidden = biodataDetail.style.display === 'none';
    biodataDetail.style.display = hidden ? 'grid' : 'none';
    toggleBioBtn.textContent = hidden ? 'Sembunyikan Biodata' : 'Tampilkan Biodata';
};

// 4. Kuis Ngakak Anak IT
const quizData = [
    {
        q: "Kenapa di komputer ada tulisan 'ENTER'?",
        a: ["Karena kalau 'ENTAR' programnya nggak jalan", "Biar keyboard penuh", "Singkatan Energi Terminal", "Tombol KELUAR dipakai pintu"],
        c: 0
    },
    {
        q: "Hewan apa yang paling tidak sopan saat sedang ngoding?",
        a: ["Kucing garong", "Kutu loncat (bug loncat-loncat)", "Cacing pita", "Kutu buku"],
        c: 1
    },
    {
        q: "Apa bedanya sinyal WiFi kampus sama perasaan gebetan?",
        a: ["WiFi pakai password", "WiFi di atas genteng", "Sama-sama hilang pas lagi butuh-butuhnya", "WiFi bayar bulanan"],
        c: 2
    },
    {
        q: "Kenapa mahasiswa IT kalau tidur matanya merem?",
        a: ["Karena kalau melek lagi debugging jam 2 pagi", "Hemat baterai mata", "Standar ISO", "Layarnya silau"],
        c: 0
    },
    {
        q: "Makanan apa yang bikin anak coding panik?",
        a: ["Seblak level 10", "Bakso beranak", "Spaghetti code (kodingan ruwet)", "Nasi goreng"],
        c: 2
    }
];

let idx = 0;
let skor = 0;

function tampilSoal() {
    const data = quizData[idx];
    document.getElementById('questionCounter').textContent = 'Soal ' + (idx + 1) + ' dari ' + quizData.length;
    document.getElementById('questionText').textContent = data.q;
    document.getElementById('feedbackText').textContent = '';
    document.getElementById('nextBtn').style.display = 'none';

    const box = document.getElementById('optionsContainer');
    box.innerHTML = '';

    data.a.forEach(function(teks, i) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = teks;
        btn.onclick = function() {
            const semua = box.querySelectorAll('.option-btn');
            semua.forEach(b => b.disabled = true);

            if (i === data.c) {
                btn.classList.add('correct');
                document.getElementById('feedbackText').textContent = '✓ Gokil! Insting receh kamu tajam!';
                document.getElementById('feedbackText').style.color = '#16a34a';
                skor++;
            } else {
                btn.classList.add('wrong');
                semua[data.c].classList.add('correct');
                document.getElementById('feedbackText').textContent = '✗ Meleset! Jawaban bener warna hijau.';
                document.getElementById('feedbackText').style.color = '#dc2626';
            }
            document.getElementById('nextBtn').style.display = 'inline-block';
        };
        box.appendChild(btn);
    });
}

document.getElementById('nextBtn').onclick = function() {
    idx++;
    if (idx < quizData.length) {
        tampilSoal();
    } else {
        document.getElementById('quizBody').style.display = 'none';
        document.getElementById('resultBody').style.display = 'block';
        document.getElementById('questionCounter').textContent = 'Selesai';
        document.getElementById('finalScoreText').textContent = 'Skor receh kamu: ' + skor + ' dari ' + quizData.length + ' benar!';
    }
};

document.getElementById('restartBtn').onclick = function() {
    idx = 0;
    skor = 0;
    document.getElementById('quizBody').style.display = 'block';
    document.getElementById('resultBody').style.display = 'none';
    tampilSoal();
};

tampilSoal();