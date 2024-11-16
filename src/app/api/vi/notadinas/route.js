import prisma from "@/libs/prisma";

export async function GET(request) {
  try {
    // Ambil data terakhir dari tabel mahasiswa
    const lastDataMahasiswa = await prisma.mahasiswa.findFirst({
      orderBy: { id: "desc" },
    });

    // Ambil data terakhir dari tabel ambilnomor
    const lastDataAmbilNomor = await prisma.ambilnomor.findFirst({
      orderBy: { id: "desc" },
    });

    // Tentukan nomor terakhir yang valid
    const lastNotaDinas =
      lastDataAmbilNomor?.notadinas || lastDataMahasiswa?.no_ndkeluar;

    if (!lastNotaDinas) {
      // Jika tidak ada data sama sekali
      return new Response(
        JSON.stringify({ no_ndkeluar: "B/ND-001/IX/LOG./2024/Logistik" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Increment nomor terakhir
    const nextNotaDinas = incrementNotaDinas(lastNotaDinas);

    return new Response(
      JSON.stringify({ no_ndkeluar: nextNotaDinas }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ message: "Internal Server Error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Fungsi untuk increment nomor
function incrementNotaDinas(lastNumber) {
  const regex = /B\/ND-(\d+)\//; // Fokus pada angka setelah "B/ND-"
  const match = lastNumber.match(regex);

  if (!match) {
    throw new Error("Format nomor tidak valid."); // Lempar error jika format tidak sesuai
  }

  const number = parseInt(match[1], 10) + 1; // Increment angka
  const paddedNumber = String(number).padStart(3, "0"); // Tambahkan padding 0

  // Ganti hanya bagian angka dalam format
  return lastNumber.replace(/B\/ND-\d+\//, `B/ND-${paddedNumber}/`);
}

