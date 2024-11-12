import { koneksiDB } from "@/libs/db";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { nama, satfung, noNotaDinas } = req.body;
        
        // Buat koneksi ke database
        const koneksi = await koneksiDB();

        try {
            // Query untuk menyimpan data ke dalam tabel
            const [result] = await koneksi.execute(
                'INSERT INTO mahasiswa (req_nama, req_satfung, no_ndkeluar) VALUES (?, ?, ?)',
                [nama, satfung, noNotaDinas]
            );
            res.status(200).json({ message: 'Data berhasil disimpan', result });
        } catch (error) {
            console.error("Error saat menyimpan data:", error);
            res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan data', error });
        } finally {
            await koneksi.end();
        }
    } else {
        res.status(405).json({ message: 'Method tidak diizinkan' });
    }
}
