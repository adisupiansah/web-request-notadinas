import prisma from "@/libs/prisma";


export async function POST(request) {
  try {
    const body = await request.json();

    // Validasi input
    const { nama, satfung, notadinas } = body;

    if (!nama || !satfung || !notadinas) {
      return new Response(
        JSON.stringify({
          message: "Semua field (nama, satfung, notadinas) wajib diisi",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Simpan data ke tabel ambilnomor
    const result = await prisma.ambilnomor.create({
      data: { nama, satfung, notadinas },
    });

    return new Response(
      JSON.stringify({ message: "Data berhasil disimpan", result }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error pada POST:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
