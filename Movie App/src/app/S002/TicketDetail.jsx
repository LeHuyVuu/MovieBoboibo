import { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";

function TicketDetail() {
  const [show, setShow] = useState(true);
  const [barcodeSrc, setBarcodeSrc] = useState("");

  
  const movieTitle = "NATRA 2: MA ĐỒNG ĐẠI NÁO HẢI";
  const studio = "2";
  const row = "B";
  const seats = ["B4", "B5"].join(", "); 
  const bookingCode = `S${studio}-R${row}-S${seats.trim().replace(", ", "-")}`;

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, bookingCode, {
      format: "CODE128",
      lineColor: "#000",
      width: 2,
      height: 50,
      displayValue: true,
    });

    setBarcodeSrc(canvas.toDataURL("image/png"));
  }, [bookingCode]);

  return (
    <>
      {show && (
        <div className="fixed top-5 right-10 px-6 py-3 bg-green-500 text-white text-lg font-serif rounded-lg shadow-lg animate-slide-spin-fade">
          Booking confirmed! Enjoy!
        </div>
      )}

      <div className="w-80 h-auto relative top-10 left-20">
        <div className="w-80 rounded-xl border bg-gradient-to-br from-gray-100 to-yellow-50">
          <div className="p-2">
            <img
              className="w-full h-32 object-cover rounded-xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtm-izoPHFN1NJw9b5pbkm0FmryC8y9ifWA&s"
              alt="Movie Poster"
            />
          </div>
          <div className="pt-2 px-2 pb-4">
            <p className="text-sm text-gray-500 pb-2">Booking Code: {bookingCode}</p>
            <h2 className="text-lg font-bold pb-2">{movieTitle}</h2>
            <p className="text-sm text-gray-600 pb-2">
              Cinestar Sinh Viên - Sat, 20 Jul 20:00
            </p>
            <p className="text-sm text-gray-600 pb-2">PETS COMBOx1</p>
            <p className="text-lg font-semibold mt-2 pb-2">Total: 249.000đ</p>
            <div className="grid grid-cols-4 gap-2 mt-4 text-md pb-2">
              <div>
                <p className="text-center">Class</p>
                <p className="font-semibold text-center">VIP</p>
              </div>
              <div>
                <p className="text-center">Studio</p>
                <p className="font-semibold text-center">{studio}</p>
              </div>
              <div>
                <p className="text-center">Row</p>
                <p className="font-semibold text-center">{row}</p>
              </div>
              <div>
                <p className="text-center">Seat</p>
                <p className="font-semibold text-center">{seats}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative my-4 flex items-center w-72 left-5">
          <div className="mt-[-33px] flex-1 border-t border-dashed border-gray-400"></div>
        </div>

        <div className="w-80 rounded-xl border bg-gradient-to-br from-gray-100 to-yellow-50 mt-[-33px] py-4 flex flex-col items-center justify-center">
          {barcodeSrc && <img src={barcodeSrc} alt="Barcode" className="w-full px-5" />}
          <p className="text-sm text-gray-600 mt-2">Scan for ticket verification</p>
        </div>
      </div>
    </>
  );
}

export default TicketDetail;
