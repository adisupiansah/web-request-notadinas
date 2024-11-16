"use client";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const FormPengisian = () => {
  const [data, setData] = useState("");
  const [nama, setNama] = useState("");
  const [satfung, setSatfung] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false); // State untuk mengontrol tampilan form

  useEffect(() => {
    const fetchNotaDinas = async () => {
      try {
        const response = await fetch("/api/vi/notadinas");
        if (response.ok) {
          const result = await response.json();
          setData(result.no_ndkeluar);
        } else {
          console.log("GAGAL MENGAMBIL DATA", response.status);
          setData("Tidak ada data");
        }
      } catch (error) {
        console.error("Terjadi kesalahan:", error);
        setData("Terjadi kesalahan");
      }
    };

    fetchNotaDinas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/vi/postnota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, satfung, notadinas: data }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Berhasil",
          text: "Data berhasil disimpan",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          // Refresh halaman setelah user menekan tombol OK
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Gagal",
          text: "Gagal menyimpan data",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          {/* Tombol untuk menampilkan form */}
          {!isFormVisible && (
            <div className="d-flex justify-content-center align-items-center mt-4">
              <button
                className="btn"
                onClick={() => setIsFormVisible(true)}
              >
                Ambil nomor nota dinas
              </button>
            </div>
          )}

          {/* Form ditampilkan hanya jika isFormVisible true */}
          {isFormVisible && (
            <form onSubmit={handleSubmit}>
              <label>Nama</label>
              <input
                type="text"
                className="form-control"
                placeholder="Adi Supiyansah"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                required
              />

              <label className="mt-4">Satfung</label>
              <input
                type="text"
                className="form-control"
                placeholder="Baglog"
                value={satfung}
                onChange={(e) => setSatfung(e.target.value)}
                required
              />

              <label className="mt-4">No Nota Dinas Anda</label>
              <input
                type="text"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
              />

              <div className="trigger-submit d-flex justify-content-end align-items-end">
                <button className="btn mt-4" type="submit">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPengisian;
