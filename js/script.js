const produkData = [
  {
    id: 1,
    nama: "Produk 1",
    harga: 450000,
    deskripsi:
      "Jaket Overshirt/Workwear Abu-abu ini adalah jaket overshirt atau jaket bergaya workwear berwarna abu-abu yang serbaguna. Jaket ini memiliki kerah klasik, penutup kancing penuh di bagian depan, dan dua saku tempel besar di bagian depan bawah. Tampaknya ada saku kecil atau detail di dada kiri atas. Estetika keseluruhannya bersih, minimalis, dan fungsional, cocok untuk tampilan kasual atau semi-formal. Bahan kainnya tampak seperti katun yang kokoh atau bahan tahan lama serupa.",
    gambar: "images/product1.jpg",
  },
  {
    id: 2,
    nama: "Produk 2",
    harga: 980000,
    deskripsi:
      "Jaket Kulit Tekstur Hitam (Gaya Bomber) ini adalah jaket kulit hitam dengan tampilan bertekstur, sedikit kusut, menunjukkan tampilan yang sudah usang atau tertekan. Jaket ini dirancang dengan gaya bomber dengan ujung dan manset berusuk atau elastis. Jaket ini memiliki penutup ritsleting penuh di bagian depan dan kerah tegak. Ada juga detail seperti kancing jepret di kerah dan manset, dan mungkin pola jahitan halus di badan. Jaket ini menampilkan estetika",
    gambar: "images/product2.jpg",
  },
  {
    id: 3,
    nama: "Produk 3",
    harga: 1500000,
    deskripsi:
      "Jaket Kulit Motor Coklat/Abu-abu Tertekan ini tampaknya adalah jaket kulit motor yang tertekan dalam warna coklat atau abu-abu gelap, memberikan tampilan vintage dan usang. Jaket ini menampilkan ritsleting depan yang menonjol, kerah klasik, dan beberapa saku beritsleting (dua di dada dan dua yang lebih besar di bagian depan bawah). Lengan juga memiliki manset beritsleting. Kulit menunjukkan tanda-tanda keausan alami dan variasi warna yang unik, menambah karakternya. Jaket ini memancarkan daya tarik yang tangguh, edgy, dan abadi.",
    gambar: "images/product3.jpg",
  },
  {
    id: 4,
    nama: "Produk 4",
    harga: 720000,
    deskripsi:
      "Jaket Bomber Vintage Hijau Tosca/Hijau dengan Kaos Grafis ini adalah jaket bomber bergaya vintage berwarna tosca cerah atau hijau gelap. Jaket ini memiliki penutup ritsleting penuh di bagian depan, kerah berusuk, serta manset dan ujung bawah berusuk, yang merupakan ciri khas jaket bomber. Ada beberapa saku beritsleting di bagian depan, termasuk satu di lengan. Jaket ini ditata terbuka, memperlihatkan kaus grafis putih di dalamnya dengan ilustrasi hitam putih seorang figur bertuliskan 'NEW POWER COLLINS'. Tampilan keseluruhannya retro dan sporty.",
    gambar: "images/product4.jpg",
  },
  {
    id: 5,
    nama: "Produk 5",
    harga: 680000,
    deskripsi:
      "Jaket Bomber Suede Imitasi Oversize CokelatJaket ini adalah pilihan fashion yang stylish dan nyaman, cocok untuk tampilan kasual yang santai namun tetap chic. Terbuat dari bahan suede imitasi berwarna cokelat hangat, jaket ini memiliki tekstur lembut yang memberikan kesan mewah. Desainnya oversize dengan potongan longgar di badan dan lengan bervolume, memberikan siluet yang modern dan nyaman dipakai",
    gambar: "images/product5.jpg",
  },
];

let keranjang = [];

function showSection(section) {
  document.querySelectorAll("main > section").forEach((sec) => (sec.style.display = "none"));
  document.getElementById(section).style.display = "block";
  if (section === "produk") {
    loadProdukList();
    document.getElementById("produk-detail").style.display = "none";
    document.getElementById("produk-list").style.display = "flex";
  }
}

function loadProdukList() {
  const list = document.getElementById("produk-list");
  list.innerHTML = "";
  produkData.forEach((p) => {
    const div = document.createElement("div");
    div.className = "produk";
    div.innerHTML = `
      <img src="${p.gambar}" alt="${p.nama}">
      <h2>${p.nama}</h2>
      <p>Rp ${p.harga.toLocaleString()}</p>
      <p>${p.deskripsi.substring(0, 50)}...</p>
      <button onclick="showDetail(${p.id})">Lihat Detail</button>
    `;
    list.appendChild(div);
  });
}

function showDetail(id) {
  const produk = produkData.find((p) => p.id === id);
  const detail = document.getElementById("produk-detail");
  detail.innerHTML = `
    <h2>${produk.nama}</h2>
    <img src="${produk.gambar}" alt="${produk.nama}">
    <p>${produk.deskripsi}</p>
    <p>Rp ${produk.harga.toLocaleString()}</p>
    <button onclick="addToCart(${produk.id})">Tambah ke Keranjang</button>
    <button onclick="backToList()">Kembali</button>
  `;
  document.getElementById("produk-list").style.display = "none";
  detail.style.display = "block";
}

function backToList() {
  document.getElementById("produk-detail").style.display = "none";
  document.getElementById("produk-list").style.display = "flex";
}

function addToCart(id) {
  const produk = produkData.find((p) => p.id === id);
  keranjang.push(produk);
  updateCartIcon();
  alert(`"${produk.nama}" ditambahkan ke keranjang.`);
  showSection("produk");
}

function updateCartIcon() {
  const icon = document.getElementById("cart-count");
  if (icon) icon.textContent = keranjang.length;
}

function showCart() {
  showSection("keranjang");
  const list = document.getElementById("keranjang-list");
  list.innerHTML = "";

  const btn = document.querySelector("#keranjang button");

  if (keranjang.length === 0) {
    list.innerHTML = "<p style='text-align:center;'>Tidak ada produk di keranjang.</p>";
    btn.textContent = "Lihat Produk";
    btn.onclick = () => showSection("produk");
    return;
  }

  keranjang.forEach((item) => {
    list.innerHTML += `
      <div class="produk">
        <img src="${item.gambar}" alt="${item.nama}">
        <h3>${item.nama}</h3>
        <p>Rp ${item.harga.toLocaleString()}</p>
      </div>
    `;
  });

  list.innerHTML += `<hr><h3>Total: Rp ${hitungTotal().toLocaleString()}</h3>`;
  btn.textContent = "Lanjut ke Checkout";
  btn.onclick = goToCheckout;
}

function hitungTotal() {
  return keranjang.reduce((total, item) => total + item.harga, 0);
}

function goToCheckout() {
  showSection("checkout");
}

function clearCart() {
  keranjang = [];
  updateCartIcon();
  alert("Terima kasih! Keranjang telah dikosongkan.");
  showSection("home");
}

showSection("home");
updateCartIcon();