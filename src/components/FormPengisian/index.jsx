"use client"
import React, { useState } from 'react';

const FormPengisian = () => {
  const [nama, setNama] = useState('');
  const [satfung, setSatfung] = useState('');
  const [noNotaDinas, setNoNotaDinas] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nama, satfung, noNotaDinas }),
      });
      await response.json();
      if (response.ok) {
        alert('Data berhasil disimpan');
        // Reset form setelah submit
        setNama('');
        setSatfung('');
        setNoNotaDinas('');
      } else {
        alert('GAGAL MENYIMPAN DATA');
      }
    } catch (error) {
      console.error('GAGAL MENYIMPAN DATA', error);
      alert('TERJADI KESALAHAN SAAT MENYIMPAN DATA');
    }
  };

  return (
    <div className='container'>
      <div className="row d-flex justify-content-center align-items-center"> 
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <label>Nama</label>
            <input
              type="text"
              className='form-control'
              placeholder='Adi supiyansah'
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />

            <label className='mt-4'>Satfung</label>
            <input
              type="text"
              className='form-control'
              placeholder='Baglog'
              value={satfung}
              onChange={(e) => setSatfung(e.target.value)}
            />

            <label className='mt-4'>No Nota Dinas Anda</label>
            <input
              type="number"
              className='form-control'
              placeholder='120'
              value={noNotaDinas}
              onChange={(e) => setNoNotaDinas(e.target.value)}
            />

            <div className="trigger-submit d-flex justify-content-end align-items-end">
              <button className='btn mt-4' type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPengisian;
