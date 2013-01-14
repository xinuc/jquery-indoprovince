/*
 * indoprovince
 * Copyright (c) 2009 Nugroho Herucahyono (xinuc@xinuc.org)
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Usage:
 * $(function(){
 *   $("#province").indoProvinceSelect().withCitySelect("#city");
 * });
 * * * * * *
 * cities from http://id.wikipedia.org/wiki/Daftar_kabupaten_dan_kota_Indonesia
 * see: example.html
 */

;(function($){

  var cities = {
    "Bali":["Badung","Bangli","Buleleng","Denpasar","Gianyar","Jembrana","Karangasem","Klungkung","Tabanan"],
    "Banten":["Cilegon","Lebak","Pandeglang","Serang","Kab. Serang","Tangerang","Kab. Tangerang","Tangerang Selatan"],
    "Bengkulu":["Bengkulu","Bengkulu Selatan","Bengkulu Tengah","Bengkulu Utara","Benteng","Kaur","Kepahiang","Lebong","Mukomuko","Rejang Lebong","Seluma"],
    "Daerah Istimewa Yogyakarta":["Bantul","Gunung Kidul","Kulon Progo","Sleman","Yogyakarta"],
    "DKI Jakarta":["Jakarta Barat","Jakarta Pusat","Jakarta Selatan","Jakarta Timur","Jakarta Utara","Kepulauan Seribu"],
    "Gorontalo":["Boalemo","Bone Bolango","Gorontalo","Kab. Gorontalo","Gorontalo Utara","Pohuwato"],
    "Jambi":["Batang Hari","Bungo","Jambi","Kerinci","Merangin","Muaro Jambi","Sarolangun","Sungai Penuh","Tanjung Jabung Barat","Tanjung Jabung Timur","Tebo"],
    "Jawa Barat":["Bandung","Kab. Bandung","Bandung Barat","Banjar","Bekasi","Kab. Bekasi","Bogor","Kab. Bogor","Ciamis","Cianjur","Cimahi","Cirebon","Kab. Cirebon","Depok","Garut","Indramayu","Karawang","Kuningan","Majalengka","Purwakarta","Subang","Sukabumi","Kab. Sukabumi","Sumedang","Tasikmalaya","Kab. Tasikmalaya"],
    "Jawa Tengah":["Banjarnegara","Banyumas","Batang","Blora","Boyolali","Brebes","Cilacap","Demak","Grobogan","Jepara","Karanganyar","Kebumen","Kendal","Klaten","Kudus","Magelang","Kab. Magelang","Pati","Pekalongan","Kab. Pekalongan","Pemalang","Purbalingga","Purworejo","Rembang","Salatiga","Semarang","Kab. Semarang","Sragen","Sukoharjo","Surakarta","Tegal","Kab. Tegal","Temanggung","Wonogiri","Wonosobo"],
    "Jawa Timur":["Bangkalan","Banyuwangi","Batu","Blitar","Kab. Blitar","Bojonegoro","Bondowoso","Gresik","Jember","Jombang","Kediri","Kab. Kediri","Lamongan","Lumajang","Madiun","Kab. Madiun","Magetan","Malang","Kab. Malang","Mojokerto","Kab. Mojokerto","Nganjuk","Ngawi","Pacitan","Pamekasan","Pasuruan","Kab. Pasuruan","Ponorogo","Probolinggo","Kab. Probolinggo","Sampang","Sidoarjo","Situbondo","Sumenep","Surabaya","Trenggalek","Tuban","Tulungagung"],
    "Kalimantan Barat":["Bengkayang","Kapuas Hulu","Kayong Utara","Ketapang","Kubu Raya","Landak","Melawi","Pontianak","Kab. Pontianak","Sambas","Sanggau","Sekadau","Singkawang","Sintang"],
    "Kalimantan Selatan":["Balangan","Banjar","Banjarbaru","Banjarmasin","Barito Kuala","Hulu Sungai Selatan","Hulu Sungai Tengah","Hulu Sungai Utara","Kotabaru","Tabalong","Tanah Bumbu","Tanah Laut","Tapin"],
    "Kalimantan Tengah":["Barito Selatan","Barito Timur","Barito Utara","Gunung Mas","Kapuas","Katingan","Kotawaringin Barat","Kotawaringin Timur","Lamandau","Murung Raya","Palangka Raya","Pulang Pisau","Seruyan","Sukamara"],
    "Kalimantan Timur":["Balikpapan","Berau","Bontang","Kutai Barat","Kutai Kartanegara","Kutai Timur","Paser","Penajam Paser Utara","Samarinda"],
    "Kalimantan Utara":["Bulungan","Malinau","Nunukan","Tana Tidung","Tarakan"],
    "Kepulauan Bangka Belitung":["Bangka","Bangka Barat","Bangka Selatan","Bangka Tengah","Belitung","Belitung Timur","Pangkal Pinang"],
    "Kepulauan Riau":["Batam","Bintan","Karimun","Kepulauan Anambas","Lingga","Natuna","Tanjung Pinang"],
    "Lampung":["Bandar Lampung","Lampung Barat","Lampung Selatan","Lampung Tengah","Lampung Timur","Lampung Utara","Mesuji","Metro","Pesawaran","Pringsewu","Tanggamus","Tulang Bawang","Tulang Bawang Barat","Way Kanan"],
    "Maluku":["Ambon","Buru","Buru Selatan","Kepulauan Aru","Maluku Barat Daya","Maluku Tengah","Maluku Tenggara","Maluku Tenggara Barat","Seram Bagian Barat","Seram Bagian Timur","Tual"],
    "Maluku Utara":["Halmahera Barat","Halmahera Selatan","Halmahera Tengah","Halmahera Timur","Halmahera Utara","Kepulauan Sula","Pulau Morotai","Ternate","Tidore Kepulauan"],
    "Nanggroe Aceh Darussalam":["Aceh Barat","Aceh Barat Daya","Aceh Besar","Aceh Jaya","Aceh Selatan","Aceh Singkil","Aceh Tamiang","Aceh Tengah","Aceh Tenggara","Aceh Timur","Aceh Utara","Banda Aceh","Bener Meriah","Bireuen","Gayo Lues","Langsa","Lhokseumawe","Nagan Raya","Pidie","Pidie Jaya","Sabang","Simeulue","Subulussalam"],
    "Nusa Tenggara Barat":["Bima","Kab. Bima","Dompu","Lombok Barat","Lombok Tengah","Lombok Timur","Lombok Utara","Mataram","Sumbawa","Sumbawa Barat"],
    "Nusa Tenggara Timur":["Alor","Belu","Ende","Flores Timur","Kupang","Kab. Kupang","Lembata","Manggarai","Manggarai Barat","Manggarai Timur","Nagekeo","Ngada","Rote Ndao","Sabu Raijua","Sikka","Sumba Barat","Sumba Barat Daya","Sumba Tengah","Sumba Timur","Timor Tengah Selatan","Timor Tengah Utara"],
    "Papua":["Asmat","Biak Numfor","Boven Digoel","Deiyai","Dogiyai","Intan Jaya","Jayapura","Kab. Jayapura","Jayawijaya","Keerom","Kepulauan Yapen","Lanny Jaya","Mamberamo Raya","Mamberamo Tengah","Mappi","Merauke","Mimika","Nabire","Nduga","Paniai","Pegunungan Bintang","Puncak","Puncak Jaya","Sarmi","Supiori","Tolikara","Waropen","Yahukimo","Yalimo"],
    "Papua Barat":["Fakfak","Kaimana","Manokwari","Maybrat","Raja Ampat","Sorong","Kab. Sorong","Sorong Selatan","Tambrauw","Teluk Bintuni","Teluk Wondama"],
    "Riau":["Bengkalis","Dumai","Indragiri Hilir","Indragiri Hulu","Kampar","Kepulauan Meranti","Kuantan Singingi","Pekanbaru","Pelalawan","Rokan Hilir","Rokan Hulu","Siak"],
    "Sulawesi Barat":["Majene","Mamasa","Mamuju","Mamuju Utara","Polewali Mandar"],
    "Sulawesi Selatan":["Bantaeng","Barru","Bone","Bulukumba","Enrekang","Gowa","Jeneponto","Kepulauan Selayar","Luwu","Luwu Timur","Luwu Utara","Makassar","Maros","Palopo","Pangkajene dan Kepulauan","Parepare","Pinrang","Sidenreng Rappang","Sinjai","Soppeng","Takalar","Tana Toraja","Toraja Utara","Wajo"],
    "Sulawesi Tengah":["Banggai","Banggai Kepulauan","Buol","Donggala","Morowali","Palu","Parigi Moutong","Poso","Sigi","Tojo Una-Una","Toli-Toli"],
    "Sulawesi Tenggara":["Bau-Bau","Bombana","Buton","Buton Utara","Kendari","Kolaka","Kolaka Utara","Konawe","Konawe Selatan","Konawe Utara","Muna","Wakatobi"],
    "Sulawesi Utara":["Bitung","Bolaang Mongondow","Bolaang Mongondow Selatan","Bolaang Mongondow Timur","Bolaang Mongondow Utara","Kepulauan Sangihe","Kepulauan Siau Tagulandang Biaro","Kepulauan Talaud","Kotamobagu","Manado","Minahasa","Minahasa Selatan","Minahasa Tenggara","Minahasa Utara","Tomohon"],
    "Sumatera Barat":["Agam","Bukittinggi","Dharmasraya","Kepulauan Mentawai","Lima Puluh Kota","Padang","Padang Pariaman","Padangpanjang","Pariaman","Pasaman","Pasaman Barat","Payakumbuh","Pesisir Selatan","Sawahlunto","Sijunjung","Solok","Kab. Solok","Solok Selatan","Tanah Datar"],
    "Sumatera Selatan":["Banyuasin","Empat Lawang","Lahat","Lubuklinggau","Muara Enim","Musi Banyuasin","Musi Rawas","Ogan Ilir","Ogan Komering Ilir","Ogan Komering Ulu","Ogan Komering Ulu Selatan","Ogan Komering Ulu Timur","Pagar Alam","Palembang","Prabumulih"],
    "Sumatera Utara":["Asahan","Batu Bara","Binjai","Dairi","Deli Serdang","Gunung Sitoli","Humbang Hasundutan","Karo","Labuhanbatu","Labuhanbatu Selatan","Labuhanbatu Utara","Langkat","Mandailing Natal","Medan","Nias","Nias Barat","Nias Selatan","Nias Utara","Padang Lawas","Padang Lawas Utara","Padang Sidempuan","Pakpak Bharat","Pematangsiantar","Samosir","Serdang Bedagai","Sibolga","Simalungun","Tanjung Balai","Tapanuli Selatan","Tapanuli Tengah","Tapanuli Utara","Tebing Tinggi","Toba Samosir"]
  }

  function createOptions(list, key){
    var options = "<option value=''></option>";
    $.each(list, function(k, v){
      options += "<option value='"+(key ? k : v)+"'>"+(key ? k : v)+"</option>";
    });
    return options;
  }

  $.fn.indoProvinceSelect = function(){
    this.html(createOptions(cities, true));
    return this;
  }

  $.fn.withCitySelect = function(city){
    var self = this;
    this.bind("change", function(){
      $(city).html(createOptions(cities[self.find("option:selected").attr("value")] || [], false));
    });
    return this;
  }

})(jQuery);
