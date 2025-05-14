function formatRupiah(value: string) {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/g);
  
    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
  
    return split[1] !== undefined ? `Rp ${rupiah},${split[1]}` : `Rp ${rupiah}`;
  }
  
  function parseRupiah(value: string): number {
    return parseInt(value.replace(/[^0-9]/g, '')) || 0;
  }
  
  export { formatRupiah, parseRupiah };  