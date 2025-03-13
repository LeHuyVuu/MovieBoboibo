import React, { useEffect, useState } from "react";

function TicketDetail() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 4000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {show && (
        <div className=" fixed top-5 right-10 px-6 py-3 bg-green-500 text-white text-lg font-serif rounded-lg shadow-lg animate-slide-spin-fade">
          Booking confirmed! Enjoy!
        </div>
      )}

      <div className=" w-80 h-auto relative top-10 left-20 ">
        <div className="w-80 rounded-xl border bg-gray-50">
          <div className="p-2">
            <img
              className="w-full h-32 object-cover rounded-xl"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtm-izoPHFN1NJw9b5pbkm0FmryC8y9ifWA&s"
              alt=""
            />
          </div>
          <div className="pt-2 px-2 pb-4">
            <p className="text-sm text-gray-500 pb-2">Booking Code: #12345</p>
            <h2 className="text-lg font-bold pb-2">
              NATRA 2: MA ĐỒNG ĐẠI NÁO HẢI
            </h2>
            <p className="text-sm text-gray-600 pb-2">
              Cinestar Sinh Viên - Sat, 20 Jul 20:00
            </p>
            <p className="text-sm text-gray-600 pb-2">PETS COMBOx1</p>
            <p className="text-lg font-semibold mt-2 pb-2">Total: 249.000đ</p>
            <div className="grid grid-cols-4 gap-2 mt-4 text-md pb-2">
              <div>
                <p className="text-center">Class</p>{" "}
                <p className="font-semibold text-center">VIP</p>
              </div>
              <div>
                <p className="text-center">Studio</p>{" "}
                <p className="font-semibold text-center">2</p>
              </div>
              <div>
                <p className="text-center">Row</p>
                <p className="font-semibold text-center">B</p>
              </div>
              <div>
                <p className="text-center">Seat</p>
                <p className="font-semibold text-center">B4, B5</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative my-4 flex items-center w-72 left-5">
          <div className="mt-[-33px] flex-1 border-t border-dashed border-gray-400 "></div>
        </div>

        <div className=" w-80 rounded-xl border bg-gray-50 mt-[-33px] py-4 h-40 flex justify-between ">
          <img
            className="w-72 pl-5  "
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScPP01gARkvJ4jxO2mCcUuwpCpGYK9f3g5Fg&s"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default TicketDetail;
